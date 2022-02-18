import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Search from './search';

test('renders search', async () => {
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

    fireEvent.click(button);
    await waitFor(() => screen.getByText('Loading...'));
    await waitFor(() =>
        expect(screen.getAllByText('Some Article')).toHaveLength(2)
    );
});
