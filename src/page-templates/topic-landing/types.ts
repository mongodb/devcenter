import { CTA } from '../../components/hero/types';
import { ContentPiece } from '../../interfaces/content-piece';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import { Topic } from '../../interfaces/taxonomy';

export interface TopicLandingPageProps {
    name: string;
    slug: string;
    description: string;
    ctas: CTA[];
    subTopics: Topic[];
    relatedTopics: Topic[];
    featured: ContentPiece[];
    content: ContentPiece[];
    variant: 'light' | 'medium' | 'heavy';
    tertiaryNavItems: TertiaryNavItem[];
}
