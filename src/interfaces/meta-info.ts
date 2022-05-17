import { CTA } from '../components/hero/types';
import { TagType } from '../types/tag-type';
import { ITopicCard } from '../components/topic-card/types';

export interface MetaInfo {
    category: TagType;
    tagName: string;
    description: string;
    slug: string;
    ctas: CTA[];
    topics?: ITopicCard[];
}

interface L1Props2 {
    name?: string;
}

interface L1Props {
    l_1_product?: L1Props2;
}

export interface MetaInfoResponse {
    __typename: TagType;
    name: string;
    description?: string;
    slug: string;
    l1_product?: L1Props;
    primary_cta?: string;
    secondary_cta?: string;
}
