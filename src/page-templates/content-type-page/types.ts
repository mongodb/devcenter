import { FilterItem } from '@mdb/devcenter-components';
import { PillCategory } from '../../types/pill-category';
import { ContentItem } from '../../interfaces/content-item';
import { ShowcaseCardItem } from '../../components/showcase-card/types';
import { SearchItem } from '../../components/search/types';
import { ReactElement } from 'react';
import { Tag } from '../../interfaces/tag';

export interface ContentTypePageProps {
    description: string;
    contentType: PillCategory;
    filterItems: { key: string; value: FilterItem[] }[];
    featured: ContentItem[];
    extraFeatured: {
        featuredLanguages?: ShowcaseCardItem[];
        featuredTechnologies?: Tag[];
        featuredProducts?: ShowcaseCardItem[];
    };
    initialSearchContent?: SearchItem[];
    pageNumber: number;
    slug: string;
    children: (searchProps: any, searchMetaProps: any) => ReactElement;
}
