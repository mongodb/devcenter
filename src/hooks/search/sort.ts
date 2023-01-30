import { useCallback, useState } from 'react';
import { defaultSortByType, SortByType } from '../../components/search/types';

const useSort = (callback: () => void) => {
    const [sortBy, setSortBy] = useState<SortByType | ''>('');

    const onSort = useCallback(
        (sortByValue?: string) => {
            setSortBy(sortByValue as SortByType);
            callback();
        },
        [callback]
    );

    return {
        sortProps: {
            sortBy,
            onSort,
        },
        clearSort: () => setSortBy(defaultSortByType),
    };
};

export default useSort;
