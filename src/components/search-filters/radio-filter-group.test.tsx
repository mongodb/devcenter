import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RadioFilterGroup from './radio-filter-group';

test('renders regular sorting radio group', () => {
    let sortString = '';

    render(
        <RadioFilterGroup
            title="Sort by"
            items={[]}
            sortBy="Newest"
            setSort={(value: string) => (sortString = value)}
            filters={[]}
            isMobile
            contentType="Article"
        />
    );

    // Check that title and active sorting appears
    const title = screen.getByText('Sort by');
    screen.getByText('Newest');

    // Check buttons are hidden at first
    let buttons = screen.queryAllByRole('radio');
    expect(buttons.length).toBe(0);

    title.click();

    // Check buttons are visible after click
    buttons = screen.queryAllByRole('radio');
    expect(buttons.length).toBe(2);
    let newestButton = buttons.find(
        button => button.getAttribute('value') === 'Newest'
    );
    expect(newestButton).toBeChecked();

    let highestRatedButton = buttons.find(
        button => button.getAttribute('value') === 'Highest Rated'
    );
    expect(highestRatedButton).not.toBeChecked();

    // Check clicking changes sorting method
    highestRatedButton?.click();

    buttons = screen.queryAllByRole('radio');
    newestButton = buttons.find(
        button => button.getAttribute('value') === 'Newest'
    );
    expect(newestButton).not.toBeChecked();

    highestRatedButton = buttons.find(
        button => button.getAttribute('value') === 'Highest Rated'
    );
    expect(highestRatedButton).toBeChecked();

    expect(sortString).toBe('Highest Rated');
});

test('renders video sorting options', () => {
    render(
        <RadioFilterGroup
            title="Sort by"
            items={[]}
            sortBy="Upcoming"
            filters={[]}
            isMobile
            contentType="Video"
        />
    );

    // Check that title and active sorting appears
    const title = screen.getByText('Sort by');
    screen.getByText('Upcoming');

    title.click();

    // Check buttons are visible after click
    const buttons = screen.queryAllByRole('radio');
    expect(buttons.length).toBe(3);

    // Check that different sorting options appear for video
    const options = ['Upcoming', 'Recently Aired', 'Highest Rated'];
    const buttonsText = buttons.map(button => button.getAttribute('value'));

    expect(options.sort()).toEqual(buttonsText.sort());
});
