import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortBox from './sort-box';

test('renders regular sort box options', () => {
    render(
        <SortBox
            onSort={() => {
                return;
            }}
            contentType="Article"
        />
    );

    // Check that title and active sorting appears
    screen.getByText('Sort by');
    const activeSort = screen.getAllByText('Newest');
    expect(activeSort.length).toBe(2);
    screen.getByText('Highest Rated');
});

test('renders regular sort box options with specific sortBy prop', () => {
    render(
        <SortBox
            onSort={() => {
                return;
            }}
            sortBy="Highest Rated"
            contentType="Article"
        />
    );

    // Check that title and active sorting appears
    screen.getByText('Sort by');
    const activeSort = screen.getAllByText('Highest Rated');
    expect(activeSort.length).toBe(2);
    screen.getByText('Newest');
});

test('renders video sort box options', () => {
    render(
        <SortBox
            onSort={() => {
                return;
            }}
            contentType="Video"
        />
    );

    // Check that title and active sorting appears
    screen.getByText('Sort by');
    const activeSort = screen.getAllByText('Upcoming');
    expect(activeSort.length).toBe(2);
    screen.getByText('Recently Aired');
    screen.getByText('Highest Rated');
});
