export const collectionTypeValues = ['Article', 'Podcast', 'Video'] as const;

export type CollectionType = typeof collectionTypeValues[number];
