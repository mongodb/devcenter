export interface FilterItem {
    name: string;
    category: string;
    subItems?: FilterItem[];
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
}
