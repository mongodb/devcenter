import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FilterItem } from '@mdb/devcenter-components';
import MobileFilters from './filters';

const languageFilterItems: FilterItem[] = [];

Array(4)
    .fill(0)
    .forEach((_, index) =>
        languageFilterItems.push({
            name: `Language ${index}`,
            type: 'ProgrammingLanguage',
        })
    );
const technologyFilterItems: FilterItem[] = [];

Array(4)
    .fill(0)
    .forEach((_, index) =>
        technologyFilterItems.push({
            name: `Technology ${index}`,
            type: 'Technology',
        })
    );

test('renders mobile filters', () => {
    let filterCounter = 0;
    let closeCounter = 0;
    render(
        <MobileFilters
            onFilter={() => filterCounter++}
            filters={[]}
            filterItems={[
                { key: 'ProgrammingLanguage', value: languageFilterItems },
                { key: 'Technology', value: technologyFilterItems },
            ]}
            closeModal={() => closeCounter++}
            sortBy=""
            onSort={() => {}}
        />
    );

    // Check that they are rendered only if they have items.
    const languageTitle = screen.getByText('Language');
    languageTitle.click();
    screen.getByText('Language 1');
    const technologyTitle = screen.getByText('Technology');
    technologyTitle.click();
    screen.getByText('Technology 1');

    expect(screen.queryByText('Products')).toBeNull();
    expect(screen.queryByText('Products')).toBeNull();
    expect(screen.queryByText('Expertise Level')).toBeNull();
    expect(screen.queryByText('Contributed By')).toBeNull();

    // Check onFilter works
    screen.getByText('Apply').click();
    expect(filterCounter).toEqual(1);

    // Check closeModal works
    screen.getByText('Clear').click();
    expect(filterCounter).toEqual(2);
    expect(closeCounter).toEqual(1);

    const closeIcon = screen.getByTitle('close');

    closeIcon.parentElement?.parentElement?.click();
    expect(closeCounter).toEqual(2);
});
