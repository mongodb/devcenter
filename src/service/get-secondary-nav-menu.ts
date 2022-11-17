import { getAllContentItems } from './get-all-content';
import { Tag } from '../interfaces/tag';
import { SecondaryNavMenu } from '../interfaces/secondary-nav-menu';

export const getSecondaryNavMenu = async () => {
    const contents = await getAllContentItems();
    const l1l2Tags: Tag[][] = contents.map(c => c.tags);

    const flattenedL1L2Tags: Tag[] = [];

    l1l2Tags.forEach(tags => {
        tags.forEach(tag => flattenedL1L2Tags.push(tag));
    });

    const distinctTags = flattenedL1L2Tags.filter(
        (value, index, self) =>
            index === self.findIndex(t => t.slug === value.slug)
    );

    const l2products: Tag[] = distinctTags.filter(t => t.type === 'L2Product');

    const languageMenu = constructMenuForTagType(
        'Languages',
        distinctTags.filter(t => t.type === 'ProgrammingLanguage')
    );
    const technologyMenu = constructMenuForTagType(
        'Technologies',
        distinctTags.filter(t => t.type === 'Technology')
    );
    const expertiseLevelMenu = constructMenuForTagType(
        'Expertise Levels',
        distinctTags.filter(t => t.type === 'ExpertiseLevel')
    );
    const productLevelMenu = constructMenuForProductsTagType(
        'Products',
        distinctTags.filter(t => t.type === 'L1Product'),
        l2products
    );

    const documentationMenu: SecondaryNavMenu = {
        name: 'Documentation',
        slug: 'https://www.mongodb.com/docs/',
    };
    const articlesMenu: SecondaryNavMenu = {
        name: 'Articles',
        slug: '/articles',
    };

    const tutorialsMenu: SecondaryNavMenu = {
        name: 'Tutorials',
        slug: '/tutorials',
    };

    const quickstartMenu: SecondaryNavMenu = {
        name: 'Events',
        slug: '/events',
    };

    const codeExamplesMenu: SecondaryNavMenu = {
        name: 'Code Examples',
        slug: '/codeexamples',
    };

    const podcastsMenu: SecondaryNavMenu = {
        name: 'Podcasts',
        slug: 'https://podcasts.mongodb.com/public/115/The-MongoDB-Podcast-b02cf624',
    };

    const videosMenu: SecondaryNavMenu = {
        name: 'Videos',
        slug: '/videos',
    };

    return [
        productLevelMenu,
        languageMenu,
        technologyMenu,
        expertiseLevelMenu,
        documentationMenu,
        articlesMenu,
        tutorialsMenu,
        quickstartMenu,
        codeExamplesMenu,
        podcastsMenu,
        videosMenu,
    ];
};

const getL2ForL1 = (l2Items: Tag[], l1Slug: string) => {
    return l2Items.filter(l2Item =>
        l2Item.slug.toLowerCase().startsWith(l1Slug.toLowerCase())
    );
};

const constructDropDownItems = (tags: Tag[]) => {
    const dropDownItems: SecondaryNavMenu[] = [];

    tags.forEach(tag => {
        dropDownItems.push({
            name: tag.name,
            slug: tag.slug,
        });
    });
    return dropDownItems;
};

const constructMenuForTagType = (tagType: string, tags: Tag[]) => {
    const dropDownItems: SecondaryNavMenu[] = constructDropDownItems(tags);
    return {
        name: tagType,
        slug: '',
        dropDownItems: dropDownItems,
    };
};

const constructMenuForProductsTagType = (
    tagType: string,
    tags: Tag[],
    l2Items: Tag[]
) => {
    const dropDownItems: SecondaryNavMenu[] = [];

    tags.forEach(tag => {
        dropDownItems.push({
            name: tag.name,
            slug: tag.slug,
            dropDownItems: constructDropDownItems(
                getL2ForL1(l2Items, tag.slug)
            ),
        });
    });

    return {
        name: tagType,
        slug: '',
        dropDownItems: dropDownItems,
    };
};
