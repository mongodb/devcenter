import { PillCategory, PillCategoryValues } from '../types/pill-category';
import { TagType } from '../types/tag-type';

export const CS_GRAPHQL_LIMIT = 100;

export const CS_HEADERS = {
    access_token: process.env.CS_DELIVERY_TOKEN || '',
    branch: 'apr_28',
};

export const CS_STAGING_HEADERS = {
    access_token: process.env.CS_DELIVERY_TOKEN_STAGING || '',
    branch: 'apr_28',
};

export const L1L2_TOPIC_PAGE_TYPES: TagType[] = [
    'L1Product',
    'L2Product',
    'ProgrammingLanguage',
    'Technology',
    'ExpertiseLevel',
];
interface FilterItemModel {
    displayName: string;
    type: string;
    contentTypeFilter?: (PillCategory | 'Search')[];
    subFilters?: TagType[];
    query?: string;
}

export const DEBOUNCE_WAIT = 400; // in milliseconds

const allContentTypes = [...PillCategoryValues, 'Search'] as (
    | PillCategory
    | 'Search'
)[];

export const FILTER_ITEM_MODEL: FilterItemModel[] = [
    {
        displayName: 'Attendance Type',
        type: 'EventAttendance',
        contentTypeFilter: ['Event'],
        query: 'attendanceType',
    },
    {
        displayName: 'Event Type',
        type: 'EventType',
        contentTypeFilter: ['Event'],
        query: 'eventType',
    },
    {
        displayName: 'Language',
        type: 'ProgrammingLanguage',
        query: 'language',
        contentTypeFilter: allContentTypes,
    },
    {
        displayName: 'Technology',
        type: 'Technology',
        query: 'technology',
        contentTypeFilter: allContentTypes,
    },
    {
        displayName: 'Content Type',
        type: 'ContentType',
        contentTypeFilter: ['Search'],
        subFilters: ['EventType', 'CodeLevel'],
        query: 'contentType',
    },
    {
        displayName: 'Products',
        type: 'L1Product',
        subFilters: ['L2Product'],
        query: 'product',
        contentTypeFilter: allContentTypes,
    },
    {
        displayName: 'Expertise Level',
        type: 'ExpertiseLevel',
        query: 'expertiseLevel',
        contentTypeFilter: allContentTypes,
    },
    {
        displayName: 'Contributed By',
        type: 'AuthorType',
        query: 'contributedBy',
        contentTypeFilter: allContentTypes.filter(value => value !== 'Event'),
    },
    {
        displayName: 'Example Type',
        type: 'CodeLevel',
        contentTypeFilter: ['Code Example'],
        query: 'exampleType',
    },
];

/*
    Doing some preprocessing on the filter item model below to 
    make some of the filter operations more efficient
*/

// Returns an object mapping sub-filters to their parent types e.g. { L2Product: 'L1Product', ... }
export const FILTER_ITEM_SUBFILTER_MAP = FILTER_ITEM_MODEL.reduce(
    (acc, model) =>
        model.subFilters
            ? {
                  ...acc,
                  ...model.subFilters.reduce(
                      (a, v) => ({ ...a, [v]: model.type }),
                      {}
                  ),
              }
            : acc,
    {}
) as { [subFilter in TagType]: TagType };

// Returns an object mapping types to their associated FilterItemModel
export const FILTER_ITEM_TYPE_MAP = FILTER_ITEM_MODEL.reduce(
    (acc, model) => ({ ...acc, [model.type]: model }),
    {}
) as { [type: string]: FilterItemModel };

// Returns an object mapping query strings to their associated FilterItemModel
export const FILTER_ITEM_QUERY_MAP = FILTER_ITEM_MODEL.reduce(
    (acc, model) => (model.query ? { ...acc, [model.query]: model } : acc),
    {}
) as { [type: string]: FilterItemModel };
