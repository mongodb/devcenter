import { ImageLoaderProps } from 'next/dist/client/image';

import { CardProps, CardVariant } from './types';
import { PillCategory } from '../../types/pill-category';
import { ContentItem } from '../../interfaces/content-item';

export const thumbnailLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `${src}?w=${width}&q=${quality || 90}`;
};

export const hasThumbnail = (variant: CardVariant, category: PillCategory) =>
    variant !== 'related' &&
    !((variant === 'small' || variant === 'medium') && category === 'Tutorial');

export const hasTags = (variant: CardVariant) =>
    variant === 'large' || variant === 'list';

export const hasDescription = (variant: CardVariant, category: PillCategory) =>
    ['large', 'list'].includes(variant) ||
    (category === 'Demo App' && ['small', 'medium'].includes(variant));

export const hasAuthorLockup = (variant: CardVariant, category: PillCategory) =>
    variant === 'large' &&
    ['Article', 'Tutorial', 'Demo App'].includes(category);

export const getCardProps = (
    {
        authors,
        category,
        contentDate,
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
