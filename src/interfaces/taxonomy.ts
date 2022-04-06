interface CTA {
    text: string;
    url: string;
}

interface Topic {
    title: string;
    href: string;
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
