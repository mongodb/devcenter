import { PillCategory } from '../types/pill-category';
import { TagType } from '../types/tag-type';

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
    forContentType?: PillCategory | '';
    subFilters?: TagType[];
    query?: string;
}

export const FILTER_ITEM_MODEL: FilterItemModel[] = [
    {
        displayName: 'Example Type',
        type: 'CodeLevel',
        forContentType: 'Code Example',
    },
    {
        displayName: 'Attendance Type',
        type: 'EventAttendance',
        forContentType: 'Event',
    },
    {
        displayName: 'Event Type',
        type: 'EventType',
        forContentType: 'Event',
    },
    {
        displayName: 'Language',
        type: 'ProgrammingLanguage',
    },
    {
        displayName: 'Technology',
        type: 'Technology',
    },
    {
        displayName: 'Content Type',
        type: 'ContentType',
        forContentType: '',
        subFilters: ['EventType', 'CodeLevel'],
    },
    {
        displayName: 'Products',
        type: 'L1Product',
        subFilters: ['L2Product'],
    },
    {
        displayName: 'Expertise Level',
        type: 'ExpertiseLevel',
    },
    {
        displayName: 'Contributed By',
        type: 'AuthorType',
    },
];


export const DEBOUNCE_WAIT = 400; // in milliseconds

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
