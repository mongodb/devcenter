export const collectionTypeValues = [
    'Article',
    'Podcast',
    'Video',
    'Event',
] as const;

export type CollectionType = typeof collectionTypeValues[number];
