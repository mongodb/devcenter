import { ITopicCard } from '../../components/topic-card/types';
import { CTA } from '../../components/hero/types';
import { ContentPiece } from '../../interfaces/content-piece';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';

export interface TopicLandingPageProps {
    name: string;
    slug: string;
    description: string;
    ctas: CTA[];
    subTopics: ITopicCard[];
    relatedTopics: ITopicCard[];
    featured: ContentPiece[];
    content: ContentPiece[];
    variant: 'light' | 'medium' | 'heavy';
    tertiaryNavItems: TertiaryNavItem[];
}
