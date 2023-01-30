import { PillCategory } from '../../types/pill-category';
import { Tag } from '../../interfaces/tag';
import { Author } from '../../interfaces/author';
import { Image } from '../../interfaces/image';
import React from 'react';

export type CardVariant = 'small' | 'medium' | 'large' | 'list' | 'related';

export interface CardProps {
    authors?: Author[];
    displayDate: string;
    className?: string;
    description?: string;
    title: string;
    contentType: PillCategory;
    pillCategory: PillCategory;
    tags?: Tag[];
    thumbnail?: Image;
    variant: CardVariant;
    slug: string;
    hideTagsOnMobile?: boolean;
    secondaryTag?: React.ReactNode;
}
