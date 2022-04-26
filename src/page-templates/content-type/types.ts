import { FilterItem } from '../../components/search-filters';
import { PillCategory } from '../../types/pill-category';

export interface ContentTypePageProps {
    contentType: PillCategory;
    l1Items: FilterItem[];
    languageItems: FilterItem[];
    technologyItems: FilterItem[];
    contributedByItems: FilterItem[];
}
