import React from 'react';
import { TypographyScale } from '@mdb/flora';

import {
    FeaturedCardWrapper,
    CardHeader,
    ContentWrapper,
    TagWrapper,
    StyledPill,
    StyledDescription,
    StyledTag,
    StyledThumbnail,
    ThumbnailWrapper,
    StyledTitle,
    StyledHorizontalRule,
    FooterContent,
} from './styles';
import { thumbnailLoader } from '../utils';
import { FeaturedCardProps } from './types';

/*
featured jumbo card consumes a thumbnail, pill, header, paragraph, tags, and footer with the date and Appleseed section
We will need to follow up with Michael Waltzer about the Appleseed section
Tags would need to be supported via a prop that can map over the number of tags with its text
The cards for Search filtered content we can reuse the code from the jumbo featured card built here. The only difference here is that this card extends 100 percent of the available space.
Talked to Michael Waltzer about podcast cards and looks like we would like to keep them as is in the design.
We can provide support to have a variant for podcast cards that only displays the thumbnail, pill, header, and footer with the date
Authors section is conditional so will render if there are authors
 */

const FeatureCard: React.FunctionComponent<FeaturedCardProps> = ({
    authors,
    contentDate,
    className,
    description,
    title,
    pillCategory,
    tags,
    thumbnail,
}) => {
    return (
        <FeaturedCardWrapper className={className}>
            <CardHeader>
                <ThumbnailWrapper>
                    <StyledThumbnail
                        alt={thumbnail.alt || 'alt not provided'}
                        loader={thumbnailLoader}
                        src={thumbnail?.url}
                        width={180}
                        height={180}
                    />
                </ThumbnailWrapper>
                <ContentWrapper>
                    <StyledPill
                        pillCategory={pillCategory}
                        variant="identifier"
                        text={pillCategory}
                        size="small"
                    />
                    <StyledTitle variant="heading6">{title}</StyledTitle>
                    <StyledDescription variant="body2">
                        {description}
                    </StyledDescription>
                    <TagWrapper>
                        {tags?.map(tag => (
                            <StyledTag key={tag} variant="small">
                                {tag}
                            </StyledTag>
                        ))}
                    </TagWrapper>
                </ContentWrapper>
            </CardHeader>
            <StyledHorizontalRule spacing="none" strokeWeight="medium" />
            <FooterContent>
                <TypographyScale variant="body3">{contentDate}</TypographyScale>
            </FooterContent>
        </FeaturedCardWrapper>
    );
};

export default FeatureCard;
