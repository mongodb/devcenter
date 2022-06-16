import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FilterItem } from './types';
import FilterGroup from './filter-group';

const filterItem: FilterItem = {
    name: 'Test Filter',
    type: 'ProgrammingLanguage',
    subItems: [],
    count: 0,
};

test('renders filter group desktop with few items', () => {
    const filterItems: FilterItem[] = [];

    new Array(4).fill(0).forEach((_, index) =>
        filterItems.push({
            name: `Language ${index}`,
            type: 'ProgrammingLanguage',
            subItems: [],
            count: 0,
        })
    );
    let checkedFilters: FilterItem[] = [];
    render(
        <FilterGroup
            title="Some Title"
            items={filterItems}
            filters={checkedFilters}
            setFilters={filts => (checkedFilters = filts)}
        />
    );

    const title = screen.getByText('Some Title');
    const filters = screen.getAllByText(/Language [0-9]/);
    expect(filters).toHaveLength(4);

    // Shouldn't have a show more/less button if we have < 5 items.
    expect(screen.queryByText('Show more')).toBeNull();
    expect(screen.queryByText('Show less')).toBeNull();

    // Make sure setFilters is actually called.
    screen.getByLabelText('Language 2').click();
    expect(checkedFilters).toHaveLength(1);
    expect(checkedFilters[0].name).toBe('Language 2');

    // Collapses all filters on title click
    title.click();
    const hiddenFilters = screen.queryAllByText(/Language [0-9]/);
    expect(hiddenFilters).toHaveLength(0);
});

test('renders filter group desktop with many items', () => {
    const filterItems: FilterItem[] = [];

    new Array(7).fill(0).forEach((_, index) =>
        filterItems.push({
            name: `Language ${index}`,
            type: 'ProgrammingLanguage',
            subItems: [],
            count: 0,
        })
    );
    let checkedFilters: FilterItem[] = [];
    render(
        <FilterGroup
            title="Some Title"
            items={filterItems}
            filters={checkedFilters}
            setFilters={filts => (checkedFilters = filts)}
        />
    );

    screen.getByText('Some Title');
    const filters = screen.getAllByText(/Language [0-9]/);
    expect(filters).toHaveLength(5);

    // Should expand
    const showMoreLink = screen.getByText('Show more');
    showMoreLink.click();
    const allFilters = screen.getAllByText(/Language [0-9]/);
    expect(allFilters).toHaveLength(7);

    // Should collapse
    const showLessLink = screen.getByText('Show less');
    showLessLink.click();
    const lessFilters = screen.getAllByText(/Language [0-9]/);
    expect(lessFilters).toHaveLength(5);
});

test('renders filter group desktop with subitems', () => {
    const filterItems: FilterItem[] = [];

    new Array(2).fill(0).forEach((_, index) =>
        filterItems.push({
            name: `Product ${index}`,
            type: 'L1Product',
            subItems: [],
            count: 0,
        })
    );
    filterItems.push({
        name: 'Product 3',
        type: 'ProgrammingLanguage',
        subItems: [
            {
                name: 'Subproduct 1',
                type: 'L2Product',
                subItems: [],
                count: 0,
            },
            {
                name: 'Subproduct 2',
                type: 'L2Product',
                subItems: [],
                count: 0,
            },
        ],
        count: 0,
    });
    let checkedFilters: FilterItem[] = [];
    render(
        <FilterGroup
            title="Some Title"
            items={filterItems}
            filters={checkedFilters}
            setFilters={filts => (checkedFilters = filts)}
        />
    );

    const filters = screen.getAllByText(/Product [0-9]/);
    expect(filters).toHaveLength(3);

    const subFilters = screen.getAllByText(/Subproduct [0-9]/);
    expect(subFilters).toHaveLength(2);
});

test('renders filter group mobile', () => {
    const filterItems: FilterItem[] = [];
    let checkedFilters: FilterItem[] = [];

    new Array(4).fill(0).forEach((_, index) =>
        filterItems.push({
            name: `Language ${index}`,
            type: 'ProgrammingLanguage',
            subItems: [],
            count: 0,
        })
    );
    render(
        <FilterGroup
            title="Some Title"
            items={filterItems}
            filters={checkedFilters}
            setFilters={filts => (checkedFilters = filts)}
            isMobile
        />
    );

    // Should be collapsed default on mobile
    const filters = screen.queryAllByText(/Language [0-9]/);
    expect(filters).toHaveLength(0);

    const title = screen.getByText('Some Title');
    title.click();

    const subFilters = screen.getAllByText(/Language [0-9]/);
    expect(subFilters).toHaveLength(4);
});
