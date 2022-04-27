import { PillCategory } from '../../types/pill-category';
import { ContentItem } from '../../interfaces/content-item';
import { getAllContentItems } from '../../service/get-all-content';
import { FilterItem } from '../../components/search-filters';
import { itemsStyles } from '../../components/search-filters/styles';

export const getFilters = async (contentType: PillCategory) => {
    const allContent: ContentItem[] = await getAllContentItems();

    const filterItems: FilterItem[] = [];

    allContent.forEach(({ tags, category }) => {
        tags.forEach(tag => {
            if (tag.type === 'L2Product') {
                const l2FilterItem: FilterItem = {
                    type: tag.type,
                    name: tag.name,
                    count: category === contentType ? 1 : 0,
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
                        if (category === contentType) {
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
                        count: category === contentType ? 1 : 0,
                    };
                    return filterItems.push(l1FilterItem);
                }
            } else {
                // For everything else, just check if it exists.
                const existingItem = filterItems.find(
                    filter =>
                        filter.name === tag.name && filter.type === tag.type
                );
                if (existingItem) {
                    // If it exists, increment count only if the content type matches.
                    if (category === contentType) {
                        existingItem.count++;
                    }
                    return;
                } else {
                    // If not, add it to the list.
                    const filterItem: FilterItem = {
                        type: tag.type,
                        name: tag.name,
                        count: category === contentType ? 1 : 0,
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

    return {
        l1Items,
        languageItems,
        technologyItems,
        contributedByItems,
        contentTypeItems,
    };
};
