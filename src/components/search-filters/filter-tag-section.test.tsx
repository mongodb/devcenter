import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import FilterTagSection from './filter-tag-section';
import { FilterItem } from '@mdb/devcenter-components';

const filterItem: FilterItem = {
    name: 'Test Filter',
    type: 'ProgrammingLanguage',
    subFilters: [],
};

const filterItems = Array(7).fill(filterItem);

test('renders filter tag section not expanded', () => {
    let counter = 0;
    render(
        <FilterTagSection
            allFilters={filterItems}
            filterTagsExpanded={false}
            onFilterTagClose={() => counter++}
            setFilterTagsExpanded={() => counter++}
            clearFilters={() => counter++}
        />
    );

    const tags = screen.getAllByText('Test Filter');
    expect(tags).toHaveLength(5);
    tags[0].click();
    expect(counter).toEqual(1);

    const expandableTag = screen.getByText('+2');
    expandableTag.click();
    expect(counter).toEqual(2);

    const clearTag = screen.getByText('Clear all filters');
    clearTag.click();
    expect(counter).toEqual(3);
});

test('renders filter tag section expanded', () => {
    render(
        <FilterTagSection
            allFilters={filterItems}
            filterTagsExpanded={true}
            onFilterTagClose={() => {}}
            setFilterTagsExpanded={() => {}}
            clearFilters={() => {}}
        />
    );

    const tags = screen.getAllByText('Test Filter');
    expect(tags).toHaveLength(7);
});
