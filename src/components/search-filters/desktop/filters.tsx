import { memo } from 'react';
import { FiltersProps } from '../types';

import { FilterGroup, FilterItem } from '@mdb/devcenter-components';
import { CONTENT_TYPE_NAME_MAP } from '../../../data/constants';
import { useCallback } from 'react';

const DesktopFilters: React.FunctionComponent<FiltersProps> = memo(
    ({ className, onFilter, filters, filterItems }) => {
        const onToggle = useCallback(
            (checked: boolean, filter: FilterItem) => {
                if (checked) {
                    if (filter.subFilters?.length) {
                        const subFiltersToAdd = filter.subFilters.filter(
                            subFilter =>
                                !filters.find(
                                    ({ name, type }) =>
                                        name === subFilter.name &&
                                        type === subFilter.type
                                )
                        );
                        onFilter(
                            filters.concat(filter).concat(subFiltersToAdd)
                        );
                    } else {
                        onFilter(filters.concat(filter));
                    }
                } else {
                    onFilter(
                        filters.filter(
                            ({ name, type }) =>
                                !(name === filter.name && type === filter.type)
                        )
                    );
                }
            },
            [filters, onFilter]
        );

        return (
            <div className={className}>
                {Object.keys(filterItems).map((key, i) =>
                    filterItems?.[key].length ? (
                        <FilterGroup
                            title={CONTENT_TYPE_NAME_MAP[key]}
                            allFilters={filterItems[key]}
                            activeFilters={filters}
                            onToggle={onToggle}
                            key={i}
                        />
                    ) : null
                )}
            </div>
        );
    }
);

DesktopFilters.displayName = 'DesktopFilters';

export default DesktopFilters;
