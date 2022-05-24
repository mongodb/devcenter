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
import { parseAuthorsToAuthorLockup } from '../../utils/parse-authors-to-author-lockup';
import { getURLPath } from '../../utils/format-url-path';
import SecondaryTag from './secondary-tag';
import { CodeLevel } from '../../types/tag-type';

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
    let secondaryTagElement = null;
    if (tags && pillCategory === 'Code Example') {
        const codeLevelTag = tags.find(tag => tag.type === 'CodeLevel');
        if (codeLevelTag && codeLevelTag.name) {
            secondaryTagElement = (
                <SecondaryTag codeLevel={codeLevelTag.name as CodeLevel} />
            );
        }
    }
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
            />
            <div sx={cardHeaderStyles(variant, pillCategory)}>
                {((thumbnail && thumbnail.url) || pillCategory === 'Podcast') &&
                    hasThumbnail(variant, pillCategory) && (
                        <div sx={thumbnailWrapperStyles(variant, pillCategory)}>
                            <Image
                                alt={
                                    pillCategory === 'Podcast'
                                        ? 'Play Button'
                                        : thumbnail?.alt || 'alt not provided'
                                }
                                loader={thumbnailLoader}
                                src={
                                    pillCategory === 'Podcast'
                                        ? (getURLPath(
                                              '/play-button.svg'
                                          ) as string)
                                        : (thumbnail?.url as string)
                                }
                                sx={{
                                    borderRadius: 'inc30',
                                    objectFit: 'cover',
                                }}
                                layout="fill"
                            />
                            {pillCategory === 'Video' && (
                                <div
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        height: '100%',
                                    }}
                                >
                                    <Image
                                        alt={'Play Button'}
                                        src={
                                            getURLPath(
                                                '/play-button.svg'
                                            ) as string
                                        }
                                        width={60}
                                        height={60}
                                    ></Image>
                                </div>
                            )}
                        </div>
                    )}
                <div>
                    <Pill
                        sx={pillStyles(pillCategory)}
                        variant="identifier"
                        text={pillCategory}
                        size="small"
                    />
                    {secondaryTagElement}
                    <TypographyScale
                        variant={variant === 'large' ? 'heading5' : 'heading6'}
                    >
                        {title}
                    </TypographyScale>
                    {hasDescription(variant, pillCategory) && (
                        <TypographyScale
                            variant="body2"
                            sx={descriptionStyles(variant, pillCategory)}
                        >
                            <Truncate lines={4} ellipsis={<span>...</span>}>
                                {parse(description ? description : '')}
                            </Truncate>
                        </TypographyScale>
                    )}
                    {hasTags(variant) && tags && (
                        <TagSection
                            tags={tags}
                            disappearOnMobile={true}
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
