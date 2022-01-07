import { AuthorResponse } from './author-response';
import { ArticleSEOResponse } from './article-seo-response';

export interface ArticleResponse {
    type: string;
    authors: AuthorResponse[];
    id: string;
    published_at: string;
    content: string;
    slug: string;
    description: string;
    name: string;
    SEO: ArticleSEOResponse;
    languages: {}[];
    products: {}[];
    tags: {}[];
    related_content: [];
    updatedAt: string;
    image: {};
}
