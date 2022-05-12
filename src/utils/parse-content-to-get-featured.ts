import { ContentItem } from '../interfaces/content-item';

/*
@Param
content : assumes content is already filtered depending on L1 or L2 or Content Type
 */
export const parseContentToGetFeatured = (content: ContentItem[]) => {
    const actualFeatured = content.filter(c => c.featured);

    //remaining content apart from featured
    const remainingContent = content.filter(
        c => !actualFeatured.map(aF => aF.title).includes(c.title)
    );

    //if actual featured is greater than 3 just use them else pick the rest from remaining content
    return actualFeatured.length >= 3
        ? actualFeatured.slice(0, 3)
        : actualFeatured.concat(
              remainingContent
                  .sort((a, b) => b.contentDate.localeCompare(a.contentDate))
                  .slice(0, 3 - actualFeatured.length)
          );
};
