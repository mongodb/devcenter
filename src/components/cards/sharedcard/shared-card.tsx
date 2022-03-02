import React from 'react';
import { TypographyScale } from '@mdb/flora';
import {
    SharedCardWrapper,
    ThumbnailImage,
    StyledPill,
    FooterContent,
    ThumbnailWrapper,
    StyledHorizontalRule,
    StyledTitle,
    StyledDescription,
    IntrinsicRatioWrapper,
} from './styles';
import { thumbnailLoader } from '../utils';
import { SharedCardProps } from './types';

const thumbnailSizeMap = {
    small: { height: '64px', width: '64px' },
    medium: { height: '96px', width: '96px' },
    large: { height: '184px', width: '327px' },
};

//It will consume prop support for no thumbnail, large-medium-small thumbnail, pill, title, description, a footer with date
export const SharedCard: React.FunctionComponent<SharedCardProps> = ({
    contentDate,
    className,
    description,
    title,
    pillCategory,
    thumbnail,
}) => {
    return (
        <SharedCardWrapper className={className}>
            {thumbnail && (
                <ThumbnailWrapper>
                    {thumbnail.size === 'large' ? (
                        <IntrinsicRatioWrapper>
                            <ThumbnailImage
                                loader={thumbnailLoader}
                                alt={thumbnail.alt || 'alt not provided'}
                                src={thumbnail.url}
                                sx={{ objectFit: 'cover' }}
                                layout="fill"
                            />
                        </IntrinsicRatioWrapper>
                    ) : (
                        <ThumbnailImage
                            loader={thumbnailLoader}
                            alt={thumbnail.alt || 'alt not provided'}
                            src={thumbnail.url}
                            height={thumbnailSizeMap[thumbnail.size].height}
                            width={thumbnailSizeMap[thumbnail.size].width}
                        />
                    )}
                </ThumbnailWrapper>
            )}
            <StyledPill
                pillCategory={pillCategory}
                variant="identifier"
                text={pillCategory}
                size="small"
            />
            <StyledTitle variant="heading6">{title}</StyledTitle>
            {description && (
                <StyledDescription variant="body2">
                    {description}
                </StyledDescription>
            )}
            <StyledHorizontalRule spacing="none" strokeWeight="medium" />
            <FooterContent>
                <TypographyScale variant="body3">{contentDate}</TypographyScale>
            </FooterContent>
        </SharedCardWrapper>
    );
};

export default SharedCard;
