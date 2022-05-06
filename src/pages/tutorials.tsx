import type { NextPage, GetStaticProps } from 'next';
import { ThirdPartyLogo } from '@mdb/flora';

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

const TutorialsPage: NextPage<ContentTypePageProps> = props => {
    return <ContentTypePage {...props} />;
};

interface TagWithCount extends Tag {
    count: number;
}

const mockFeaturedTech: ITopicCard[] = [
    {
        title: 'AWS',
        href: '/technologies/aws/tutorials',
        icon: technologyToLogo['AWS'],
    },
    {
        title: 'Azure',
        href: '/technologies/azure/tutorials',
        icon: technologyToLogo['Azure'],
    },
    {
        title: 'GCP',
        href: '/technologies/gcp/tutorials',
        icon: technologyToLogo['GCP'],
    },
];

export const getStaticProps: GetStaticProps = async () => {
    const contentType: PillCategory = 'Tutorial';
    // Pop contentTypeItems out of here becasue we don't filter by it for these pages.
    const { contentTypeItems, ...filters } = await getFilters(contentType);

    // TODO: When the featured collection is populated, we will hit that and filter by content type.
    const content = await getAllContentItems();
    const tutorials = content.filter(item => item.category === contentType);
    const featured = tutorials
        .sort((a, b) => b.contentDate.localeCompare(a.contentDate))
        .slice(0, 3);
    let languages: TagWithCount[] = [];
    let technologies: TagWithCount[] = [];
    tutorials.forEach(item => {
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
    });
    languages.sort((a, b) => b.count - a.count);
    technologies.sort((a, b) => b.count - a.count);
    const featuredLanguages: ShowcaseCardItem[] = languages.map(
        langWithCount => {
            const { count, ...tag } = langWithCount;
            return {
                titleLink: {
                    text: tag.name,
                    url: tag.slug + '/tutorial',
                },
                imageString: languageToLogo[tag.name],
            };
        }
    );
    const featuredTechnologies: ITopicCard[] = technologies.map(
        langWithCount => {
            const { count, ...tag } = langWithCount;
            return {
                title: tag.name,
                href: tag.slug + '/tutorial',
                icon: technologyToLogo[tag.name],
            };
        }
    );

    return {
        props: {
            contentType,
            ...filters,
            featured,
            featuredLanguages,
            featuredTechnologies: mockFeaturedTech,
        },
    };
};

export default TutorialsPage;
