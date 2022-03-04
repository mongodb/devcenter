import { ImageLoaderProps } from 'next/dist/client/image';

import { CardVariant } from './types';
import { PillCategory } from '../../types/pill-category';

export const thumbnailLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `${src}?w=${width}&q=${quality || 75}`;
};

export const hasThumbnail = (variant: CardVariant, category: PillCategory) =>
    variant !== 'related' &&
    !((variant === 'small' || variant === 'medium') && category === 'Tutorial');

export const hasTags = (variant: CardVariant) =>
    variant === 'large' || variant === 'list';
