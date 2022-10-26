import { FiltersProps } from '../types';

import { FilterGroup, FilterItem } from '@mdb/devcenter-components';

const DesktopFilters: React.FunctionComponent<FiltersProps> = ({
    className,
    onFilter,
    allFilters,
    l1Items,
    languageItems,
    technologyItems,
    contributedByItems,
    expertiseLevelItems,
    contentTypeItems = [],
    codeLevelItems = [],
}) => {
    const onToggle = (checked: boolean, filter: FilterItem) => {
        if (checked) {
            if (filter.subFilters && filter.subFilters.length) {
                const subFiltersToAdd = filter.subFilters.filter(
                    subFilter =>
                        !allFilters.find(
                            ({ name, type }) =>
                                name === subFilter.name &&
                                type === subFilter.type
                        )
                );
                onFilter(allFilters.concat(filter).concat(subFiltersToAdd));
            } else {
                onFilter(allFilters.concat(filter));
            }
        } else {
            onFilter(
                allFilters.filter(
                    ({ name, type }) =>
                        !(name === filter.name && type === filter.type)
                )
            );
        }
    };
    return (
        <div className={className}>
            {!!codeLevelItems.length && (
                <FilterGroup
                    title="Example Type"
                    allFilters={codeLevelItems}
                    activeFilters={allFilters}
                    onToggle={onToggle}
                />
            )}
            {!!languageItems.length && (
                <FilterGroup
                    title="Language"
                    allFilters={languageItems}
                    activeFilters={allFilters}
                    onToggle={onToggle}
                />
            )}
            {!!technologyItems.length && (
                <FilterGroup
                    title="Technology"
                    allFilters={technologyItems}
                    activeFilters={allFilters}
                    onToggle={onToggle}
                />
            )}

            {!!contentTypeItems.length && (
                <FilterGroup
                    title="Content Type"
                    allFilters={contentTypeItems}
                    activeFilters={allFilters}
                    onToggle={onToggle}
                />
            )}
            {!!l1Items.length && (
                <FilterGroup
                    title="Products"
                    allFilters={l1Items}
                    activeFilters={allFilters}
                    onToggle={onToggle}
                />
            )}

            {!!expertiseLevelItems.length && (
                <FilterGroup
                    title="Expertise Level"
                    allFilters={expertiseLevelItems}
                    activeFilters={allFilters}
                    onToggle={onToggle}
                />
            )}
            {!!contributedByItems.length && (
                <FilterGroup
                    title="Contributed By"
                    allFilters={contributedByItems}
                    activeFilters={allFilters}
                    onToggle={onToggle}
                />
            )}
        </div>
    );
};

export default DesktopFilters;
