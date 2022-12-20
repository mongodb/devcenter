import { CardProps, CardVariant } from './types';
import { PillCategory } from '../../types/pill-category';
import { ContentItem } from '../../interfaces/content-item';

export const getLatestDate = (contentDate: string, updatedDate?: string) => {
    let latestDate = new Date(contentDate);

    if (!updatedDate) {
        return latestDate;
    }

    const _updatedDate = new Date(updatedDate);

    if (_updatedDate > latestDate) {
        latestDate = _updatedDate;
    }

    return latestDate;
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
