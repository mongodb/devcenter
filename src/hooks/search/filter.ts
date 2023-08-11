import { FilterItem } from '@mdb/devcenter-components';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { ContentItem } from '../../interfaces/content-item';
import { getFiltersFromQueryStr, itemInFilters } from './utils';

const useFilter = (
    callback: () => void,
    filterItems?: { key: string; value: FilterItem[] }[]
) => {
    const router = useRouter();
    const [filters, setFilters] = useState<FilterItem[]>([]);

    const onFilter = useCallback(
        (filters: FilterItem[]) => {
            setFilters(filters);
            callback();
        },
        [callback]
    );

    useEffect(() => {
        if (router?.isReady) {
            if (filterItems) {
                const allNewFilters = getFiltersFromQueryStr(
                    router.query,
                    filterItems
                );
                console.log(
                    `[JW DEBUG] allNewFilters: ${JSON.stringify(
                        allNewFilters,
                        null,
                        2
                    )}`
                );
                setFilters(allNewFilters);
            }
        }
    }, [filterItems, router?.isReady, router.query]);

    const hasFiltersSet = !!filters.length;

    // refactor the map out of itemInFilters()
    // so it is created once instead of searchData.length times
    const allFiltersTypeMap: { [type: string]: FilterItem[] } = {};
    filters.forEach((filter: FilterItem) => {
        if (!filter.type) return;

        if (!allFiltersTypeMap[filter.type]) {
            allFiltersTypeMap[filter.type] = [];
        }

        allFiltersTypeMap[filter.type].push(filter);
    });

    console.log(
        `[JW DEBUG] allFiltersTypeMap: ${JSON.stringify(
            allFiltersTypeMap,
            null,
            2
        )}`
    );

    const filterData = useCallback(
        searchData => {
            if (!searchData) {
                return [];
            } else if (!hasFiltersSet) {
                return searchData;
            } else {
                return searchData.filter((item: ContentItem) => {
                    return itemInFilters(item, allFiltersTypeMap);
                });
            }
        },
        [hasFiltersSet, filters]
    );

    return {
        filterProps: {
            filters,
            onFilter,
        },
        filterData,
        clearFilters: () => setFilters([]),
    };
};

export default useFilter;
