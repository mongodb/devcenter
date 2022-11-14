import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FilterItem } from '@mdb/devcenter-components';
import DesktopFilters from './filters';

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

test('renders desktop filters', () => {
    let counter = 0;
    render(
        <DesktopFilters
            onFilter={() => counter++}
            filters={[]}
            filterItems={[
                { key: 'ProgrammingLanguage', value: languageFilterItems },
                { key: 'Technology', value: technologyFilterItems },
            ]}
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
