import { TertiaryNavItem } from '../components/tertiary-nav/types';
import { getAllContentItems } from './get-all-content';
import { ContentItem } from '../interfaces/content-item';

export const getSideNav = async (
    inputSlug: string
): Promise<TertiaryNavItem[]> => {
    const tertiaryNavItems: TertiaryNavItem[] = [];
    const contents: ContentItem[] = await getAllContentItems();
    const filteredContents = contents.filter(c => {
        const slugsInTags = c.tags.map(tag => tag.slug);
        return slugsInTags.includes(inputSlug);
    });

    // #TODO:

    let pluralize = require('pluralize');

    filteredContents.forEach((fc: ContentItem) => {
        fc.tags.forEach(tag => {
            if (tag.type === 'ContentType') {
                tertiaryNavItems.push({
                    title: pluralize(tag.name),
                    url: inputSlug + tag.slug,
                });
            }
        });
    });

    const uniqueTertiaryNavItems = deduplicate(tertiaryNavItems);
    return uniqueTertiaryNavItems.sort((a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
};

const deduplicate = (
    tertiaryNavItems: TertiaryNavItem[]
): TertiaryNavItem[] => {
    return tertiaryNavItems.filter(
        (value, index, self) =>
            index === self.findIndex(t => t.title === value.title)
    );
};
