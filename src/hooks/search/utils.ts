import { Fetcher } from 'swr';

import getAllSearchContent from '../../api-requests/get-all-search-content';
import { PillCategory } from '../../types/pill-category';
import { defaultSortByType, SearchItem } from '../../components/search/types';
import { FilterItem } from '@mdb/devcenter-components';
import { ContentItem } from '../../interfaces/content-item';
import { Image } from '../../interfaces/image';
import { Author } from '../../interfaces/author';
import { getURLPath } from '../../utils/format-url-path';
import { SortByType } from '../../components/search/types';
import { sortByOptions } from '../../components/search/utils';
import {
    FILTER_ITEM_MODEL,
    FILTER_ITEM_QUERY_MAP,
    FILTER_ITEM_SUBFILTER_MAP,
    FILTER_ITEM_TYPE_MAP,
} from '../../data/constants';
import { ParsedUrlQuery } from 'querystring';
import { Tag } from '../../interfaces/tag';
import { TagType } from '../../types/tag-type';

export const searchItemToContentItem = ({
    type,
    authors,
    name,
    image,
    description,
    slug,
    date,
    start_time,
    end_time,
    tags,
    location,
    city,
    state,
    country,
    coordinates,
    video_type,
}: SearchItem): ContentItem => {
    const itemImage: Image | undefined =
        // Sometimes the image url can be an object with an "$undefined" key.
        !!image && !!image.url && typeof image.url === 'string'
            ? {
                  url: image.url,
                  alt: image.alternativeText,
              }
            : city
            ? { url: '', city }
            : undefined;

    const itemAuthors: Author[] = authors.map(auth => ({
        name: auth.name,
        image: {
            url: auth.image.url,
            alt: auth.image.alternativeText,
        },
        calculated_slug: auth.calculated_slug,
    }));

    const contentDate = (
        start_time && end_time ? [start_time, end_time] : date
    ) as string | [string, string];

    const subCategory = (tags?.find(tag => tag?.type === 'EventType')?.name ||
        undefined) as PillCategory;

    return {
        authors: itemAuthors,
        category: type,
        subCategory,
        contentDate,
        description,
        image: itemImage,
        slug: slug,
        tags,
        title: name,
        featured: false,
        location,
        city,
        state,
        country,
        coordinates,
        videoType: video_type,
    };
};

export const searchFetcher: Fetcher<ContentItem[], string> = queryString => {
    return fetch(
        (getURLPath('/api/search') as string) + '?' + queryString
    ).then(async response => {
        const r_json: SearchItem[] = await response.json();
        return r_json.map(searchItemToContentItem);
    });
};

export const locationFetcher: Fetcher<
    google.maps.places.AutocompletePrediction[],
    string
> = queryString => {
    return fetch(
        (getURLPath('/api/location') as string) + '?' + queryString
    ).then(async response => {
        const r_json = await response.json();
        return r_json.results;
    });
};

const tagToFilter = ({ name, type }: Tag): FilterItem => ({
    name,
    type,
    subFilters: [],
    count: 0,
});

const itemMatches = (item1: FilterItem | Tag, item2: FilterItem | Tag) =>
    item1.name === item2.name && item1.type === item2.type;

const itemId = (item: FilterItem | Tag, parent?: FilterItem | Tag) =>
    `${item.name},${item.type}` +
    (parent ? `,${parent.name},${parent.type}` : '');

const sortFilterItems = (items: FilterItem[]) => {
    if (!items.length) return;

    // Sort L2 items (subFilters) by count
    items.forEach(({ subFilters }) => {
        if (subFilters) {
            subFilters.sort((a: FilterItem, b: FilterItem) =>
                (a?.count || -1) < (b?.count || -1) ? 1 : -1
            );
        }
    });

    // Sort L1 items by count
    items.sort((a: FilterItem, b: FilterItem) =>
        (a?.count || -1) < (b?.count || -1) ? 1 : -1
    );
};

// Business logic/one-offs to ensure improperly tagged content doesn't end up in the filter list
const fixForImproperlyTaggedContent = (filterItems: FilterItem[]) => {
    const fixCodeLevelSubFilters = (item: FilterItem) => {
        const filtered =
            item.subFilters?.filter(tag => tag.type !== 'CodeLevel') || [];

        if (
            filtered.length !== item.subFilters?.length &&
            !(item.type === 'ContentType' && item.name === 'Code Example')
        ) {
            item.subFilters = filtered;
        }
    };

    filterItems.forEach((item: FilterItem) => {
        fixCodeLevelSubFilters(item);
        // ...add more here if needed
    });
};

export const getFilters = async (
    contentType?: PillCategory,
    allSearchContent?: SearchItem[]
) => {
    const pageType = (contentType || 'Search') as PillCategory | 'Search';

    const allContent: SearchItem[] =
        allSearchContent || (await getAllSearchContent());

    const itemFreqMap: { [id: string]: number } = {};

    // First pass, construct all first level filters
    const filterItems = allContent.flatMap(({ tags, type: itemType }) => {
        const matchingType =
            contentType === itemType || contentType === undefined;

        return tags.flatMap(tag => {
            const itemModel = FILTER_ITEM_TYPE_MAP[tag.type || ''];

            const checkForContentType =
                itemModel?.contentTypeFilter &&
                !itemModel?.contentTypeFilter.includes(pageType);
            contentType !== undefined; // All filters should be shown on sitewide search

            const id = itemId(tag);
            const itemFreq = itemFreqMap[id];
            const newItem = !itemFreq && itemFreq !== 0;

            if (matchingType) {
                itemFreqMap[id] = newItem ? 1 : itemFreq + 1;
            } else if (newItem) {
                // If the content type doesn't match, we still want to display,
                // but set the frequency to 0 to push to the bottom of the list
                itemFreqMap[id] = 0;
            }

            if (!itemModel || checkForContentType || !newItem) return [];

            return [tagToFilter(tag)];
        });
    });

    // Second pass, add in the second level filters
    allContent.forEach(({ tags }) => {
        tags.forEach(tag => {
            const parentType = FILTER_ITEM_SUBFILTER_MAP[tag.type];

            if (!parentType) return;

            const matchingTag = tags.find(tag => tag.type === parentType);
            const parentFilterItem =
                matchingTag &&
                filterItems.find(item => itemMatches(item, matchingTag));

            if (!parentFilterItem) return;

            const existingSubFilter = parentFilterItem.subFilters?.find(item =>
                itemMatches(item, tag)
            );

            if (!existingSubFilter) {
                parentFilterItem.subFilters?.push(tagToFilter(tag));
            }
        });
    });

    // Update the counts on all filter items & sub filter items based on the frequency map
    filterItems.forEach(item => {
        item.subFilters?.forEach(subItem => {
            subItem.count = itemFreqMap[itemId(subItem)] || 0;
        });

        item.count = itemFreqMap[itemId(item)] || 0;
    });

    fixForImproperlyTaggedContent(filterItems);

    const topDisplayItems: { key: string; value: FilterItem[] }[] = [];

    // Sort by count and convert to an object that the Filter components are able to display
    const filterDisplayItems = FILTER_ITEM_MODEL.flatMap(model => {
        const matchingItems = filterItems.filter(
            item => item.type === model.type
        );

        sortFilterItems(matchingItems);

        if (
            matchingItems.length &&
            model?.contentTypeFilter &&
            pageType !== 'Search' &&
            model.contentTypeFilter.includes(pageType)
        ) {
            topDisplayItems.push({
                key: model.displayName,
                value: matchingItems,
            });
            return [];
        }

        return matchingItems.length
            ? [{ key: model.displayName, value: matchingItems }]
            : [];
    });

    return topDisplayItems.concat(filterDisplayItems);
};

export const hasEmptyFilterAndQuery = (
    searchString: string,
    allFilters: FilterItem[]
) => {
    return !searchString && allFilters.length == 0;
};

export const isEmptyArray = (results: any) => {
    return !results || (Array.isArray(results) && results.length === 0);
};

export const itemInFilters = (
    { tags }: ContentItem,
    allFilters: FilterItem[]
) => {
    if (!allFilters.length) return true;

    // Group tags by their type
    const allFiltersTypeMap: { [type: string]: FilterItem[] } = {};

    allFilters.forEach((filter: FilterItem) => {
        if (filter.type) {
            if (!allFiltersTypeMap[filter.type]) {
                allFiltersTypeMap[filter.type] = [filter];
            } else {
                allFiltersTypeMap[filter.type].push(filter);
            }
        }
    });

    // AND filters with different types, OR filters of the same type
    return Object.values(allFiltersTypeMap).every((filters: FilterItem[]) =>
        tags.some(tag =>
            filters.some(
                (filter: FilterItem) =>
                    filter.name === tag.name && filter.type === tag.type
            )
        )
    );
};

export const updateUrl = (
    pathname: string,
    filters: FilterItem[],
    searchString: string,
    sortBy?: SortByType | ''
) => {
    // Build an array of pairs of query string keys and values
    const filterParams = filters.reduce((acc: [string, string][], filter) => {
        if (!filter.type) return acc;

        const l1Query = FILTER_ITEM_TYPE_MAP[filter.type]?.query;
        const l2Query = FILTER_ITEM_MODEL.find(x =>
            x.subFilters?.includes((filter.type || '') as TagType)
        )?.query;
        const query = l1Query || l2Query;

        return query ? [...acc, [query, filter.name]] : acc;
    }, []) as [string, string][];

    const params = new URLSearchParams([
        ['s', searchString],
        ...filterParams,
        ['sortMode', sortByOptions[sortBy || defaultSortByType].toString()],
    ]);

    replaceHistoryState(`/developer${pathname}/?${params.toString()}`);
};

export const getFiltersFromQueryStr = (
    query: ParsedUrlQuery,
    filterItems: { key: string; value: FilterItem[] }[]
) => {
    /*
        Pick out the valid query string keys, and return a mapping from their associated types to the query string values as an array
        e.g. a query string of 'language=Java&foo=bar' would transform to { 'ProgrammingLanguage': ['Java'] } (filtering out the invalid qs)
        Multiple of the same key: 'language=Java&language=Python' -> { 'ProgrammingLanguage': ['Java', 'Python'] }
        Types with subFilters are duplicated with the subFilter: 'product=Schema' -> { L1Product: ['Schema'], L2Product: ['Schema']}
    */
    const filterTypeMap = Object.keys(query).reduce((acc, qs) => {
        const model = FILTER_ITEM_QUERY_MAP[qs];
        if (!model) return acc;

        const queryValue = Array.isArray(query[qs]) ? query[qs] : [query[qs]];
        const subFilterMap =
            model.subFilters?.reduce(
                (a, v) => ({ ...a, [v]: queryValue }),
                {}
            ) || {};

        return { ...acc, [model.type]: queryValue, ...subFilterMap };
    }, {}) as { [type: string]: string[] };

    // Flatten filterItems into a 1D array containing all L1 and L2 filters
    const allFiltersAndSubFilters = filterItems.reduce(
        (acc: FilterItem[], item: { key: string; value: FilterItem[] }) => [
            ...acc,
            ...item.value,
            ...(item.value.flatMap(x => x.subFilters) as FilterItem[]),
        ],
        []
    );

    // Return filters that have matching type/names with the provided query string type/values
    return allFiltersAndSubFilters.filter(item =>
        item.type && filterTypeMap[item.type]
            ? filterTypeMap[item.type].includes(item.name)
            : false
    );
};

/* 
    Preferred alternative to next/router's replace function because it doesn't cause a page rerender.
    Only caveat to the page not rerendering is that the page won't react to the new query params.
*/
export const replaceHistoryState = (url: string) => {
    window.history.replaceState(
        { ...window.history.state, as: url, url },
        '',
        url
    );
};

export const swrOptions = {
    // revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
};
