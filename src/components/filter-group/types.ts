export interface FilterItem {
    name: string;
    category: string;
    subItems?: FilterItem[];
}

export interface FilterGroupProps {
    className?: string;
    title: string;
    items: FilterItem[];
    filters: string[];
    setFilters: (filters: string[]) => void;
}
