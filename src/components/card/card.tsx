import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TypographyScale, Pill, Tag, HorizontalRule } from '@mdb/flora';

import {
    cardWrapperStyles,
    pillStyles,
    tagWrapperStyles,
    descriptionStyles,
    tagStyles,
    cardHeaderStyles,
    thumbnailWrapperStyles,
} from './styles';
import {
    thumbnailLoader,
    hasThumbnail,
    hasTags,
    hasDescription,
} from './utils';
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
    href = '#',
}) => {
    return (
        <Link href={href} passHref={true}>
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
                        {hasTags(variant) && (
                            <div sx={tagWrapperStyles}>
                                {tags?.map(tag => (
                                    <Tag
                                        key={tag}
                                        variant="small"
                                        sx={tagStyles}
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <HorizontalRule spacing="none" strokeWeight="medium" />
                    <div sx={{ marginTop: ['inc30', null, null, 'inc40'] }}>
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
