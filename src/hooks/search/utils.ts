import { Fetcher } from 'swr';
import { NextRouter } from 'next/router';

import getAllSearchContent from '../../api-requests/get-all-search-content';
import { PillCategory } from '../../types/pill-category';
import { SearchItem } from '../../components/search/types';
import { FilterItem } from '../../components/search-filters';
import { Tag } from '../../interfaces/tag';
import { ContentItem } from '../../interfaces/content-item';
import { Image } from '../../interfaces/image';
import { Author } from '../../interfaces/author';
import { getURLPath } from '../../utils/format-url-path';
import { SortByType } from '../../components/search/types';
import {
    sortByOptions,
    DEFAULT_PAGE_SIZE,
} from '../../components/search/utils';

export const createInitialSearchData = (
    initialSearchContent: SearchItem[] | undefined,
    pageNumber: number
) => {
    if (!!initialSearchContent && Array.isArray(initialSearchContent)) {
        const initialSearchData = initialSearchContent.map(
            searchItemToContentItem
        );

        const start = pageNumber > 1 ? (pageNumber - 1) * DEFAULT_PAGE_SIZE : 0;
        return initialSearchData.slice(start, pageNumber * DEFAULT_PAGE_SIZE);
    }
};

export const searchItemToContentItem = ({
    type,
    authors,
    name,
    image,
    description,
    slug,
    date,
    tags,
}: SearchItem): ContentItem => {
    const itemImage: Image | undefined =
        // Sometimes the image url can be an object with an "$undefined" key.
        !!image && !!image.url && typeof image.url === 'string'
            ? {
                  url: image.url,
                  alt: image.alternativeText,
              }
            : undefined;
    const itemAuthors: Author[] = authors.map(auth => ({
        name: auth.name,
        image: {
            url: auth.image.url,
            alt: auth.image.alternativeText,
        },
        calculated_slug: auth.calculated_slug,
    }));
    return {
        authors: itemAuthors,
        category: type,
        contentDate: date,
        description,
        image: itemImage,
        slug: slug,
        tags,
        title: name,
        featured: false,
    };
};

export const getFilters = async (
    contentType?: PillCategory,
    allSearchContent?: SearchItem[]
) => {
    const allFilters = contentType === undefined;
    const allContent: SearchItem[] =
        allSearchContent || (await getAllSearchContent());
    const filterItems: FilterItem[] = [];

    allContent.forEach(({ tags, type }) => {
        tags.forEach(tag => {
            if (!tag.name) return; // Short circuit if the tag name is null.
            if (tag.type === 'L2Product') {
                const l2FilterItem: FilterItem = {
                    type: tag.type,
                    name: tag.name,
                    count: allFilters || type === contentType ? 1 : 0,
                    subItems: [],
                };
                const l1 = tags.filter(tag => tag.type === 'L1Product')[0]; // There should always be an L1 on a piece with an L2 tag.
                const l1FilterItem = filterItems.find(
                    item => item.type === 'L1Product' && item.name === l1.name
                );
                if (l1FilterItem) {
                    // If L1 exists, check if L2 is attached to it yet.
                    const existingL2 = l1FilterItem.subItems.find(
                        subItem =>
                            l2FilterItem.name === subItem.name &&
                            l2FilterItem.type === subItem.type
                    );
                    if (existingL2) {
                        // If L2 is already attached, only bump the count (if the content type matches).
                        if (allFilters || type === contentType) {
                            existingL2.count++;
                        }
                        return;
                    }
                    return l1FilterItem.subItems.push(l2FilterItem); // If L2 is not yet attached, attach it.
                } else {
                    // If the L1 doesn't exist, neither does the L2, so create L1 and add new L2 to it.
                    const l1FilterItem: FilterItem = {
                        type: l1.type,
                        name: l1.name,
                        subItems: [l2FilterItem],
                        count: allFilters || type === contentType ? 1 : 0,
                    };
                    return filterItems.push(l1FilterItem);
                }
            } else if (tag.type === 'CodeLevel') {
                // Basically repeating the logic for L2s, can probably be separated and reused.
                const codeLevelItem: FilterItem = {
                    type: tag.type,
                    name: tag.name,
                    count: allFilters || type === contentType ? 1 : 0,
                    subItems: [],
                };
                const codeExampleFilterItem = filterItems.find(
                    item =>
                        item.type === 'ContentType' &&
                        item.name === 'Code Example'
                );
                if (codeExampleFilterItem) {
                    // If code examples tag already exists, check if this code level is attached.
                    const existingCodeLevel =
                        codeExampleFilterItem.subItems.find(
                            subItem =>
                                codeLevelItem.name === subItem.name &&
                                codeLevelItem.type === codeLevelItem.type
                        );
                    if (existingCodeLevel) {
                        // If code level is already attached, only bump the count (if the content type matches).
                        if (allFilters || type === contentType) {
                            existingCodeLevel.count++;
                        }
                        return;
                    }
                    return codeExampleFilterItem.subItems.push(codeLevelItem);
                } else {
                    // If the Code Example tag doesn't exist, neither does the L2, so create L1 and add new L2 to it.
                    const codeExampleFilterItem: FilterItem = {
                        type: 'ContentType',
                        name: 'Code Example',
                        subItems: [codeLevelItem],
                        count: allFilters || type === contentType ? 1 : 0,
                    };
                    return filterItems.push(codeExampleFilterItem);
                }
            } else {
                // For everything else, just check if it exists.
                const existingItem = filterItems.find(
                    filter =>
                        filter.name === tag.name && filter.type === tag.type
                );
                if (existingItem) {
                    // If it exists, increment count only if the content type matches.
                    if (allFilters || type === contentType) {
                        existingItem.count++;
                    }
                    return;
                } else {
                    // If not, add it to the list.
                    const filterItem: FilterItem = {
                        type: tag.type,
                        name: tag.name,
                        count: allFilters || type === contentType ? 1 : 0,
                        subItems: [],
                    };
                    return filterItems.push(filterItem);
                }
            }
        });
    });

    // Sort everything by count.

    // Sort sub items.
    filterItems.forEach(item => {
        if (item.subItems.length) {
            item.subItems.sort((prev, next) => next.count - prev.count);
        }
    });

    const l1Items = filterItems
        .filter(({ type }) => type === 'L1Product')
        .sort((prev, next) => next.count - prev.count);
    const languageItems = filterItems
        .filter(({ type }) => type === 'ProgrammingLanguage')
        .sort((prev, next) => next.count - prev.count);
    const technologyItems = filterItems
        .filter(({ type }) => type === 'Technology')
        .sort((prev, next) => next.count - prev.count);
    const contributedByItems = filterItems
        .filter(({ type }) => type === 'AuthorType')
        .sort((prev, next) => next.count - prev.count);
    const contentTypeItems = filterItems
        .filter(({ type }) => type === 'ContentType')
        .sort((prev, next) => next.count - prev.count);
    const expertiseLevelItems = filterItems
        .filter(({ type }) => type === 'ExpertiseLevel')
        .sort((prev, next) => next.count - prev.count);

    // Parse the code levels from the subitmes of the Code Example content type filter.
    const codeLevelItems = filterItems
        .filter(
            item => item.type === 'ContentType' && item.name === 'Code Example'
        )[0]
        .subItems.sort((prev, next) => next.count - prev.count);

    return {
        l1Items,
        languageItems,
        technologyItems,
        contributedByItems,
        contentTypeItems,
        expertiseLevelItems,
        codeLevelItems,
    };
};

const itemInFilterGroup = (tags: Tag[], filters: FilterItem[]) => {
    // This is inclusive within filter groups. If you check Python and C#, you get both Python and C# content.
    if (!filters.length) return true;
    return tags.some(tag =>
        filters.some(
            filter => filter.name === tag.name && filter.type === tag.type
        )
    );
};

export const hasEmptyFilterAndQuery = (
    searchString: string,
    allFilters: FilterItem[]
) => {
    return (!searchString || searchString == '') && allFilters.length == 0;
};

// TODO: Refactor.
export const getResultData = (
    data: ContentItem[],
    initialSearchData: ContentItem[] | undefined,
    searchString: string,
    allFilters: FilterItem[],
    initialPageNumber: number,
    initialPageResetFlag: boolean
) => {
    return initialSearchData && hasEmptyFilterAndQuery(searchString, allFilters)
        ? initialSearchData
        : data.slice(
              !initialPageResetFlag && initialPageNumber > 1
                  ? (initialPageNumber - 1) * DEFAULT_PAGE_SIZE
                  : 0
          );
};

export const getResultIsValidating = (
    initialSearchData: ContentItem[] | undefined,
    searchString: string,
    allFilters: FilterItem[],
    isValidating: boolean
) => {
    return initialSearchData && hasEmptyFilterAndQuery(searchString, allFilters)
        ? false
        : isValidating;
};

export const itemInFilters = (
    { tags }: ContentItem,
    allFilters: FilterItem[]
) => {
    // This is exclusive between filter groups. If you check Python and Atlas, you only get things that are both Pyhton and Atlas,
    // not everythign Pyhton and everything Atlas.
    const productFilters = allFilters.filter(
        ({ type }) => type === 'L1Product' || type === 'L2Product'
    );
    const languageFilters = allFilters.filter(
        ({ type }) => type === 'ProgrammingLanguage'
    );
    const techFilters = allFilters.filter(({ type }) => type === 'Technology');
    const expertiseFilters = allFilters.filter(
        ({ type }) => type === 'ExpertiseLevel'
    );
    const contributedByFilters = allFilters.filter(
        ({ type }) => type === 'AuthorType'
    );
    const contentTypeFilters = allFilters.filter(
        ({ type }) => type === 'ContentType'
    );
    const codeLevelFilters = allFilters.filter(
        ({ type }) => type === 'CodeLevel'
    );
    return (
        itemInFilterGroup(tags, productFilters) &&
        itemInFilterGroup(tags, languageFilters) &&
        itemInFilterGroup(tags, techFilters) &&
        itemInFilterGroup(tags, expertiseFilters) &&
        itemInFilterGroup(tags, contributedByFilters) &&
        itemInFilterGroup(tags, contentTypeFilters) &&
        itemInFilterGroup(tags, codeLevelFilters)
    );
};

export const fetcher: Fetcher<ContentItem[], string> = queryString => {
    return fetch((getURLPath('/api/search') as string) + '?' + queryString, {
        method: 'POST',
        body: JSON.stringify({
            filters: [],
        }),
    }).then(async response => {
        const r_json: SearchItem[] = await response.json();
        return r_json.map(searchItemToContentItem);
    });
};

export const updateUrl = (
    router: NextRouter,
    filters: FilterItem[],
    searchString: string,
    sortBy?: SortByType
) => {
    if (!sortBy) {
        sortBy = 'Most Recent';
    }
    // Have to preserve the filters here as well.
    const product = filters
        .filter(
            filter => filter.type === 'L1Product' || filter.type === 'L2Product'
        )
        .map(filter => filter.name);
    const language = filters
        .filter(filter => filter.type === 'ProgrammingLanguage')
        .map(filter => filter.name);
    const technology = filters
        .filter(filter => filter.type === 'Technology')
        .map(filter => filter.name);
    const contentType = filters
        .filter(
            filter =>
                filter.type === 'ContentType' || filter.type === 'CodeLevel'
        )
        .map(filter => filter.name);
    const contributedBy = filters
        .filter(filter => filter.type === 'AuthorType')
        .map(filter => filter.name);
    const expertiseLevel = filters
        .filter(filter => filter.type === 'ExpertiseLevel')
        .map(filter => filter.name);

    router.replace(
        {
            pathname: router.pathname,
            query: {
                s: searchString,
                product,
                language,
                technology,
                contentType,
                contributedBy,
                expertiseLevel,
                sortMode: sortByOptions[sortBy as SortByType],
            },
        },
        undefined,
        { scroll: false, shallow: true }
    );
};
