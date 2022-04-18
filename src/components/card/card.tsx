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
    return (
        <Link
            href={{
                pathname: '/[...slug]',
                query: { slug: slug.split('/') },
            }}
            passHref={true}
        >
            <a
                sx={cardWrapperStyles}
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
                                {description}
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
                        {authors && hasAuthorLockup(variant, pillCategory) && (
                            <AuthorLockup
                                sx={{ display: ['none', null, 'flex'] }}
                                authors={[
                                    { name: 'Some Person', url: '#' },
                                    {
                                        name: 'Other Person',
                                        image: {
                                            src: 'https://i.pravatar.cc/200',
                                        },
                                        url: '#',
                                    },
                                ]}
                            />
                        )}
                        <TypographyScale variant="body3">
                            {contentDate}
                        </TypographyScale>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default Card;
