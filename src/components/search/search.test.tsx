import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Search from '.';

test('renders search', () => {
    render(
        <Search
            title="Some Title"
            placeholder="Search Some Stuff"
            pageNumber={1}
            updatePageTitle={() => {}}
        />
    );

    const title = screen.getByRole('heading', { level: 5 });
    expect(title).toHaveTextContent('Some Title');

    const searchInput = screen.getByLabelText('Search Some Stuff');
    expect(searchInput).toHaveValue('');
});

test('renders search for code examples', () => {
    render(
        <Search
            title="Some Title"
            placeholder="Search Some Stuff"
            contentType="Code Example"
            pageNumber={1}
            updatePageTitle={() => {}}
        />
    );

    const snippetBox = screen.getByLabelText('Code Snippets');
    const fullAppBox = screen.getByLabelText('Full Applications');

    expect(snippetBox).toHaveAttribute('type', 'checkbox');
    expect(fullAppBox).toHaveAttribute('type', 'checkbox');
});

test('renders search with title link', () => {
    render(
        <Search
            title="Some Title"
            placeholder="Search Some Stuff"
            titleLink={{ text: 'All things', href: '/articles/' }}
            pageNumber={1}
            updatePageTitle={() => {}}
        />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/developer/articles/');
    expect(link.getElementsByTagName('span')[0]).toHaveTextContent(
        'All things'
    );
});

test('renders search with custom element', () => {
    render(
        <Search
            title="Some Title"
            placeholder="Search Some Stuff"
            titleElement="h2"
            pageNumber={1}
            updatePageTitle={() => {}}
        />
    );

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Some Title');
});
