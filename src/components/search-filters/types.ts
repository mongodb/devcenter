import { FilterItem } from '@mdb/devcenter-components';
import { PillCategory } from '../../types/pill-category';

export interface RadioFilterGroupProps {
    className?: string;
    title?: string;
    items: FilterItem[];
    filters: FilterItem[];
    sortBy?: any;
    setSort?: (sortByValue: string) => void;
    setFilters?: (filters: FilterItem[]) => void;
    isMobile?: boolean;
    contentType?: PillCategory;
}

export interface FiltersProps {
    className?: string;
    onFilter: (filters: FilterItem[]) => void;
    filters: FilterItem[];
    filterItems: { key: string; value: FilterItem[] }[];
}
