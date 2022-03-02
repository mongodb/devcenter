import React from 'react';
import Image from 'next/image';
import { TypographyScale, HorizontalRule, Pill } from '@mdb/flora';
import { thumbnailWrapperStyles, cardHeaderStyles } from './styles';
import { cardWrapperStyles, pillStyles } from '../styles';
import { thumbnailLoader } from '../utils';
import { FeaturedMediumCardProps } from './types';

//It will consume prop support for no thumbnail, large-medium-small thumbnail, pill, title, description, a footer with date
export const FeaturedMedium: React.FunctionComponent<
    FeaturedMediumCardProps
> = ({
    contentDate,
    className,
    description,
    title,
    pillCategory,
    thumbnail,
}) => {
    return (
        <div className={className} sx={cardWrapperStyles}>
            <div sx={cardHeaderStyles}>
                {thumbnail && (
                    <div sx={thumbnailWrapperStyles(pillCategory)}>
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
                    {description && (
                        <TypographyScale
                            variant="body2"
                            sx={{ display: 'block', marginTop: 'inc30' }}
                        >
                            {description}
                        </TypographyScale>
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
        </div>
    );
};

export default FeaturedMedium;
