import { FilterItem } from '@mdb/devcenter-components';
import { PillCategory } from '../../types/pill-category';
import { ContentItem } from '../../interfaces/content-item';
import { ShowcaseCardItem } from '../../components/showcase-card/types';
import { ITopicCard } from '../../components/topic-card/types';
import { SearchItem } from '../../components/search/types';
import React from 'react';
import { SearchMetaProps, SearchProps } from '../../hooks/search/types';

export interface ContentTypePageProps {
    description: string;
    contentType: PillCategory;
    filterItems: { key: string; value: FilterItem[] }[];
    featured: ContentItem[];
    extraFeatured: {
        featuredLanguages?: ShowcaseCardItem[];
        featuredTechnologies?: ITopicCard[];
        featuredProducts?: ShowcaseCardItem[];
    };
    initialSearchContent?: SearchItem[];
    pageNumber: number;
    slug: string;
    children: React.FunctionComponent<{
        searchProps: SearchProps;
        searchMetaProps: SearchMetaProps;
        mobileFiltersOpen: boolean;
        setMobileFiltersOpen: (open: boolean) => void;
    }>;
}
