import { FilterItem } from '@mdb/devcenter-components';
import { ESystemIconNames } from '@mdb/flora';
import { ChangeEvent } from 'react';
import { SortByType } from '../../components/search/types';
import { ContentItem } from '../../interfaces/content-item';

export type SearchParamType = 'search' | 'location' | 'sort' | 'filters';

export interface LocationOptions {
    icon?: ESystemIconNames;
    label: string;
}

export type LocationSelection = google.maps.places.PlaceResult & {
    description?: string;
};
export interface SearchProps {
    clearSearchParam: (which?: SearchParamType) => void;
    searchStringProps: {
        searchString: string;
        onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
    filterProps: {
        filters: FilterItem[];
        onFilter: (filters: FilterItem[]) => void;
    };
    sortProps: {
        sortBy?: SortByType | '';
        onSort: (sortBy: SortByType | '') => void;
    };
    locationProps: {
        locationQuery: string;
        onLocationQuery: (event: ChangeEvent<HTMLInputElement>) => void;
        locationSelection?: LocationSelection;
        onLocationSelect: (selection: string) => void;
        locationResults?: google.maps.places.AutocompletePrediction[];
        locationValidating: boolean;
        geolocationValidating: boolean;
        displayOptions: LocationOptions[];
    };
    resultsProps: {
        allResults: ContentItem[];
        unfilteredResults: ContentItem[];
        results: ContentItem[];
        error: string;
        isValidating: boolean;
        searchString: string;
        filters: FilterItem[];
        sortBy?: SortByType | '';
    };
}

export interface SearchMetaProps {
    pageTitle: string;
    metaDescr: string;
    canonicalUrl: string;
    pageNumber: number;
    slug: string;
    contentType: string;
    updatePageMeta: (pageNumber?: number) => void;
}
