interface CTA {
    text: string;
    url: string;
}

export interface Topic {
    name: string;
    category: string;
    slug: string;
    icon: string;
}

export interface Taxonomy {
    name: string;
    slug: string;
    description: string;
    ctas: CTA[];
    subTopics?: Topic[];
    relatedTopics?: Topic[];
}
