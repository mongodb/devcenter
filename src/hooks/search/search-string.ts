import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEBOUNCE_WAIT } from '../../data/constants';

const useSearchString = (callback: () => void) => {
    const router = useRouter();
    const [searchString, setSearchString] = useState('');

    const onSearch = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchString(event.target.value);
            callback();
        },
        [callback]
    );

    const debouncedOnSearch = useMemo(
        () => debounce(onSearch, DEBOUNCE_WAIT),
        [onSearch]
    );

    // Stop the invocation of the debounced function after unmounting.
    useEffect(() => {
        return () => {
            debouncedOnSearch.cancel();
        };
    }, [debouncedOnSearch]);

    // Populate the search/filters with query params on page load/param change if we have a router and filters defined.
    useEffect(() => {
        if (router?.isReady) {
            const { s } = router.query;

            if (s && typeof s === 'string' && s !== searchString) {
                setSearchString(s);
            }
        }
    }, [router?.isReady]); // Missing query dependency, but that's ok because we only need this on first page load.

    return {
        searchProps: {
            searchString,
            onSearch: debouncedOnSearch,
        },
        clearSearch: () => setSearchString(''),
    };
};

export default useSearchString;
