import { FilterItem } from '../../components/search-filters';
import { PillCategory } from '../../types/pill-category';
import { ContentItem } from '../../interfaces/content-item';
import { ShowcaseCardItem } from '../../components/showcase-card/types';
import { ITopicCard } from '../../components/topic-card/types';

export interface ContentTypePageProps {
    contentType: PillCategory;
    l1Items: FilterItem[];
    languageItems: FilterItem[];
    technologyItems: FilterItem[];
    contributedByItems: FilterItem[];
    expertiseLevelItems: FilterItem[];
    featured: ContentItem[];
    featuredLanguages?: ShowcaseCardItem[];
    featuredTechnologies?: ITopicCard[];
    featuredProducts?: ShowcaseCardItem[];
}
