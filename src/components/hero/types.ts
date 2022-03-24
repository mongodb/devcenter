import { Crumb } from '../breadcrumbs/types';
export interface CTA {
    text: string;
    url: string;
    customCSS?: React.CSSProperties;
}
export interface HeroProps {
    crumbs: Crumb[];
    name: string;
    description: string;
    ctas: CTA[];
}
