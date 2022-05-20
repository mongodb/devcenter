import { PillCategory } from '../../types/pill-category';
import { ContentItem } from '../../interfaces/content-item';
import { FilterItem } from '../../components/search-filters';
import { Tag } from '../../interfaces/tag';
import { ShowcaseCardItem } from '../../components/showcase-card/types';
import { languageToLogo } from '../../utils/language-to-logo';
import { technologyToLogo } from '../../utils/technology-to-logo';
import { productToLogo } from '../../utils/product-to-logo';
import { ITopicCard } from '../../components/topic-card/types';
import getAllSearchContent from '../../api-requests/get-all-search-content';
import { SearchItem } from '../../components/search/types';

// Temporary until we find a logo to include in Flora.
const serverlessLogo =
    'https://webimages.mongodb.com/_com_assets/icons/atlas_serverless.svg';
interface TagWithCount extends Tag {
    count: number;
}

interface L1TagWithCount extends TagWithCount {
    l2s: Tag[];
}

export const getFeaturedLangProdTech = (
    contentType: 'Tutorial' | 'Code Example',
    content: ContentItem[]
) => {
    const aggregateSlug =
        contentType === 'Tutorial' ? '/tutorials' : '/code-examples';
    let languages: TagWithCount[] = [];
    let technologies: TagWithCount[] = [];
    let products: L1TagWithCount[] = [];
    content.forEach(item => {
        const languageTags = item.tags.filter(
            tag => tag.type === 'ProgrammingLanguage'
        );
        languageTags.forEach(langTag => {
            const existingTag = languages.find(
                tag => tag.name === langTag.name
            );
            if (existingTag) {
                existingTag.count += 1;
            } else {
                languages.push({ ...langTag, count: 1 });
            }
        });
        const techTags = item.tags.filter(tag => tag.type === 'Technology');
        techTags.forEach(techTag => {
            const existingTag = technologies.find(
                tag => tag.name === techTag.name
            );
            if (existingTag) {
                existingTag.count += 1;
            } else {
                technologies.push({ ...techTag, count: 1 });
            }
        });
        const productTags = item.tags.filter(tag => tag.type === 'L1Product');
        productTags.forEach(productTag => {
            const l2 = item.tags.find(tag => tag.type === 'L2Product');

            const existingTag = products.find(
                tag => tag.name === productTag.name
            );
            if (existingTag) {
                existingTag.count += 1;
                if (l2) {
                    if (!existingTag.l2s.find(tag => tag.name === l2.name)) {
                        existingTag.l2s.push(l2);
                    }
                }
            } else {
                products.push({ ...productTag, count: 1, l2s: l2 ? [l2] : [] });
            }
        });
    });
    languages.sort((a, b) => b.count - a.count);
    technologies.sort((a, b) => b.count - a.count);
    products.sort((a, b) => b.count - a.count);
    const featuredLanguages: ShowcaseCardItem[] = languages.map(
        langWithCount => {
            const { count, ...tag } = langWithCount;
            return {
                titleLink: {
                    text: tag.name,
                    url: tag.slug + aggregateSlug,
                },
                imageString: languageToLogo[tag.name] || null,
            };
        }
    );
    const featuredTechnologies: ITopicCard[] = technologies.map(
        techWithCount => {
            const { count, ...tag } = techWithCount;
            return {
                title: tag.name,
                href: tag.slug + aggregateSlug,
                icon:
                    tag.name === 'Serverless'
                        ? serverlessLogo
                        : technologyToLogo[tag.name] || null,
            };
        }
    );
    const featuredProducts: ShowcaseCardItem[] = products.map(prodWithCount => {
        const { count, ...tag } = prodWithCount;
        return {
            titleLink: {
                text: tag.name,
                url: tag.slug + aggregateSlug,
            },
            href: tag.slug + aggregateSlug,
            imageString: productToLogo[tag.name] || null,
            cta: {
                text: 'More',
                url: tag.slug + aggregateSlug,
            },
            links: tag.l2s.map(l2 => ({
                text: l2.name,
                url: l2.slug + aggregateSlug,
            })),
        };
    });
    return { featuredLanguages, featuredTechnologies, featuredProducts };
};

export const getFilters = async (contentType?: PillCategory) => {
    const allFilters = contentType === undefined;
    const allContent: SearchItem[] = await getAllSearchContent();

    const filterItems: FilterItem[] = [];

    allContent.forEach(({ tags, type }) => {
        tags.forEach(tag => {
            if (!tag.name) return; // Short circuit if the tag name is null.
            if (tag.type === 'L2Product') {
                const l2FilterItem: FilterItem = {
                    type: tag.type,
                    name: tag.name,
                    count: allFilters || type === contentType ? 1 : 0,
                    subItems: [],
                };
                const l1 = tags.filter(tag => tag.type === 'L1Product')[0]; // There should always be an L1 on a piece with an L2 tag.
                const l1FilterItem = filterItems.find(
                    item => item.type === 'L1Product' && item.name === l1.name
                );
                if (l1FilterItem) {
                    // If L1 exists, check if L2 is attached to it yet.
                    const existingL2 = l1FilterItem.subItems.find(
                        subItem =>
                            l2FilterItem.name === subItem.name &&
                            l2FilterItem.type === subItem.type
                    );
                    if (existingL2) {
                        // If L2 is already attached, only bump the count (if the content type matches).
                        if (allFilters || type === contentType) {
                            existingL2.count++;
                        }
                        return;
                    }
                    return l1FilterItem.subItems.push(l2FilterItem); // If L2 is not yet attached, attach it.
                } else {
                    // If the L1 doesn't exist, neither does the L2, so create L1 and add new L2 to it.
                    const l1FilterItem: FilterItem = {
                        type: l1.type,
                        name: l1.name,
                        subItems: [l2FilterItem],
                        count: allFilters || type === contentType ? 1 : 0,
                    };
                    return filterItems.push(l1FilterItem);
                }
            } else if (tag.type === 'CodeLevel') {
                // Basically repeating the logic for L2s, can probably be separated and reused.
                const codeLevelItem: FilterItem = {
                    type: tag.type,
                    name: tag.name,
                    count: allFilters || type === contentType ? 1 : 0,
                    subItems: [],
                };
                const codeExampleFilterItem = filterItems.find(
                    item =>
                        item.type === 'ContentType' &&
                        item.name === 'Code Example'
                );
                if (codeExampleFilterItem) {
                    // If code examples tag already exists, check if this code level is attached.
                    const existingCodeLevel =
                        codeExampleFilterItem.subItems.find(
                            subItem =>
                                codeLevelItem.name === subItem.name &&
                                codeLevelItem.type === codeLevelItem.type
                        );
                    if (existingCodeLevel) {
                        // If code level is already attached, only bump the count (if the content type matches).
                        if (allFilters || type === contentType) {
                            existingCodeLevel.count++;
                        }
                        return;
                    }
                    return codeExampleFilterItem.subItems.push(codeLevelItem);
                } else {
                    // If the Code Example tag doesn't exist, neither does the L2, so create L1 and add new L2 to it.
                    const codeExampleFilterItem: FilterItem = {
                        type: 'ContentType',
                        name: 'Code Example',
                        subItems: [codeLevelItem],
                        count: allFilters || type === contentType ? 1 : 0,
                    };
                    return filterItems.push(codeExampleFilterItem);
                }
            } else {
                // For everything else, just check if it exists.
                const existingItem = filterItems.find(
                    filter =>
                        filter.name === tag.name && filter.type === tag.type
                );
                if (existingItem) {
                    // If it exists, increment count only if the content type matches.
                    if (allFilters || type === contentType) {
                        existingItem.count++;
                    }
                    return;
                } else {
                    // If not, add it to the list.
                    const filterItem: FilterItem = {
                        type: tag.type,
                        name: tag.name,
                        count: allFilters || type === contentType ? 1 : 0,
                        subItems: [],
                    };
                    return filterItems.push(filterItem);
                }
            }
        });
    });

    // Sort everything by count.

    // Sort sub items.
    filterItems.forEach(item => {
        if (item.subItems.length) {
            item.subItems.sort((prev, next) => next.count - prev.count);
        }
    });

    const l1Items = filterItems
        .filter(({ type }) => type === 'L1Product')
        .sort((prev, next) => next.count - prev.count);
    const languageItems = filterItems
        .filter(({ type }) => type === 'ProgrammingLanguage')
        .sort((prev, next) => next.count - prev.count);
    const technologyItems = filterItems
        .filter(({ type }) => type === 'Technology')
        .sort((prev, next) => next.count - prev.count);
    const contributedByItems = filterItems
        .filter(({ type }) => type === 'AuthorType')
        .sort((prev, next) => next.count - prev.count);
    const contentTypeItems = filterItems
        .filter(({ type }) => type === 'ContentType')
        .sort((prev, next) => next.count - prev.count);
    const expertiseLevelItems = filterItems
        .filter(({ type }) => type === 'ExpertiseLevel')
        .sort((prev, next) => next.count - prev.count);

    return {
        l1Items,
        languageItems,
        technologyItems,
        contributedByItems,
        contentTypeItems,
        expertiseLevelItems,
    };
};

const itemInFilterGroup = (tags: Tag[], filters: FilterItem[]) => {
    // This is inclusive within filter groups. If you check Python and C#, you get both Python and C# content.
    if (!filters.length) return true;
    return tags.some(tag =>
        filters.some(
            filter => filter.name === tag.name && filter.type === tag.type
        )
    );
};

export const itemInFilters = (
    { tags }: ContentItem,
    allFilters: FilterItem[]
) => {
    // This is exclusive between filter groups. If you check Python and Atlas, you only get things that are both Pyhton and Atlas,
    // not everythign Pyhton and everything Atlas.
    const productFilters = allFilters.filter(
        ({ type }) => type === 'L1Product' || type === 'L2Product'
    );
    const languageFilters = allFilters.filter(
        ({ type }) => type === 'ProgrammingLanguage'
    );
    const techFilters = allFilters.filter(({ type }) => type === 'Technology');
    const expertiseFilters = allFilters.filter(
        ({ type }) => type === 'ExpertiseLevel'
    );
    const contributedByFilters = allFilters.filter(
        ({ type }) => type === 'AuthorType'
    );
    const contentTypeFilters = allFilters.filter(
        ({ type }) => type === 'ContentType'
    );
    return (
        itemInFilterGroup(tags, productFilters) &&
        itemInFilterGroup(tags, languageFilters) &&
        itemInFilterGroup(tags, techFilters) &&
        itemInFilterGroup(tags, expertiseFilters) &&
        itemInFilterGroup(tags, contributedByFilters) &&
        itemInFilterGroup(tags, contentTypeFilters)
    );
};
