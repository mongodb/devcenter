import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Search from './search';

jest.setTimeout(10000);

jest.mock('../../../public/loading-animation.gif', () => {
    return {
        default: { src: '/loading-animation.gif', height: 112, width: 112 },
    };
});

test('renders search', async () => {
    const user = userEvent.setup();
    render(<Search name="Atlas" />);

    const title = screen.getByText('All Atlas Content');
    expect(title).toBeInTheDocument();
    const search = screen.getByText('Search Atlas Content');
    expect(search).toBeInTheDocument();
    const sort = screen.getByText('Sort by');
    expect(sort).toBeInTheDocument();
});
