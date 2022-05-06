import { Fetcher } from 'swr';
import { decode } from 'querystring';

import { IsortByOptions } from './types';
import { ContentItem } from '../../interfaces/content-item';
import getL1Content from '../../mockdata/get-l1-content';
import { PillCategory } from '../../types/pill-category';
import { Tag } from '../../interfaces/tag';
import { Image } from '../../interfaces/image';
import { Author } from '../../interfaces/author';

export const sortByOptions: IsortByOptions = {
    'Most Recent': 'recent',
    'Most Popular': 'popular',
    'Highest Rated': 'rated',
};

const searchEndpoint =
    'https://data.mongodb-api.com/app/devhub-search-service-fldiy/endpoint/search_devcenter';

export const fetcher: Fetcher<ContentItem[], string> = queryString =>
    // fetch(`whateverOurLambdaSearchFunctionURLIs?${queryString}`).then(res =>
    //     res.json()
    // );
    new Promise(resolve => {
        if (queryString.includes('page=3')) {
            throw Error('ERROR AHHHH');
        }

        const { topic, contentType } = decode(queryString);
        const { content } = getL1Content(topic as string);
        const filteredContent = contentType
            ? content.filter(({ category }) => category === contentType)
            : content;

        return setTimeout(
            resolve.bind(null, filteredContent.slice(0, 10)),
            100
        );
    }); // Simulate request loading time and error if we load more than 3 pages.

interface SearchImage {
    url: string;
    alternativeText: string;
}

interface SearchAuthor {
    name: string;
    image: SearchImage;
}
interface SearchItem {
    type: PillCategory;
    authors: SearchAuthor[];
    name: string;
    image: SearchImage;
    description: string;
    calculated_slug: string;
    date: string;
    tags: Tag[];
}

const searchItemToContentItem = ({
    type,
    authors,
    name,
    image,
    description,
    calculated_slug,
    date,
    tags,
}: SearchItem): ContentItem => {
    const itemImage: Image | undefined = image
        ? {
              url: image.url,
              alt: image.alternativeText,
          }
        : undefined;
    const itemAuthors: Author[] = authors.map(auth => ({
        name: auth.name,
        image: {
            url: auth.image.url,
            alt: auth.image.alternativeText,
        },
    }));
    return {
        authors: itemAuthors,
        category: type,
        contentDate: date,
        description,
        image: itemImage,
        slug: calculated_slug,
        tags,
        title: name,
        featured: false,
    };
};

export const fetcherv2: Fetcher<ContentItem[], string> = queryString => {
    return fetch(`${searchEndpoint}?${queryString}`).then(async response => {
        const r_json: SearchItem[] = await response.json();
        console.log(r_json);
        return r_json.map(searchItemToContentItem);
    });
};
