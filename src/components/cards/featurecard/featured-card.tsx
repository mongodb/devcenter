import React from 'react';
import Image from 'next/image';
import { TypographyScale } from '@mdb/flora';

import {
    FeaturedCardWrapper,
    TagWrapper,
    StyledPill,
    StyledDescription,
    StyledTag,
    StyledTitle,
    StyledHorizontalRule,
    FooterContent,
    cardHeaderStyles,
    thumbnailWrapperStyles,
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
    listView = false,
    title,
    pillCategory,
    tags,
    thumbnail,
}) => {
    return (
        <FeaturedCardWrapper className={className}>
            <div sx={cardHeaderStyles(listView)}>
                <div sx={thumbnailWrapperStyles(pillCategory, listView)}>
                    <Image
                        alt={thumbnail.alt || 'alt not provided'}
                        loader={thumbnailLoader}
                        src={thumbnail?.url}
                        sx={{
                            borderRadius: 'inc30',
                            objectFit: 'cover',
                        }}
                        layout="fill"
                    />
                </div>
                <div>
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
                </div>
            </div>
            <StyledHorizontalRule spacing="none" strokeWeight="medium" />
            <FooterContent>
                <TypographyScale variant="body3">{contentDate}</TypographyScale>
            </FooterContent>
        </FeaturedCardWrapper>
    );
};

export default FeatureCard;
