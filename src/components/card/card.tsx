import React from 'react';
import Image from 'next/image';
import { TypographyScale, Pill, HorizontalRule } from '@mdb/flora';
import Truncate from 'react-truncate';

import AuthorLockup from '../author-lockup';

import {
    cardWrapperStyles,
    pillStyles,
    descriptionStyles,
    cardHeaderStyles,
    thumbnailWrapperStyles,
    thumbnailStyles,
} from './styles';
import {
    hasThumbnail,
    hasTags,
    hasDescription,
    hasAuthorLockup,
    getLatestDate,
} from './utils';
import TagSection from '../tag-section';
import { CardProps, CardVariant } from './types';
import parse from 'html-react-parser';
import { formatDateToDisplayDateFormat } from '../../utils/format-date';
import { parseAuthorsToAuthorLockup } from '../../utils/parse-authors-to-author-lockup';
import { getURLPath } from '../../utils/format-url-path';
import { h5Styles, h6Styles } from '../../styled/layout';
import EventIcon from '../icons/event-icon';
import { PillCategory } from '../../types/pill-category';

const CardThumbnail = ({
    thumbnail: { url = '', alt = '', city = '' } = {},
    pillCategory,
    variant,
}: {
    thumbnail?: {
        url?: string;
        alt?: string;
        city?: string;
    };
    pillCategory: PillCategory;
    variant: CardVariant;
}) => {
    const playButtonUrl = getURLPath('/play-button.svg', false) as string;

    const defaultThumbnail = (
        <Image
            alt={alt || 'alt not provided'}
            src={url as string}
            sx={thumbnailStyles}
            layout="fill"
        />
    );

    const customThumbnails = {
        Podcast: (
            <Image
                alt="Play Button"
                src={playButtonUrl}
                sx={thumbnailStyles}
                layout="fill"
            />
        ),
        Event: url ? defaultThumbnail : <EventIcon text={city} />,
        Video: (
            <>
                {defaultThumbnail}
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    <Image
                        alt="Play Button"
                        src={playButtonUrl}
                        width={60}
                        height={60}
                    />
                </div>
            </>
        ),
    } as { [category: string]: JSX.Element };

    return hasThumbnail(variant, pillCategory) ? (
        <div sx={thumbnailWrapperStyles(variant, pillCategory)}>
            {customThumbnails[pillCategory] || defaultThumbnail}
        </div>
    ) : null;
};

const Card: React.FunctionComponent<CardProps> = ({
    authors,
    contentDate,
    updateDate: updatedDate,
    className,
    description,
    title,
    pillCategory,
    tags,
    thumbnail,
    variant,
    slug,
    hideTagsOnMobile = true,
    secondaryTag = null,
}) => {
    const truncatedDescription =
        description && parse(description ? description : '');
    const displayDate = formatDateToDisplayDateFormat(
        getLatestDate(contentDate, updatedDate)
    );

    return (
        <div
            sx={cardWrapperStyles}
            className={className}
            tabIndex={0}
            data-testid={`card-${variant}`}
        >
            {/* This absolute anchor is to avoid nesting anchor tags */}
            <a
                href={getURLPath(slug)}
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0,
                }}
                aria-label={title}
            />
            <div sx={cardHeaderStyles(variant, pillCategory)}>
                <CardThumbnail
                    thumbnail={thumbnail}
                    pillCategory={pillCategory}
                    variant={variant}
                />

                <div>
                    <Pill
                        sx={pillStyles(pillCategory)}
                        variant="identifier"
                        text={pillCategory}
                        size="small"
                    />
                    {secondaryTag}
                    <TypographyScale
                        variant="heading3"
                        sx={{
                            ...(variant === 'large' ? h5Styles : h6Styles),
                            ...(variant === 'large' && {
                                fontSize: ['inc30', 'inc30', 'inc50', 'inc80'],
                                lineHeight: [
                                    'inc20',
                                    'inc20',
                                    'inc30',
                                    'inc50',
                                ],
                            }),
                        }}
                    >
                        {title}
                    </TypographyScale>
                    {hasDescription(variant, pillCategory) && (
                        <TypographyScale
                            variant="body2"
                            sx={descriptionStyles(variant, pillCategory)}
                        >
                            <Truncate lines={4} ellipsis={<span>...</span>}>
                                {truncatedDescription}
                            </Truncate>
                        </TypographyScale>
                    )}
                    {hasTags(variant) && tags && (
                        <TagSection
                            tags={tags}
                            disappearOnMobile={hideTagsOnMobile}
                            sx={{
                                marginTop: variant === 'medium' ? 'inc30' : 0,
                            }}
                        />
                    )}
                </div>
            </div>
            <div>
                <HorizontalRule spacing="none" strokeWeight="medium" />

                <div
                    sx={{
                        marginTop: ['inc30', null, null, 'inc40'],
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <TypographyScale variant="body3">
                        {displayDate}
                    </TypographyScale>
                    {authors &&
                        !!authors.length &&
                        hasAuthorLockup(variant, pillCategory) && (
                            <AuthorLockup
                                sx={{
                                    display: ['none', null, 'flex'],
                                    flexGrow: 0,
                                }}
                                authors={parseAuthorsToAuthorLockup(authors)}
                            />
                        )}
                </div>
            </div>
        </div>
    );
};

export default Card;
