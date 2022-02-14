import { Crumb } from './breadcrumbs';

export interface CTA {
    text: string;
    url: string;
}
export interface HeroProps {
    crumbs: Crumb[];
    name: string;
    description: string;
    ctas: CTA[];
}
