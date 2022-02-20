import React from 'react';
import { Thumbnail } from '../../interfaces/thumbnail';
import { PillCategory } from '../../types/pill-category';
import { HorizontalRule, TypographyScale } from '@mdb/flora';
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
} from '../../styled/feature-card';

interface IProps {
    authors?: string[];
    contentDate: Date;
    description?: string;
    title: string;
    pillCategory: PillCategory;
    tags?: string[];
    thumbnail: Thumbnail;
}

/*
featured jumbo card consumes a thumbnail, pill, header, paragraph, tags, and footer with the date and Appleseed section
We will need to follow up with Michael Waltzer about the Appleseed section
Tags would need to be supported via a prop that can map over the number of tags with its text
The cards for Search filtered content we can reuse the code from the jumbo featured card built here. The only difference here is that this card extends 100 percent of the available space.
Talked to Michael Waltzer about podcast cards and looks like we would like to keep them as is in the design.
We can provide support to have a variant for podcast cards that only displays the thumbnail, pill, header, and footer with the date
Authors section is conditional so will render if there are authors
 */

const myLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
};

const FeatureCard: React.FunctionComponent<IProps> = ({
    authors,
    contentDate,
    description,
    title,
    pillCategory,
    tags,
    thumbnail,
}: IProps) => {
    return (
        <FeaturedCardWrapper>
            <CardHeader>
                <ThumbnailWrapper>
                    <StyledThumbnail
                        loader={myLoader}
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
                    <TypographyScale variant="heading6">
                        {title}
                    </TypographyScale>
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
            <HorizontalRule spacing="none" strokeWeight="medium" />
            <TypographyScale variant="body3">
                {contentDate.toDateString()}
            </TypographyScale>
        </FeaturedCardWrapper>
    );
};

export default FeatureCard;
