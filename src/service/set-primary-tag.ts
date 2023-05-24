import { Connection } from '../interfaces/connection';
import { ContentItem } from '../interfaces/content-item';
import { CS_Media, Media } from '../interfaces/media';
import { GenericTagTypeResponse } from '../interfaces/tag-type-response';
import { extractFieldsFromConnection } from '../utils/contentstack';

export const setPrimaryTag = (
    contentItem: ContentItem,
    videoOrPodcastObject: Media
) => {
    if (!videoOrPodcastObject.otherTags) return;
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
export const CS_setPrimaryTag = (
    contentItem: ContentItem,
    videoOrPodcast: CS_Media
) => {
    if (!videoOrPodcast.other_tags) return;

    const l1Product = extractFieldsFromConnection(
        videoOrPodcast.other_tags.l1_productConnection as Connection,
        [
            ['title', 'name'],
            ['calculated_slug', 'calculatedSlug'],
        ],
        true
    );

    const programmingLanguage = extractFieldsFromConnection(
        videoOrPodcast.other_tags.programming_languagesConnection as Connection,
        [
            ['title', 'name'],
            ['calculated_slug', 'calculatedSlug'],
        ],
        true
    );

    // programming language takes precedence as the primary tag
    if (l1Product) {
        contentItem.primaryTag = {
            l1Product: l1Product as GenericTagTypeResponse,
        };
    }

    if (programmingLanguage) {
        contentItem.primaryTag = {
            programmingLanguage: programmingLanguage as GenericTagTypeResponse,
        };
    }
};
