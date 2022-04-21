import { ImageLoaderProps } from 'next/dist/client/image';

import { CardProps, CardVariant } from './types';
import { ContentPiece } from '../../interfaces/content-piece';
import { PillCategory } from '../../types/pill-category';

export const thumbnailLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `${src}?w=${width}&q=${quality || 75}`;
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
        contentDate,
        description,
        tags,
        title,
        image,
        slug,
    }: ContentPiece,
    variant: CardVariant
): CardProps => {
    const cardProps: CardProps = {
        authors,
        contentDate,
        description,
        title,
        pillCategory: tags.contentType,
        tags,
        thumbnail: image,
        variant,
        slug,
    };

    return cardProps;
};
