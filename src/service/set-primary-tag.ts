import { ContentItem } from '../interfaces/content-item';
import { Media } from '../interfaces/media';

export const setPrimaryTag = (
    contentItem: ContentItem,
    videoOrPodcastObject: Media
) => {
    if (videoOrPodcastObject.otherTags.l1Product) {
        contentItem.primaryTag = {
            l1Product: videoOrPodcastObject.otherTags.l1Product,
        };
    }
    if (
        videoOrPodcastObject.otherTags.programmingLanguage &&
        videoOrPodcastObject.otherTags.programmingLanguage.length > 0
    ) {
        contentItem.primaryTag = {
            programmingLanguage:
                videoOrPodcastObject.otherTags.programmingLanguage[0],
        };
    }
};
