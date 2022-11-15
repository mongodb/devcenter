import { FilterItem } from '@mdb/devcenter-components';

export interface RadioFilterGroupProps {
    className?: string;
    title?: string;
    items: FilterItem[];
    filters: FilterItem[];
    sortBy?: any;
    setSort?: (sortByValue: string) => void;
    setFilters?: (filters: FilterItem[]) => void;
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
    codeLevelItems?: FilterItem[];
}
