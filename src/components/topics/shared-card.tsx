import React from 'react';
import { Thumbnail } from '../../interfaces/thumnail';
import { PillCategory } from '../../types/pill-category';
import { ESingleImageVariant, SingleImage, TypographyScale } from '@mdb/flora';
import {
    SharedCardWrapper,
    ThumbnailImage,
    StyledPill,
    FooterContent,
    ThumbnailWrapper,
    StyledHorizontalRule,
    StyledTitle,
    StyledDescription,
} from '../../styled/shared-card';

//It will consume prop support for no thumbnail, large-medium-small thumbnail, pill, title, description, a footer with date
interface IProps {
    contentDate: Date;
    description?: string;
    header: string;
    pillCategory: PillCategory;
    tags?: string[];
    thumbnail?: Thumbnail;
}

const SharedCard: React.FunctionComponent<IProps> = ({
    contentDate,
    description,
    header,
    pillCategory,
    thumbnail,
}: IProps) => {
    return (
        <SharedCardWrapper>
            {thumbnail && (
                <ThumbnailWrapper>
                    {thumbnail.size === 'large' ? (
                        <SingleImage
                            src={thumbnail.url}
                            variant={ESingleImageVariant.VIDEO}
                        />
                    ) : (
                        <ThumbnailImage
                            size={thumbnail.size}
                            loading="lazy"
                            src={thumbnail?.url}
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
            <StyledTitle variant="heading6">{header}</StyledTitle>
            {description && thumbnail?.size == 'medium' && (
                <StyledDescription variant="body2">
                    {description}
                </StyledDescription>
            )}
            <StyledHorizontalRule spacing="none" strokeWeight="medium" />
            <FooterContent>
                <TypographyScale variant="body3">
                    {contentDate.toDateString()}
                </TypographyScale>
            </FooterContent>
        </SharedCardWrapper>
    );
};

export default SharedCard;
