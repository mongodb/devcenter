import theme from '@mdb/flora/theme';

import { CardProps, CardVariant } from './types';
import { PillCategory } from '../../types/pill-category';
import { ContentItem } from '../../interfaces/content-item';
import SecondaryTag from './secondary-tag';
import { FullApplication, Snippet } from '../icons';

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
        location,
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

    if (tags && category === 'Code Example') {
        const codeLevelTag = tags.find(tag => tag.type === 'CodeLevel');
        if (codeLevelTag && codeLevelTag.name) {
            const iconStyles = {
                strokeWidth: 2,
                fill: theme.colors.text.secondary,
            };

            cardProps.secondaryTag = (
                <SecondaryTag
                    icon={
                        codeLevelTag.name === 'Snippet' ? (
                            <Snippet sx={iconStyles} />
                        ) : (
                            <FullApplication sx={iconStyles} />
                        )
                    }
                >
                    {codeLevelTag.name.toUpperCase()}
                </SecondaryTag>
            );
        }
    }

    return cardProps;
};
