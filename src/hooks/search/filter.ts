import { FilterItem } from '@mdb/devcenter-components';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { SortByType } from '../../components/search/types';
import { ContentItem } from '../../interfaces/content-item';
import { itemInFilters } from './utils';

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

    const getFiltersFromQueryStr = useCallback(() => {
        const l1Items = filterItems?.find(
            item => item.key === 'L1Product'
        )?.value;
        const contentTypeItems = filterItems?.find(
            item => item.key === 'ContentType'
        )?.value;
        const languageItems = filterItems?.find(
            item => item.key === 'ProgrammingLanguage'
        )?.value;
        const technologyItems = filterItems?.find(
            item => item.key === 'Technology'
        )?.value;
        const contributedByItems = filterItems?.find(
            item => item.key === 'AuthorType'
        )?.value;
        const expertiseLevelItems = filterItems?.find(
            item => item.key === 'ExpertiseLevel'
        )?.value;

        const {
            product,
            language,
            technology,
            contributedBy,
            contentType,
            expertiseLevel,
        } = router.query;

        const buildFilters = (
            filterType: string | string[],
            filterTypeItems: FilterItem[]
        ) => {
            const items =
                typeof filterType === 'object' ? filterType : [filterType];
            let filtersList: FilterItem[] = [];

            // Gotta look for L1s and L2s that match.
            items.forEach(item => {
                const filterProduct = filterTypeItems.find(
                    l1 =>
                        l1.name === item ||
                        l1.subFilters?.find(l2 => l2.name === item)
                );
                if (filterProduct) {
                    if (filterProduct.name !== item) {
                        // This means it's an L2 match.
                        filtersList.push(
                            filterProduct.subFilters?.find(
                                l2 => l2.name === item
                            ) as FilterItem
                        );
                    } else {
                        filtersList.push(filterProduct);
                    }
                }
            });
            return filtersList;
        };

        let allNewFilters: FilterItem[] = [];
        if (product && l1Items) {
            const productFilters: FilterItem[] = buildFilters(product, l1Items);
            allNewFilters = allNewFilters.concat(productFilters);
        }
        if (contentType && contentTypeItems) {
            const contentTypeFilters: FilterItem[] = buildFilters(
                contentType,
                contentTypeItems
            );
            allNewFilters = allNewFilters.concat(contentTypeFilters);
        }
        // For the rest, just map it to the corresponding item.
        if (language && languageItems) {
            // Technically can either come in as a string of a string[], so convert to a string[]
            // and loop over by default.
            const languages =
                typeof language === 'object' ? language : [language];
            const languageFilters = languageItems.filter(lang =>
                languages.includes(lang.name)
            );
            allNewFilters = allNewFilters.concat(languageFilters);
        }
        if (technology && technologyItems) {
            const technologies =
                typeof technology === 'object' ? technology : [technology];
            const technologyFilters = technologyItems.filter(tech =>
                technologies.includes(tech.name)
            );
            allNewFilters = allNewFilters.concat(technologyFilters);
        }
        if (contributedBy && contributedByItems) {
            const contributedBys =
                typeof contributedBy === 'object'
                    ? contributedBy
                    : [contributedBy];
            const contributedByFilters = contributedByItems.filter(contrib =>
                contributedBys.includes(contrib.name)
            );
            allNewFilters = allNewFilters.concat(contributedByFilters);
        }
        if (expertiseLevel && expertiseLevelItems) {
            const expertiseLevels =
                typeof expertiseLevel === 'object'
                    ? expertiseLevel
                    : [expertiseLevel];
            const expertiseLevelFilters = expertiseLevelItems.filter(exp =>
                expertiseLevels.includes(exp.name)
            );
            allNewFilters = allNewFilters.concat(expertiseLevelFilters);
        }
        return allNewFilters;
    }, [filterItems, router.query]);

    useEffect(() => {
        if (router?.isReady) {
            if (!!filterItems) {
                const allNewFilters = getFiltersFromQueryStr();
                setFilters(allNewFilters);
            }
        }
    }, [filterItems, getFiltersFromQueryStr, router?.isReady, router.query]);

    const hasFiltersSet = !!filters.length;
    const filterData = useCallback(
        searchData => {
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
