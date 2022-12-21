import theme from '@mdb/flora/theme';

import { CardProps, CardVariant } from './types';
import { PillCategory } from '../../types/pill-category';
import { ContentItem } from '../../interfaces/content-item';
import SecondaryTag from './secondary-tag';
import { FullApplication, Snippet } from '../icons';
import { ESystemIconNames, SystemIcon } from '@mdb/flora';
import {
    formatDateRange,
    formatDateToDisplayDateFormat,
    getLatestDate,
} from '../../utils/format-date';

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

const parseContentDate = (
    contentDate: string | [string, string],
    updateDate?: string
) => {
    if (Array.isArray(contentDate)) {
        return formatDateRange(contentDate[0], contentDate[1]);
    }

    return formatDateToDisplayDateFormat(
        getLatestDate(contentDate, updateDate)
    );
};

export const getCardProps = (
    {
        authors,
        category,
        subCategory,
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
    const locationTag = (location: string) => (
        <SecondaryTag icon={<SystemIcon name={ESystemIconNames.LOCATION} />}>
            {location}
        </SecondaryTag>
    );

    const cardProps: CardProps = {
        authors,
        displayDate: parseContentDate(contentDate, updateDate),
        description,
        title,
        contentType: category,
        pillCategory: subCategory || category,
        tags,
        thumbnail: image,
        variant,
        slug,
        ...(location ? { secondaryTag: locationTag(location) } : {}),
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
