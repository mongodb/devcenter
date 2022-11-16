import { ContentItem } from '../../interfaces/content-item';
import { PillCategory } from '../../types/pill-category';
import { Tag } from '../../interfaces/tag';
import { ThemeUICSSObject } from 'theme-ui';
import { FilterItem } from '@mdb/devcenter-components';
import { ReactElement } from 'react';

interface SearchImage {
    url: string;
    alternativeText: string;
}

interface SearchAuthor {
    name: string;
    image: SearchImage;
    calculated_slug: string;
}

export interface SearchProps {
    titleElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
    className?: string;
    tagSlug?: string;
    title: string;
    contentType?: string;
    filters?: string[];
    resultsLayout?: 'list' | 'grid';
    titleLink?: {
        text: string;
        href: string;
    };
    placeholder: string;
    pageNumber: number; // current page number
    pageSlug?: string[];
    setSeoAttributes: (pageNumber: number) => void;
    initialSearchContent?: SearchItem[]; // search content received from initial render
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

export interface ResultsProps {
    results: ContentItem[] | undefined;
    isValidating: boolean;
    error: boolean;
    slug: string;
    pageNumber: number;
    updatePageMeta?: (pageNumber: number) => void;
    noResultsFooter?: ReactElement;
    contentType: string;
    layout?: 'list' | 'grid';
    extraStyles?: ThemeUICSSObject;
    emptySearchCriteria: boolean;
}
export interface SearchItem {
    type: PillCategory;
    authors: SearchAuthor[];
    name: string;
    image: SearchImage;
    description: string;
    slug: string;
    date: string;
    tags: Tag[];
}

// add back when Most Popular is implemented
// export type SortByType = 'Most Recent' | 'Most Popular' | 'Highest Rated';
export type SortByType = 'Most Recent' | 'Highest Rated';
export const defaultSortByType: SortByType = 'Most Recent';
