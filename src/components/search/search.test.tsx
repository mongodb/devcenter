import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './search';

const titleLink = {
    text: 'Link to All',
    href: '/slug1/slug2',
};
describe('Search', () => {
    test('renders default search', () => {
        render(<Search title="All Atlas Content" />);

        const title = screen.getByText('All Atlas Content');
        expect(title).toBeInTheDocument();
        const search = screen.getByText('Search Content');
        expect(search).toBeInTheDocument();
        const sort = screen.queryByText('Sort by');
        expect(sort).toBeInTheDocument();
        const results = screen.getByTestId('search-results');
        expect(results).toHaveStyle({ display: 'flex' });
    });
    test('renders search without sort', () => {
        render(<Search title="All Atlas Content" hideSortBy={true} />);

        const title = screen.getByText('All Atlas Content');
        expect(title).toBeInTheDocument();
        const search = screen.getByText('Search Content');
        expect(search).toBeInTheDocument();
        const sort = screen.queryByText('Sort by');
        expect(sort).toBeNull();
        const results = screen.getByTestId('search-results');
        expect(results).toHaveStyle({ display: 'flex' });
    });
    test('renders search with grid results', () => {
        render(<Search title="All Atlas Content" resultsLayout="grid" />);

        const title = screen.getByText('All Atlas Content');
        expect(title).toBeInTheDocument();
        const search = screen.getByText('Search Content');
        expect(search).toBeInTheDocument();
        const sort = screen.queryByText('Sort by');
        expect(sort).toBeInTheDocument();
        const results = screen.getByTestId('search-results');
        expect(results).toHaveStyle({ display: 'grid' });
    });
    test('renders search with title link', () => {
        render(<Search title="All Atlas Content" titleLink={titleLink} />);

        const title = screen.getByText('All Atlas Content');
        expect(title).toBeInTheDocument();
        const search = screen.getByText('Search Content');
        expect(search).toBeInTheDocument();
        const sort = screen.queryByText('Sort by');
        expect(sort).toBeInTheDocument();
        const results = screen.getByTestId('search-results');
        expect(results).toHaveStyle({ display: 'flex' });

        const link = screen.getByText(titleLink.text);
        expect(link.closest('a')).toHaveAttribute('href', titleLink.href);
    });
});
