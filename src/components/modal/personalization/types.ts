export interface PersonlizationTagType {
    category: string;
    tagName: string;
    slug: string;
}

export type PersonalizationModalConfig = {
    title: string;
    tags: Array<PersonlizationTagType>;
};
