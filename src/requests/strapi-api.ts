import { ArticleResponse } from '../interfaces/responses/article-response';

export const fetchApiRest = async (url: string): Promise<ArticleResponse[]> => {
    const fullUrl = `${process.env.STRAPI_URL}/${url}`;
    const res = await fetch(fullUrl);

    if (res.status !== 200) {
        console.error(res.statusText);
        throw new Error(
            `Failed to fetch from ${fullUrl}: ${res.status} ${res.statusText}`
        );
    }

    const json = await res.json();
    return json;
};
