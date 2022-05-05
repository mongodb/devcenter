import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TypographyScale, Pill, Tag, HorizontalRule } from '@mdb/flora';

import AuthorLockup from '../author-lockup';

import {
    cardWrapperStyles,
    pillStyles,
    descriptionStyles,
    cardHeaderStyles,
    thumbnailWrapperStyles,
} from './styles';
import {
    thumbnailLoader,
    hasThumbnail,
    hasTags,
    hasDescription,
    hasAuthorLockup,
} from './utils';
import TagSection from '../tag-section';
import { CardProps } from './types';
import parse from 'html-react-parser';
import { formatDateToDisplayDateFormat } from '../../utils/format-date';

// Still need to add authors section.
const Card: React.FunctionComponent<CardProps> = ({
    authors,
    contentDate,
    className,
    description,
    title,
    pillCategory,
    tags,
    thumbnail,
    variant,
    slug,
}) => {
    const displayDate = formatDateToDisplayDateFormat(new Date(contentDate));
    return (
        // Next Link breaks behavior on dev because of our wonky routing.
        // <Link href={slug} passHref={true}>
        <a
            sx={cardWrapperStyles}
            href={slug}
            className={className}
            tabIndex={0}
            data-testid={`card-${variant}`}
        >
            <div sx={cardHeaderStyles(variant, pillCategory)}>
                {thumbnail && hasThumbnail(variant, pillCategory) && (
                    <div sx={thumbnailWrapperStyles(variant, pillCategory)}>
                        <Image
                            alt={thumbnail.alt || 'alt not provided'}
                            loader={thumbnailLoader}
                            src={thumbnail.url}
                            sx={{
                                borderRadius: 'inc30',
                                objectFit: 'cover',
                            }}
                            layout="fill"
                        />
                    </div>
                )}
                <div>
                    <Pill
                        sx={pillStyles(pillCategory)}
                        variant="identifier"
                        text={pillCategory}
                        size="small"
                    />
                    <TypographyScale variant="heading6">
                        {title}
                    </TypographyScale>
                    {hasDescription(variant, pillCategory) && (
                        <TypographyScale
                            variant="body2"
                            sx={descriptionStyles(variant, pillCategory)}
                        >
                            {parse(description ? description : '')}
                        </TypographyScale>
                    )}
                    {hasTags(variant) && tags && (
                        <TagSection tags={tags} disappearOnMobile={true} />
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
                        authors.length &&
                        hasAuthorLockup(variant, pillCategory) && (
                            <AuthorLockup
                                sx={{
                                    display: ['none', null, 'flex'],
                                    flexGrow: 0,
                                }}
                                authors={authors}
                            />
                        )}
                </div>
            </div>
        </a>
        // </Link>
    );
};

export default Card;
