import { Fetcher } from 'swr';

import { ContentItem } from '../../interfaces/content-item';
import { SearchItem } from './types';
import { Image } from '../../interfaces/image';
import { Author } from '../../interfaces/author';

const searchEndpoint =
    'https://data.mongodb-api.com/app/devhub-search-service-fldiy/endpoint/search_devcenter';

export const searchItemToContentItem = ({
    type,
    authors,
    name,
    image,
    description,
    slug,
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
        calculated_slug: auth.calculated_slug,
    }));
    return {
        authors: itemAuthors,
        category: type,
        contentDate: date,
        description,
        image: itemImage,
        slug: slug,
        tags,
        title: name,
        featured: false,
    };
};

export const fetcher: Fetcher<ContentItem[], string> = queryString => {
    return fetch(`${searchEndpoint}?${queryString}`).then(async response => {
        const r_json: SearchItem[] = await response.json();
        return r_json.map(searchItemToContentItem);
    });
};
