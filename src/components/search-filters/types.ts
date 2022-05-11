import { TagType } from '../../types/tag-type';

export interface FilterItem {
    name: string;
    type?: TagType;
    subItems: FilterItem[];
    count: number;
}

export interface FilterGroupProps {
    className?: string;
    title?: string;
    items: FilterItem[];
    filters: FilterItem[];
    setFilters: (filters: FilterItem[]) => void;
    isMobile?: boolean;
}

export interface FiltersProps {
    className?: string;
    onFilter: (filters: FilterItem[]) => void;
    allFilters: FilterItem[];
    l1Items: FilterItem[];
    languageItems: FilterItem[];
    technologyItems: FilterItem[];
    contributedByItems: FilterItem[];
    expertiseLevelItems: FilterItem[];
    contentTypeItems?: FilterItem[];
}
