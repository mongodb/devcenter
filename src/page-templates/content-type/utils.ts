import { PillCategory } from '../../types/pill-category';
import { ContentItem } from '../../interfaces/content-item';
import { getAllContentItems } from '../../service/get-all-content';
import { FilterItem } from '../../components/search-filters';

export const getFilters = async (contentType: PillCategory) => {
    const allContent: ContentItem[] = await getAllContentItems();

    const filterItems: FilterItem[] = [];

    const content = allContent.filter(
        ({ category }) => category === contentType
    );

    content.forEach(({ tags }) => {
        tags.forEach(tag => {
            if (tag.type === 'ContentType') {
                return;
            } else if (tag.type === 'L2Product') {
                const l2FilterItem: FilterItem = {
                    type: tag.type,
                    name: tag.name,
                };
                const l1 = tags.filter(tag => tag.type === 'L1Product')[0];
                const l1FilterItem = filterItems.find(
                    item => item.type === 'L1Product' && item.name === l1.name
                );
                if (l1FilterItem) {
                    if (!l1FilterItem.subItems) {
                        l1FilterItem.subItems = [];
                    }
                    return l1FilterItem.subItems.push(l2FilterItem);
                } else {
                    const l1FilterItem: FilterItem = {
                        type: l1.type,
                        name: l1.name,
                        subItems: [l2FilterItem],
                    };
                    return filterItems.push(l1FilterItem);
                }
            } else {
                if (
                    !filterItems.find(
                        filter =>
                            filter.name === tag.name && filter.type === tag.type
                    )
                ) {
                    const filterItem: FilterItem = {
                        type: tag.type,
                        name: tag.name,
                    };
                    return filterItems.push(filterItem);
                }
            }
        });
    });

    const l1Items = filterItems.filter(({ type }) => type === 'L1Product');
    const languageItems = filterItems.filter(
        ({ type }) => type === 'ProgrammingLanguage'
    );
    const technologyItems = filterItems.filter(
        ({ type }) => type === 'Technology'
    );
    const contributedByItems = filterItems.filter(
        ({ type }) => type === 'AuthorType'
    );
    return { l1Items, languageItems, technologyItems, contributedByItems };
};
