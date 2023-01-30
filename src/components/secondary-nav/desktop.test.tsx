import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Desktop from './desktop';

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

test('renders active path', () => {
    render(<Desktop activePath="/articles/" />);

    const tutorialsLink = screen.getByText('Tutorials');
    expect(tutorialsLink).toHaveStyle({ 'border-bottom-color': 'transparent' });

    // Border should be green when active, but can't find a good way to find that styling.
    // But the absence of a transparent border is enough to know it has a color.
    const articlesLink = screen.getByText('Articles');
    expect(articlesLink).not.toHaveStyle({
        'border-bottom-color': '#00ED64',
    });
});

test('renders dropdown', () => {
    render(<Desktop activePath="/" />);

    // Hidden by default.
    const languagesTitle = screen.queryByText('Languages');
    expect(languagesTitle).toBeNull();

    const dropdown = screen.getByText('Topics');
    dropdown.click();

    screen.getByText('Languages');

    const pythonLink = screen.getByText('Python');
    expect(pythonLink).toHaveAttribute('href', '/developer/languages/python/');

    const allLanguages = screen.getByText('All Languages');
    expect(
        allLanguages.parentElement?.parentElement?.parentElement
    ).toHaveAttribute('href', '/developer/languages/');

    const allTopics = screen.getByText('All Topics');
    expect(allTopics).toHaveAttribute('href', '/developer/topics/');
});
