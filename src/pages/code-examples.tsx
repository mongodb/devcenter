import type { NextPage, GetStaticProps } from 'next';

import ContentTypePage from '../page-templates/content-type';
import { PillCategory } from '../types/pill-category';
import { ContentTypePageProps } from '../page-templates/content-type/types';
import { getFilters } from '../page-templates/content-type/utils';
import { getAllContentItems } from '../service/get-all-content';
import { Tag } from '../interfaces/tag';

import { languageToLogo } from '../utils/language-to-logo';
import { ShowcaseCardItem } from '../components/showcase-card/types';
import { ITopicCard } from '../components/topic-card/types';
import { technologyToLogo } from '../utils/technology-to-logo';
import { productToLogo } from '../utils/product-to-logo';

const CodeExamplesPage: NextPage<ContentTypePageProps> = props => {
    return <ContentTypePage {...props} />;
};

interface TagWithCount extends Tag {
    count: number;
}

interface L1TagWithCount extends TagWithCount {
    l2s: Tag[];
}

const mockFeaturedTech: ITopicCard[] = [
    {
        title: 'AWS',
        href: '/technologies/aws/code-examples',
        icon: technologyToLogo['AWS'],
    },
    {
        title: 'Azure',
        href: '/technologies/azure/code-examples',
        icon: technologyToLogo['Azure'],
    },
    {
        title: 'GCP',
        href: '/technologies/gcp/code-examples',
        icon: technologyToLogo['GCP'],
    },
];

export const getStaticProps: GetStaticProps = async () => {
    const contentType: PillCategory = 'Code Example';
    // Pop contentTypeItems out of here becasue we don't filter by it for these pages.
    const { contentTypeItems, ...filters } = await getFilters(contentType);

    // TODO: When the featured collection is populated, we will hit that and filter by content type.
    const content = await getAllContentItems();
    const codeExamples = content.filter(item => item.category === contentType);
    const featured = codeExamples
        .sort((a, b) => b.contentDate.localeCompare(a.contentDate))
        .slice(0, 3);
    let languages: TagWithCount[] = [];
    let technologies: TagWithCount[] = [];
    let products: L1TagWithCount[] = [];
    codeExamples.forEach(item => {
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
                    url: tag.slug + '/code-examples',
                },
                imageString: languageToLogo[tag.name],
            };
        }
    );
    const featuredTechnologies: ITopicCard[] = technologies.map(
        techWithCount => {
            const { count, ...tag } = techWithCount;
            return {
                title: tag.name,
                href: tag.slug + '/code-examples',
                icon: technologyToLogo[tag.name],
            };
        }
    );
    const featuredProducts: ShowcaseCardItem[] = products.map(prodWithCount => {
        const { count, ...tag } = prodWithCount;
        return {
            titleLink: {
                text: tag.name,
                url: tag.slug + '/code-examples',
            },
            href: tag.slug + '/code-examples',
            imageString: productToLogo[tag.name],
            cta: {
                text: 'More',
                url: tag.slug + '/code-examples',
            },
            links: tag.l2s.map(l2 => ({
                text: l2.name,
                url: l2.slug + '/code-examples',
            })),
        };
    });
    console.log(featuredProducts);

    return {
        props: {
            contentType,
            ...filters,
            featured,
            featuredLanguages,
            featuredTechnologies,
            featuredProducts,
        },
    };
};

export default CodeExamplesPage;
