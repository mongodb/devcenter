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
                setFilters(allNewFilters);
            }
        }
    }, [filterItems, router?.isReady, router.query]);

    const hasFiltersSet = !!filters.length;

    const subFilterTypeToMainFilterType: Record<string, string> = {};
    filterItems?.forEach((filterItem: { key: string; value: FilterItem[] }) => {
        filterItem.value.forEach((filter: FilterItem) => {
            if (!filter.subFilters?.length) return;

            filter.subFilters.forEach((subfilter: FilterItem) => {
                const subfilterType = subfilter.type as string;
                subFilterTypeToMainFilterType[subfilterType] =
                    filter.type as string;
            });
        });
    });

    // refactor the map out of itemInFilters()
    // so it is created once instead of searchData.length times
    const allFiltersTypeMap: { [type: string]: FilterItem[] } = {};
    filters.forEach((filter: FilterItem) => {
        if (!filter.type) return;

        let filterType = filter.type;
        if (filterType in subFilterTypeToMainFilterType) {
            filterType = subFilterTypeToMainFilterType[filterType];
        }

        if (!allFiltersTypeMap[filterType]) {
            allFiltersTypeMap[filterType] = [];
        }

        allFiltersTypeMap[filterType].push(filter);
    });

    const filterData = useCallback(
        searchData => {
            if (!searchData) return [];
            if (!hasFiltersSet) return searchData;

            for (const data of searchData as ContentItem[]) {
                if (data.category != 'Event') continue;
            }

            return searchData.filter((item: ContentItem) => {
                return itemInFilters(item, allFiltersTypeMap);
            });
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
