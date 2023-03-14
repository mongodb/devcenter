import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

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

test('renders mobile filters', async () => {
    let filterCounter = 0;
    let closeCounter = 0;
    render(
        <MobileFilters
            onFilter={() => filterCounter++}
            filters={[]}
            filterItems={[
                { key: 'Language', value: languageFilterItems },
                { key: 'Technology', value: technologyFilterItems },
            ]}
            closeModal={() => closeCounter++}
            sortBy=""
            onSort={() => null}
        />
    );
    const user = userEvent.setup();

    // Check that they are rendered only if they have items.
    const languageTitle = screen.getByText('Language');
    await user.click(languageTitle);
    screen.getByText('Language 1');
    const technologyTitle = screen.getByText('Technology');
    await user.click(technologyTitle);
    screen.getByText('Technology 1');

    expect(screen.queryByText('Products')).toBeNull();
    expect(screen.queryByText('Products')).toBeNull();
    expect(screen.queryByText('Expertise Level')).toBeNull();
    expect(screen.queryByText('Contributed By')).toBeNull();

    // Check onFilter works
    await user.click(screen.getByText('Apply'));
    expect(filterCounter).toEqual(1);

    // Check closeModal works
    await user.click(screen.getByText('Clear'));
    expect(filterCounter).toEqual(2);
    expect(closeCounter).toEqual(1);

    const closeIcon = screen.getByTitle('close');
    const iconParent = closeIcon.parentElement?.parentElement;

    await user.click(iconParent as Element);
    expect(closeCounter).toEqual(2);
});
