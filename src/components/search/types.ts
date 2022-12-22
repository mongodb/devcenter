import { ContentItem } from '../../interfaces/content-item';
import { PillCategory } from '../../types/pill-category';
import { Tag } from '../../interfaces/tag';
import { ThemeUICSSObject } from 'theme-ui';
import { FilterItem } from '@mdb/devcenter-components';
import { ReactElement } from 'react';
import { SWRResponse } from 'swr';
import { Coordinates } from '../../interfaces/coordinates';

interface SearchImage {
    url: string;
    alternativeText: string;
    city?: string;
}

interface SearchAuthor {
    name: string;
    image: SearchImage;
    calculated_slug: string;
}

export interface SearchBoxProps {
    placeholder?: string;
    searchString?: string;
    onSearch: any;
    autoFocus?: boolean;
    extraStyles?: ThemeUICSSObject;
}

export interface SortBoxProps {
    extraStyles?: ThemeUICSSObject;
    onSort: (value?: string) => void;
    sortBy: string;
}

export interface LocationBoxProps {
    locationQuery?: string;
    onLocationQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
    locationSelection?: any;
    onLocationSelect: (option: any) => void;
    results: SWRResponse<ContentItem[], any>;
    geolocationValidating: boolean;
    displayOptions: (string | { icon: string; label: string })[];
    extraStyles?: ThemeUICSSObject;
}

export interface ResultsProps {
    results: ContentItem[] | undefined;
    isValidating: boolean;
    error: boolean;
    searchString: string;
    filters: FilterItem[];
    sortBy: string;
    slug: string;
    pageNumber: number;
    updatePageMeta?: (pageNumber: number) => void;
    noResultsFooter?: ReactElement;
    contentType: string;
    layout?: 'list' | 'grid';
    extraStyles?: ThemeUICSSObject;
}
export interface SearchItem {
    type: PillCategory;
    authors: SearchAuthor[];
    name: string;
    image?: SearchImage;
    description: string;
    location?: string;
    slug: string;
    date: string;
    start_time?: string;
    end_time?: string;
    tags: Tag[];
    event_setup?: string;
    coordinates?: Coordinates;
}

// add back when Most Popular is implemented
// export type SortByType = 'Newest' | 'Most Popular' | 'Highest Rated';
export type SortByType = 'Newest' | 'Highest Rated';
export const defaultSortByType: SortByType = 'Newest';
