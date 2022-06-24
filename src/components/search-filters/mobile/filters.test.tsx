import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FilterItem } from '../types';
import MobileFilters from './filters';

const languageFilterItems: FilterItem[] = [];

Array(4)
    .fill(0)
    .forEach((_, index) =>
        languageFilterItems.push({
            name: `Language ${index}`,
            type: 'ProgrammingLanguage',
            subItems: [],
            count: 0,
        })
    );
const technologyFilterItems: FilterItem[] = [];

Array(4)
    .fill(0)
    .forEach((_, index) =>
        technologyFilterItems.push({
            name: `Technology ${index}`,
            type: 'Technology',
            subItems: [],
            count: 0,
        })
    );

test('renders mobile filters', () => {
    let filterCounter = 0;
    let closeCounter = 0;
    render(
        <MobileFilters
            onFilter={() => filterCounter++}
            allFilters={[]}
            l1Items={[]}
            languageItems={languageFilterItems}
            technologyItems={technologyFilterItems}
            contributedByItems={[]}
            expertiseLevelItems={[]}
            closeModal={() => closeCounter++}
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
    screen.getByText('Apply Filters').click();
    expect(filterCounter).toEqual(1);

    // Check closeModal works
    screen.getByText('Clear').click();
    expect(filterCounter).toEqual(2);
    expect(closeCounter).toEqual(1);

    const closeIcon = screen.getByTitle('close');

    closeIcon.parentElement?.parentElement?.click();
    expect(closeCounter).toEqual(2);
});
