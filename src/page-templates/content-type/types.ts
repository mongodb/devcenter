import { FilterItem } from '../../components/search-filters';
import { PillCategory } from '../../types/pill-category';
import { ContentItem } from '../../interfaces/content-item';

export interface ContentTypePageProps {
    contentType: PillCategory;
    l1Items: FilterItem[];
    languageItems: FilterItem[];
    technologyItems: FilterItem[];
    contributedByItems: FilterItem[];
    featured: ContentItem[];
}
