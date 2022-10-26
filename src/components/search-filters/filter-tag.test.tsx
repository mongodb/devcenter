import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import FilterTag from './filter-tag';
import { FilterItem } from '@mdb/devcenter-components';

const filterItem: FilterItem = {
    name: 'Test Filter',
    type: 'ProgrammingLanguage',
    subItems: [],
    count: 0,
};

test('renders filter tag', () => {
    let counter = 0;
    render(
        <FilterTag
            filter={filterItem}
            onClick={() => counter++}
            closeIcon={true}
        />
    );
    const tag = screen.getByText('Test Filter');
    tag.click();
    expect(counter).toEqual(1);
    expect(screen.getByTitle('close')).toBeDefined();
});
