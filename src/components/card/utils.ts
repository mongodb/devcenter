import { ImageLoaderProps } from 'next/dist/client/image';

import { CardProps, CardVariant } from './types';
import { PillCategory } from '../../types/pill-category';
import { ContentItem } from '../../interfaces/content-item';

export const getLatestDate = (contentDate: string, updateDate?: string) => {
    let latestDate = new Date(contentDate);

    if (updateDate === undefined) {
        return latestDate;
    }

    const _updateDate = new Date(updateDate);

    if (_updateDate > latestDate) {
        latestDate = _updateDate;
    }

    return _updateDate;
};

export const thumbnailLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `${src}?w=${width}&q=${quality || 90}`;
};

export const hasThumbnail = (variant: CardVariant, category: PillCategory) =>
    variant !== 'related' &&
    !(
        (variant === 'small' || variant === 'medium') &&
        ['Tutorial', 'News & Announcements'].includes(category)
    );

export const hasTags = (variant: CardVariant) =>
    ['large', 'list', 'medium'].includes(variant);

export const hasDescription = (variant: CardVariant, category: PillCategory) =>
    ['large', 'list'].includes(variant) ||
    (category === 'Code Example' && ['small', 'medium'].includes(variant));

export const hasAuthorLockup = (variant: CardVariant, category: PillCategory) =>
    ['large', 'list'].includes(variant) &&
    ['Article', 'Tutorial', 'Code Example', 'Quickstart'].includes(category);

export const getCardProps = (
    {
        authors,
        category,
        contentDate,
        updateDate,
        description,
        tags,
        title,
        image,
        slug,
    }: ContentItem,
    variant: CardVariant
): CardProps => {
    const cardProps: CardProps = {
        authors,
        contentDate,
        updateDate,
        description,
        title,
        pillCategory: category,
        tags,
        thumbnail: image,
        variant,
        slug,
    };

    return cardProps;
};
