import { ContentItem } from '../../interfaces/content-item';
import { Tag } from '../../interfaces/tag';
import { ShowcaseCardItem } from '../../components/showcase-card/types';
import { languageToLogo } from '../../utils/language-to-logo';
import { technologyToLogo } from '../../utils/technology-to-logo';
import { productToLogo } from '../../utils/product-to-logo';
import { ITopicCard } from '../../components/topic-card/types';
import { PillCategory } from '../../types/pill-category';

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

export function shouldRenderRequestButton(contentType: PillCategory): boolean {
    const shouldNotRenderSet: Set<PillCategory> = new Set([
        'News & Announcements',
    ]);
    return !shouldNotRenderSet.has(contentType);
}
