import { ContentItem } from '../../interfaces/content-item';
import { PillCategory } from '../../types/pill-category';
import { Tag } from '../../interfaces/tag';
import { ThemeUICSSObject } from 'theme-ui';
import { FilterItem } from '@mdb/devcenter-components';
import { ReactElement } from 'react';
import { Coordinates } from '../../interfaces/coordinates';
import { LocationOptions } from '../../hooks/search/types';

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
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    autoFocus?: boolean;
    extraStyles?: ThemeUICSSObject;
}

export interface SortBoxProps {
    extraStyles?: ThemeUICSSObject;
    onSort: (value: SortByType | '') => void;
    sortBy?: SortByType | '';
}

export interface LocationBoxProps {
    locationQuery?: string;
    onLocationQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
    locationSelection?: google.maps.places.PlaceResult;
    onLocationSelect: (selection: string) => void;
    locationValidating: boolean;
    geolocationValidating: boolean;
    displayOptions: LocationOptions[];
    extraStyles?: ThemeUICSSObject;
}

export interface ResultsProps {
    results: ContentItem[] | undefined;
    isValidating: boolean;
    error: string;
    searchString: string;
    filters: FilterItem[];
    sortBy?: SortByType | '';
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
