import { ParsedUrlQuery } from 'querystring';

export interface PageParams extends ParsedUrlQuery {
    slug: string[];
    l1_l2?: string;
    topic?: string;
    page?: string;
}
