import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import { ITopicCard } from '../../components/topic-card/types';
import { PillCategory } from '../../types/pill-category';
export interface TopicContentTypePageProps {
    contentType: PillCategory;
    tertiaryNavItems: TertiaryNavItem[];
    topicName: string;
    subTopics: ITopicCard[];
}
