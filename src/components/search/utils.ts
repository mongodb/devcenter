import { Fetcher } from 'swr';

import { ContentItem } from '../../interfaces/content-item';
import { PillCategory } from '../../types/pill-category';
import { Tag } from '../../interfaces/tag';
import { Image } from '../../interfaces/image';
import { Author } from '../../interfaces/author';

const searchEndpoint =
    'https://data.mongodb-api.com/app/devhub-search-service-fldiy/endpoint/search_devcenter';

interface SearchImage {
    url: string;
    alternativeText: string;
}

interface SearchAuthor {
    name: string;
    image: SearchImage;
    calculated_slug: string;
}
interface SearchItem {
    type: PillCategory;
    authors: SearchAuthor[];
    name: string;
    image: SearchImage;
    description: string;
    slug: string;
    date: string;
    tags: Tag[];
}

const searchItemToContentItem = ({
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
        console.log(r_json);
        return r_json.map(searchItemToContentItem);
    });
};
