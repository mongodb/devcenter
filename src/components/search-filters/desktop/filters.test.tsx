import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FilterItem } from '../types';
import DesktopFilters from './filters';

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

test('renders desktop filters', () => {
    let counter = 0;
    render(
        <DesktopFilters
            onFilter={() => counter++}
            allFilters={[]}
            l1Items={[]}
            languageItems={languageFilterItems}
            technologyItems={technologyFilterItems}
            contributedByItems={[]}
            expertiseLevelItems={[]}
        />
    );

    // Check that they are rendered only if they have items.
    screen.getByText('Language');
    const language1 = screen.getByText('Language 1');
    screen.getByText('Technology');
    screen.getByText('Technology 1');

    expect(screen.queryByText('Products')).toBeNull();
    expect(screen.queryByText('Products')).toBeNull();
    expect(screen.queryByText('Expertise Level')).toBeNull();
    expect(screen.queryByText('Contributed By')).toBeNull();

    // Check onFilter works
    language1.click();
    expect(counter).toEqual(1);
});
