import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Mobile from './mobile';
import { Tag } from '../../interfaces/tag';

jest.mock('next-auth/react', () => {
    const nextAuthModule = jest.requireActual('next-auth/react');
    return {
        __esModule: true,
        ...nextAuthModule,
        useSession: jest.fn(() => {
            return { data: undefined, status: 'unauthenticated' };
        }),
    };
});

const tags: Tag[] = [
    { name: 'Python', type: 'ProgrammingLanguage', slug: '/languages/python/' },
    { name: 'Atlas', type: 'L1Product', slug: '/products/atlas/' },
    { name: 'Article', type: 'ContentType', slug: '/articles/' },
];

test('renders mobile dropdown', () => {
    render(<Mobile />);

    userEvent.click(screen.getByTitle('chevron-down'));

    // See articles.
    const article = screen.getByText('Articles');
    expect(article.parentElement?.parentElement).toHaveAttribute(
        'href',
        '/developer/articles/'
    );

    const allTopics = screen.getByText('All Topics');
    expect(
        allTopics.parentElement?.parentElement?.parentElement
    ).toHaveAttribute('href', '/developer/topics/');

    const languages = screen.getByText('Languages');
    languages.click();

    const python = screen.getByText('Python');
    expect(python.parentElement?.parentElement?.parentElement).toHaveAttribute(
        'href',
        '/developer/languages/python/'
    );

    const allLanguages = screen.getByText('All Languages');
    expect(
        allLanguages.parentElement?.parentElement?.parentElement
    ).toHaveAttribute('href', '/developer/languages/');
});
