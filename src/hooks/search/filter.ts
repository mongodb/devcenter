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
    const filterData = useCallback(
        (searchData: ContentItem[]) => {
            if (!searchData) {
                return [];
            } else if (!hasFiltersSet) {
                return searchData;
            } else {
                return searchData.filter((item: ContentItem) => {
                    return itemInFilters(item, filters);
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
