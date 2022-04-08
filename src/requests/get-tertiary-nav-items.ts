import { TertiaryNavItem } from '../components/tertiary-nav/types';
import { ContentPiece } from '../interfaces/content-piece';

import { getContentTypesFromContent } from '../utils/helpers';
import { pillCategoryToSlug } from '../utils/maps';

const getTertiaryNavItemsFromContent = (
    content: ContentPiece[]
): TertiaryNavItem[] => {
    const externalItems = [
        {
            title: `Community Discussion`,
            url: `https://www.mongodb.com/community/forums/`,
        },
        {
            title: `Documentation`,
            url: `https://docs.mongodb.com/`,
        },
        {
            title: `News & Announcements`,
            url: `https://www.mongodb.com/news`,
        },
        {
            title: `Stack Overflow`,
            url: `https://stackoverflow.com/`,
        },
    ];

    if (!content.length) {
        return externalItems;
    }

    const slugList = content[0].slug.split('/');
    slugList.pop();
    const topicSlug = slugList.join('/');
    const contentTypes = getContentTypesFromContent(content);

    const items = contentTypes.map(contentType => {
        const contentTypeSlug = pillCategoryToSlug.get(contentType);
        if (contentTypeSlug === undefined) {
            throw Error(`Error mapping content type ${contentType} to slug`);
        }
        return {
            title: `${contentType}s`,
            url: `/${topicSlug}/${contentTypeSlug}`,
        };
    });

    return items.concat(externalItems);
};

export default getTertiaryNavItemsFromContent;
