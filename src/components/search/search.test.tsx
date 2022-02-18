import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Search from './search';

jest.setTimeout(10000);

test('renders search', async () => {
    const user = userEvent.setup();
    render(<Search name="Atlas" />);

    const title = screen.getByText('All Atlas Content');
    expect(title).toBeInTheDocument();
    const search = screen.getByText('Search Atlas Content');
    expect(search).toBeInTheDocument();
    const sort = screen.getByText('Sort by');
    expect(sort).toBeInTheDocument();
    // Once we actually hit an API for this, we can mock and test this more in depth.
    // https://mswjs.io/
    await waitFor(() =>
        expect(screen.getAllByText('Some Article')).toHaveLength(1)
    );

    const button = screen.getByText('Load more');
    expect(button).toBeInTheDocument();

    // Test that load more actually loads more.
    await user.click(button);
    await waitFor(() => screen.getByText('Loading...'));
    await waitFor(() =>
        expect(screen.getAllByText('Some Article')).toHaveLength(2)
    );

    // Test that typing in the search bar resets back to page 1 of results.
    const searchBar = screen.getByLabelText('input-box');
    await userEvent.type(searchBar, 'input-box');

    await waitFor(() => screen.getByText('Loading...'));
    await waitFor(() =>
        expect(screen.getAllByText('Some Article')).toHaveLength(1)
    );

    await user.click(button);
    await waitFor(() => screen.getByText('Loading...'));
    await waitFor(() =>
        expect(screen.getAllByText('Some Article')).toHaveLength(2)
    );

    // Test that select another sort option resets back to page 1 of results.
    const sortSelect = screen.getByRole('select');
    await userEvent.click(sortSelect);

    const mostPopular = screen.getByText('Most Popular');
    await userEvent.click(mostPopular);

    await waitFor(() => screen.getByText('Loading...'));
    await waitFor(() =>
        expect(screen.getAllByText('Some Article')).toHaveLength(1)
    );
});
