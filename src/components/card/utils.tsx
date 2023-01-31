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
    updateDate?: string,
    eventTimeFormatting?: boolean
) => {
    if (Array.isArray(contentDate)) {
        return formatDateRange(contentDate[0], contentDate[1]);
    } else if (eventTimeFormatting) {
        return formatDateRange(contentDate, contentDate);
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
        city,
        state,
        country,
        eventSetup,
    }: ContentItem,
    variant: CardVariant
): CardProps => {
    const cardProps: CardProps = {
        authors,
        displayDate: parseContentDate(
            contentDate,
            updateDate,
            category === 'Event'
        ),
        description,
        title,
        contentType: category,
        pillCategory: subCategory || category,
        tags,
        thumbnail: image,
        variant,
        slug,
    };

    if (tags) {
        if (category === 'Code Example') {
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
        } else if (category === 'Event') {
            const attendanceTag = tags.find(
                tag => tag.type === 'EventAttendance'
            );
            const attendanceType = eventSetup || attendanceTag?.name;
            console.log(city, country, state, location);
            const locationDisplay =
                city && country
                    ? `${city}, ${state ? `${state}, ` : ''}${country}`
                    : location || '';

            if (locationDisplay || attendanceType) {
                const hyphenatedAttendanceType =
                    attendanceType
                        ?.trim()
                        .replace(/([A-Z])/g, '-$1')
                        .replace(/^-?(.+)-?$/g, '$1') || '';

                cardProps.secondaryTag = (
                    <SecondaryTag
                        icon={
                            <SystemIcon
                                sx={{ minWidth: 'inc10' }}
                                name={ESystemIconNames.LOCATION}
                            />
                        }
                    >
                        {`${locationDisplay}${
                            locationDisplay && hyphenatedAttendanceType
                                ? ' | '
                                : ''
                        }${hyphenatedAttendanceType}`.toUpperCase()}
                    </SecondaryTag>
                );
            }
        }
    }

    return cardProps;
};
