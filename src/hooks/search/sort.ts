import { useCallback, useState } from 'react';
import { defaultSortByType, SortByType } from '../../components/search/types';

const useSort = (callback: () => void, contentType?: string) => {
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
        clearSort: () =>
            setSortBy(contentType === 'Video' ? 'Upcoming' : defaultSortByType),
    };
};

export default useSort;
