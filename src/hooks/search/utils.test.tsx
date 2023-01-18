import '@testing-library/jest-dom';

import { Tag } from '../../interfaces/tag';

import {
    getFilters,
    getFiltersFromQueryStr,
    isEmptyArray,
    itemInFilters,
    updateUrl,
} from './utils';
import { MOCK_ARTICLE_TAGS } from '../../mockdata/mock-tags';
import { SearchItem } from '../../components/search/types';
import { FilterItem } from '@mdb/devcenter-components';
import querystring, { ParsedUrlQuery } from 'querystring';
import { ContentItem } from '../../interfaces/content-item';

test('correctly checks if array is empty', () => {
    expect(isEmptyArray([{}, {}])).toBeFalsy();
    expect(isEmptyArray([])).toBeTruthy();
    expect(isEmptyArray(null)).toBeTruthy();
    expect(isEmptyArray(undefined)).toBeTruthy();
});

const mockImage = {
    url: 'url',
    alternativeText: 'alt',
    city: 'city',
};

const mockSearchDataFactory = (tags: Tag[]) =>
    [
        {
            type: 'Article',
            authors: [
                {
                    name: 'Author',
                    image: mockImage,
                    calculated_slug: '/slug',
                },
            ],
            name: 'Article Name',
            image: mockImage,
            description: 'Article Description',
            slug: '/articles/article',
            date: '2022-12-20T02:31:39.476Z',
            tags,
        },
    ] as SearchItem[];

describe('getFilters', () => {
    test('Top level tags on search items show up in outputted filters', async () => {
        const mockSearchData = mockSearchDataFactory(MOCK_ARTICLE_TAGS);
        const filterItemValues = (
            await getFilters('Article', mockSearchData)
        ).flatMap(item => item.value);

        MOCK_ARTICLE_TAGS.forEach((tag: Tag) => {
            expect(
                filterItemValues.some(
                    (x: FilterItem) =>
                        x.name === tag.name && x.type === tag.type
                )
            ).toBeTruthy();
        });
    });

    test('Sub-filters are grouped together with their parent filter properly', async () => {
        const tags = [
            // Snippet should be grouped in a subfilter under the content type tag
            {
                name: 'Code Example',
                type: 'ContentType',
                slug: '/code-examples',
            },
            { name: 'Snippet', type: 'CodeLevel', slug: '/code-examples' },
        ] as Tag[];

        const mockSearchData = mockSearchDataFactory(tags);
        const filterItems = await getFilters(undefined, mockSearchData);
        const contentTypeFilterItems = filterItems.find(
            item => item.key === 'Content Type'
        )?.value;

        expect(contentTypeFilterItems).toBeDefined();
        expect(contentTypeFilterItems?.length).toBe(1);
        expect(contentTypeFilterItems?.[0].subFilters?.length).toBe(1);
        expect(contentTypeFilterItems?.[0].subFilters?.[0].type).toBe(
            'CodeLevel'
        );
        expect(contentTypeFilterItems?.[0].subFilters?.[0].name).toBe(
            'Snippet'
        );
    });

    test('ContentType-specific filters only show up with that content type', async () => {
        const tags = [
            { name: 'Snippet', type: 'CodeLevel', slug: '/code-examples' },
        ] as Tag[];

        const mockSearchData = mockSearchDataFactory(tags);
        const filterItemsCodeExampleContentType = await getFilters(
            'Code Example',
            mockSearchData
        );
        const filterItemsArticleContentType = await getFilters(
            'Article',
            mockSearchData
        );

        expect(filterItemsCodeExampleContentType.length).toBe(1);
        expect(filterItemsArticleContentType.length).toBe(0);
    });

    test('CodeLevel filters are scrubbed out of all content type tags except Code Examples', async () => {
        const articleContentTypeTags = [
            { name: 'Article', type: 'ContentType', slug: '/articles' },
            { name: 'Snippet', type: 'CodeLevel', slug: '/code-examples' },
        ] as Tag[];

        const codeExampleContentTypeTags = [
            {
                name: 'Code Example',
                type: 'ContentType',
                slug: '/code-examples',
            },
            { name: 'Snippet', type: 'CodeLevel', slug: '/code-examples' },
        ] as Tag[];

        const articleFilterItems = await getFilters(
            undefined,
            mockSearchDataFactory(articleContentTypeTags)
        );
        const codeExampleFilterItems = await getFilters(
            undefined,
            mockSearchDataFactory(codeExampleContentTypeTags)
        );

        expect(
            articleFilterItems?.find(x => x.key === 'Content Type')?.value?.[0]
                ?.subFilters?.length
        ).toBe(0);
        expect(
            codeExampleFilterItems?.find(x => x.key === 'Content Type')
                ?.value?.[0]?.subFilters?.length
        ).toBe(1);
    });

    test('Sorting filters by count works properly', async () => {
        const allTags = [
            {
                name: 'JavaScript',
                type: 'ProgrammingLanguage',
                slug: '/languages/javascript',
            },
            {
                name: 'C#',
                type: 'ProgrammingLanguage',
                slug: '/expertise-levels/csharp',
            },
            {
                name: 'Python',
                type: 'ProgrammingLanguage',
                slug: '/technologies/python',
            },
            {
                name: 'Kotlin',
                type: 'ProgrammingLanguage',
                slug: '/products/kotlin',
            },
            {
                name: 'Java',
                type: 'ProgrammingLanguage',
                slug: '/author-types/java',
            },
        ] as Tag[];

        // Construct 5 search items, each with one more tag than the last
        // Output should end up sorted in the order of the allTags array items
        const searchData = [...new Array(allTags.length)].flatMap((_, i) =>
            mockSearchDataFactory(allTags.slice(0, i + 1))
        );
        const filterValue = (await getFilters(undefined, searchData))?.[0]
            ?.value;

        expect(filterValue?.[0]?.name).toBe('JavaScript');
        expect(filterValue?.[1]?.name).toBe('C#');
        expect(filterValue?.[2]?.name).toBe('Python');
        expect(filterValue?.[3]?.name).toBe('Kotlin');
        expect(filterValue?.[4]?.name).toBe('Java');
    });

    test('Sorting subFilters by count works properly', async () => {
        const allSubFilterTags = [
            {
                name: 'Search',
                type: 'L2Product',
                slug: '/products/atlas/search',
            },
            {
                name: 'Data API',
                type: 'L2Product',
                slug: '/products/atlas/data-api',
            },
            {
                name: 'Data Lake',
                type: 'L2Product',
                slug: '/products/atlas/data-lake',
            },
            {
                name: 'Charts',
                type: 'L2Product',
                slug: '/products/atlas/charts',
            },
            {
                name: 'Data Federation',
                type: 'L2Product',
                slug: '/products/atlas/data-federation',
            },
        ] as Tag[];

        const searchData = [];

        for (let i = 0; i < allSubFilterTags.length; i++) {
            searchData.push(
                ...[...new Array(allSubFilterTags.length - i)].flatMap(() =>
                    mockSearchDataFactory([
                        {
                            name: 'Atlas',
                            type: 'L1Product',
                            slug: '/products/atlas',
                        },
                        allSubFilterTags[i],
                    ])
                )
            );
        }

        const subFilters = (await getFilters(undefined, searchData))?.[0]
            ?.value?.[0]?.subFilters;

        expect(subFilters?.[0]?.name).toBe('Search');
        expect(subFilters?.[1]?.name).toBe('Data API');
        expect(subFilters?.[2]?.name).toBe('Data Lake');
        expect(subFilters?.[3]?.name).toBe('Charts');
        expect(subFilters?.[4]?.name).toBe('Data Federation');
    });
});

const mockFilterItems = [
    {
        key: 'Language',
        value: [
            {
                name: 'Java',
                type: 'ProgrammingLanguage',
                subFilters: [],
                count: 1,
            },
            {
                name: 'JavaScript',
                type: 'ProgrammingLanguage',
                subFilters: [],
                count: 0,
            },
            {
                name: 'Python',
                type: 'ProgrammingLanguage',
                subFilters: [],
                count: 0,
            },
        ],
    },
    {
        key: 'Technology',
        value: [
            {
                name: 'Serverless',
                type: 'Technology',
                subFilters: [],
                count: 1,
            },
        ],
    },
    {
        key: 'Products',
        value: [
            {
                name: 'MongoDB',
                type: 'L1Product',
                subFilters: [
                    {
                        name: 'Schema',
                        type: 'L2Product',
                        subFilters: [],
                        count: 0,
                    },
                ],
            },
            {
                name: 'Atlas',
                type: 'L1Product',
                subFilters: [
                    {
                        name: 'Search',
                        type: 'L2Product',
                        subFilters: [],
                        count: 0,
                    },
                ],
            },
        ],
    },
];

describe('getFiltersFromQueryString', () => {
    test('Extracts filters correctly and ignores invalid query string keys', () => {
        const query = querystring.parse(
            '?s=&language=Java&foo=bar&sortMode=0'
        ) as ParsedUrlQuery;
        const filters = getFiltersFromQueryStr(query, mockFilterItems);

        expect(filters.length).toBe(1);
        expect(filters[0].type).toBe('ProgrammingLanguage');
        expect(filters[0].name).toBe('Java');
    });

    test('Mulitple filters with the same key are handled correctly', () => {
        const query = querystring.parse(
            'language=Java&language=Python&language=JavaScript'
        ) as ParsedUrlQuery;
        const filters = getFiltersFromQueryStr(query, mockFilterItems);

        expect(filters.length).toBe(3);
        expect([...new Set(filters.map(x => x.type))].length).toBe(1); // Assert all filters have same type
        expect(filters.some(x => x.name === 'Java')).toBeTruthy();
        expect(filters.some(x => x.name === 'Python')).toBeTruthy();
        expect(filters.some(x => x.name === 'JavaScript')).toBeTruthy();
    });

    test('L2 filters are extracted correctly', () => {
        const query = querystring.parse(
            'product=Schema&product=Atlas'
        ) as ParsedUrlQuery;
        const filters = getFiltersFromQueryStr(query, mockFilterItems);

        expect(filters.length).toBe(2);
        expect(filters.find(x => x.type === 'L2Product')?.name).toBe('Schema');
        expect(filters.find(x => x.type === 'L1Product')?.name).toBe('Atlas');
    });

    test('Invalid query keys produce no filter results', () => {
        const query = querystring.parse(
            'foo=bar&asd=fgh&abc=def'
        ) as ParsedUrlQuery;
        const filters = getFiltersFromQueryStr(query, mockFilterItems);
        expect(filters.length).toBe(0);
    });

    test('Invalid input produces no filter results', () => {
        const query = querystring.parse('abcdef123456!@#$%^') as ParsedUrlQuery;
        const filters = getFiltersFromQueryStr(query, mockFilterItems);
        expect(filters.length).toBe(0);
    });
});

const mockReplaceState = jest.fn();

describe('updateUrl', () => {
    beforeEach(() => {
        mockReplaceState.mockClear();
        window.history.replaceState = mockReplaceState;
    });

    test('Updates URL correctly with L1 filters', () => {
        const filterItems = [
            {
                name: 'Java',
                type: 'ProgrammingLanguage',
                subFilters: [],
                count: 0,
            },
            {
                name: 'Nodejs',
                type: 'Technology',
                subFilters: [],
                count: 0,
            },
        ] as FilterItem[];

        updateUrl('/path', filterItems, 'test');

        const calledUrl = mockReplaceState.mock.calls[0][2];
        expect(calledUrl).toBe(
            '/developer/path/?s=test&language=Java&technology=Nodejs&sortMode=0'
        );
    });

    test('Updates URL correctly with L2 filters', () => {
        const filterItems = [
            {
                name: 'Nodejs',
                type: 'Technology',
                subFilters: [],
                count: 0,
            },
            {
                name: 'Schema',
                type: 'L2Product',
                subFilters: [],
                count: 0,
            },
            {
                name: 'Snippet',
                type: 'CodeLevel',
                subFilters: [],
                count: 0,
            },
        ] as FilterItem[];

        updateUrl('/path', filterItems, 'test');

        const calledUrl = mockReplaceState.mock.calls[0][2];
        expect(calledUrl).toBe(
            '/developer/path/?s=test&technology=Nodejs&product=Schema&exampleType=Snippet&sortMode=0'
        );
    });
});

describe('itemInFilters', () => {
    test('If no filters are provided, it returns true', () => {
        expect(itemInFilters({ tags: [] } as unknown as ContentItem, [])).toBe(
            true
        );
    });

    test('If no tags are provided with nonempty filters, it returns false', () => {
        const filters = [
            {
                count: 0,
                name: 'filter1',
                subFilters: [],
                type: 'type1',
            },
        ];

        expect(
            itemInFilters({ tags: [] } as unknown as ContentItem, filters)
        ).toBe(false);
    });

    test('Two filters of different types use AND logic', () => {
        const itemWithBothTags = {
            tags: [
                {
                    name: 'tag1',
                    slug: 'slug',
                    type: 'type1',
                },
                {
                    name: 'tag2',
                    slug: 'slug',
                    type: 'type2',
                },
            ],
        } as unknown as ContentItem;

        const itemWithOneTag = {
            tags: [
                {
                    name: 'tag1',
                    slug: 'slug',
                    type: 'type1',
                },
            ],
        } as unknown as ContentItem;

        const filters = [
            {
                count: 0,
                name: 'tag1',
                subFilters: [],
                type: 'type1',
            },
            {
                count: 0,
                name: 'tag2',
                subFilters: [],
                type: 'type2',
            },
        ];

        expect(itemInFilters(itemWithBothTags, filters)).toBe(true);
        expect(itemInFilters(itemWithOneTag, filters)).toBe(false);
    });

    test('Two filters of the same type use OR logic', () => {
        const itemWithBothTags = {
            tags: [
                {
                    name: 'tag1',
                    slug: 'slug',
                    type: 'type1',
                },
                {
                    name: 'tag2',
                    slug: 'slug',
                    type: 'type1',
                },
            ],
        } as unknown as ContentItem;

        const itemWithFirstTag = {
            tags: [
                {
                    name: 'tag1',
                    slug: 'slug',
                    type: 'type1',
                },
                {
                    name: 'tag2',
                    slug: 'slug',
                    type: 'type2',
                },
            ],
        } as unknown as ContentItem;

        const itemWithSecondTag = {
            tags: [
                {
                    name: 'tag1',
                    slug: 'slug',
                    type: 'type1',
                },
                {
                    name: 'tag3',
                    slug: 'slug',
                    type: 'type3',
                },
            ],
        } as unknown as ContentItem;

        const filters = [
            {
                count: 0,
                name: 'tag1',
                subFilters: [],
                type: 'type1',
            },
            {
                count: 0,
                name: 'tag2',
                subFilters: [],
                type: 'type1',
            },
        ];

        expect(itemInFilters(itemWithBothTags, filters)).toBe(true);
        expect(itemInFilters(itemWithFirstTag, filters)).toBe(true);
        expect(itemInFilters(itemWithSecondTag, filters)).toBe(true);
    });

    test('Two filters of the same type and one of a different type use both AND and OR logic', () => {
        const itemWithOneTag = {
            tags: [
                {
                    name: 'tag3',
                    slug: 'slug',
                    type: 'type2',
                },
            ],
        } as unknown as ContentItem;

        const itemWithSameTypeTags = {
            tags: [
                {
                    name: 'tag1',
                    slug: 'slug',
                    type: 'type1',
                },
                {
                    name: 'tag2',
                    slug: 'slug',
                    type: 'type1',
                },
            ],
        } as unknown as ContentItem;

        const itemWithDifferentTypeTags = {
            tags: [
                {
                    name: 'tag1',
                    slug: 'slug',
                    type: 'type1',
                },
                {
                    name: 'tag3',
                    slug: 'slug',
                    type: 'type2',
                },
            ],
        } as unknown as ContentItem;

        const itemWithAllTags = {
            tags: [
                {
                    name: 'tag1',
                    slug: 'slug',
                    type: 'type1',
                },
                {
                    name: 'tag2',
                    slug: 'slug',
                    type: 'type1',
                },
                {
                    name: 'tag3',
                    slug: 'slug',
                    type: 'type2',
                },
            ],
        } as unknown as ContentItem;

        const filters = [
            {
                count: 0,
                name: 'tag1',
                subFilters: [],
                type: 'type1',
            },
            {
                count: 0,
                name: 'tag2',
                subFilters: [],
                type: 'type1',
            },
            {
                count: 0,
                name: 'tag3',
                subFilters: [],
                type: 'type2',
            },
        ];

        expect(itemInFilters(itemWithOneTag, filters)).toBe(false);
        expect(itemInFilters(itemWithSameTypeTags, filters)).toBe(false);
        expect(itemInFilters(itemWithDifferentTypeTags, filters)).toBe(true);
        expect(itemInFilters(itemWithAllTags, filters)).toBe(true);
    });
});
