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

export const getCardProps = (
    {
        authors,
        category,
        contentDate,
        description,
        tags,
        title,
        image,
    }: ContentPiece,
    variant: CardVariant
): CardProps => {
    const { alt, url } = image;
    const cardProps: CardProps = {
        authors,
        contentDate,
        description,
        title,
        pillCategory: category,
        tags,
        thumbnail: { alt, size: 'large', url }, // Size is irrelevant here.
        variant,
    };

    return cardProps;
};
