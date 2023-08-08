import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import FollowLink from '.';
import { Tag } from '../../interfaces/tag';

jest.mock('../modal/personalization', () => {
    return jest.fn(() => <></>);
});

jest.mock('next/router', () => ({
    __esModule: true,
    ...jest.requireActual('next/router'),
    useRouter: jest.fn(() => ({ asPath: '' })),
}));
jest.mock('../../utils/get-sign-in-url', () => {
    return jest.fn(() => '');
});

const mockUseSession = jest.fn();
jest.mock('next-auth/react', () => ({
    __esModule: true,
    ...jest.requireActual('next-auth/react'),
    useSession: () => mockUseSession(),
}));

const topic: Tag = {
    name: 'Atlas',
    type: 'L1Product',
    slug: '/products/atlas',
};

const otherTopic: Tag = {
    name: 'Python',
    type: 'ProgrammingLanguage',
    slug: '/languages/python',
};

test('renders full FollowLink when signed out', () => {
    mockUseSession.mockImplementation(() => ({
        status: 'unauthenticated',
        data: null,
    }));
    render(<FollowLink topic={topic} />);

    const link = screen.getByText('Follow');
    expect(link).toBeVisible();

    const icon = screen.getByTitle('plus');
    expect(icon.parentElement).toBeVisible();

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Sign in to follow topics');
});

test('renders iconsOnly FollowLink when signed out', () => {
    mockUseSession.mockImplementation(() => ({
        status: 'unauthenticated',
        data: null,
    }));
    render(<FollowLink topic={topic} iconsOnly />);

    const link = screen.queryByText('Follow');
    expect(link).toEqual(null);

    const icon = screen.getByTitle('plus');
    expect(icon.parentElement).toBeVisible();

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Sign in to follow topics');
});

test('renders full FollowLink when signed in and not following anything', () => {
    mockUseSession.mockImplementation(() => ({
        status: 'authenticated',
        data: { followedTags: [] },
    }));
    render(<FollowLink topic={topic} />);

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(
        'Receive a monthly digest and recommended content based on topics you follow!'
    );
});

test('renders full FollowLink when signed in and not following anything', () => {
    mockUseSession.mockImplementation(() => ({
        status: 'authenticated',
        data: { followedTags: [] },
    }));
    render(<FollowLink topic={topic} />);

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(
        'Receive a monthly digest and recommended content based on topics you follow!'
    );
});

test('renders iconsOnly FollowLink when signed in and not following anything', () => {
    mockUseSession.mockImplementation(() => ({
        status: 'authenticated',
        data: { followedTags: [] },
    }));
    render(<FollowLink iconsOnly topic={topic} />);

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(
        'Receive a monthly digest and recommended content based on topics you follow!'
    );
});

test('renders full FollowLink when signed in and following other topics', () => {
    mockUseSession.mockImplementation(() => ({
        status: 'authenticated',
        data: { followedTags: [otherTopic] },
    }));
    render(<FollowLink topic={topic} />);

    const link = screen.getByText('Follow');
    expect(link).toBeVisible();

    const icon = screen.getByTitle('plus');
    expect(icon.parentElement).toBeVisible();

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toBeEmptyDOMElement();
});

test('renders iconsOnly FollowLink when signed in and following other topics', () => {
    mockUseSession.mockImplementation(() => ({
        status: 'authenticated',
        data: { followedTags: [otherTopic] },
    }));
    render(<FollowLink iconsOnly topic={topic} />);

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Follow this topic');
});

test('renders full FollowLink when signed in and following this topic', () => {
    mockUseSession.mockImplementation(() => ({
        status: 'authenticated',
        data: { followedTags: [topic] },
    }));
    render(<FollowLink topic={topic} />);

    const link = screen.getByText('Unfollow');
    expect(link).toBeVisible();

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toBeEmptyDOMElement();
});

test('renders iconsOnly FollowLink when signed in and following this topic', () => {
    mockUseSession.mockImplementation(() => ({
        status: 'authenticated',
        data: { followedTags: [topic] },
    }));
    render(<FollowLink iconsOnly topic={topic} />);

    const link = screen.queryByText('Unfollow');
    expect(link).toEqual(null);

    const icon = screen.getByTitle('check');
    expect(icon.parentElement).toBeVisible();

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Unfollow this topic');
});
