import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import FollowLink from '.';
import { Tag } from '../../interfaces/tag';

import * as nextAuth from 'next-auth/react';

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
    // @ts-expect-error have to mock named export differently for each test
    nextAuth.useSession = jest.fn().mockImplementation(() => ({
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
    expect(tooltip).not.toBeVisible();
});

test('renders iconsOnly FollowLink when signed out', () => {
    // @ts-expect-error have to mock named export differently for each test
    nextAuth.useSession = jest.fn().mockImplementation(() => ({
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
    expect(tooltip).not.toBeVisible();
});

test('renders full FollowLink when signed in and not following anything', () => {
    // @ts-expect-error have to mock named export differently for each test
    nextAuth.useSession = jest.fn().mockImplementation(() => ({
        status: 'authenticated',
        data: { followedTags: [] },
    }));
    render(<FollowLink topic={topic} />);

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(
        'Receive a monthly digest and recommended content based on topics you follow!'
    );
    expect(tooltip).not.toBeVisible();
});

test('renders full FollowLink when signed in and not following anything', () => {
    // @ts-expect-error have to mock named export differently for each test
    nextAuth.useSession = jest.fn().mockImplementation(() => ({
        status: 'authenticated',
        data: { followedTags: [] },
    }));
    render(<FollowLink topic={topic} />);

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(
        'Receive a monthly digest and recommended content based on topics you follow!'
    );
    expect(tooltip).not.toBeVisible();
});

test('renders iconsOnly FollowLink when signed in and not following anything', () => {
    // @ts-expect-error have to mock named export differently for each test
    nextAuth.useSession = jest.fn().mockImplementation(() => ({
        status: 'authenticated',
        data: { followedTags: [] },
    }));
    render(<FollowLink iconsOnly topic={topic} />);

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(
        'Receive a monthly digest and recommended content based on topics you follow!'
    );
    expect(tooltip).not.toBeVisible();
});

test('renders full FollowLink when signed in and following other topics', () => {
    // @ts-expect-error have to mock named export differently for each test
    nextAuth.useSession = jest.fn().mockImplementation(() => ({
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
    expect(tooltip).not.toBeVisible();
});

test('renders iconsOnly FollowLink when signed in and following other topics', () => {
    // @ts-expect-error have to mock named export differently for each test
    nextAuth.useSession = jest.fn().mockImplementation(() => ({
        status: 'authenticated',
        data: { followedTags: [otherTopic] },
    }));
    render(<FollowLink iconsOnly topic={topic} />);

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Follow this topic');
    expect(tooltip).not.toBeVisible();
});

test('renders full FollowLink when signed in and following this topic', () => {
    // @ts-expect-error have to mock named export differently for each test
    nextAuth.useSession = jest.fn().mockImplementation(() => ({
        status: 'authenticated',
        data: { followedTags: [topic] },
    }));
    render(<FollowLink topic={topic} />);

    const link = screen.getByText('Unfollow');
    expect(link).toBeVisible();

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toBeEmptyDOMElement();
    expect(tooltip).not.toBeVisible();
});

test('renders iconsOnly FollowLink when signed in and following this topic', () => {
    // @ts-expect-error have to mock named export differently for each test
    nextAuth.useSession = jest.fn().mockImplementation(() => ({
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
    expect(tooltip).not.toBeVisible();
});
