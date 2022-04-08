import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import { Topic } from '../../interfaces/taxonomy';
import { PillCategory, PillCategorySlug } from '../../types/pill-category';
export interface TopicContentTypePageProps {
    contentType: PillCategory;
    tertiaryNavItems: TertiaryNavItem[];
    topicName: string;
    topicSlug: string;
    contentTypeSlug: PillCategorySlug;
    subTopics: Topic[];
}
