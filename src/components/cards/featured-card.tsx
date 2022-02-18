import React from 'react';
import { Thumbnail } from '../../interfaces/thumbnail';
import { PillCategory } from '../../types/pill-category';
import { HorizontalRule, Tag, TypographyScale } from '@mdb/flora';
import {
    FeaturedCardWrapper,
    ThumbnailImage,
    CardHeader,
    CardFooter,
    ContentWrapper,
    TagWrapper,
    StyledPill,
} from '../../styled/feature-card';

//It will consume prop support for no thumbnail, large-medium-small thumbnail, pill, header, paragraph, a footer with date
interface IProps {
    authors?: string[];
    contentDate: Date;
    description?: string;
    title: string;
    pillCategory: PillCategory;
    tags?: string[];
    thumbnail?: Thumbnail;
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
                <ThumbnailImage loading="lazy" src={thumbnail?.url} />
                <ContentWrapper>
                    <StyledPill
                        pillCategory={pillCategory}
                        variant="identifier"
                        text={pillCategory}
                        size="small"
                    />
                    <TypographyScale variant="heading5">
                        {title}
                    </TypographyScale>
                    <TypographyScale variant="body2">
                        {description}
                    </TypographyScale>
                    <TagWrapper>
                        {tags?.map(tag => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                    </TagWrapper>
                </ContentWrapper>
            </CardHeader>
            <CardFooter>
                <HorizontalRule spacing="none" strokeWeight="medium" />
            </CardFooter>
        </FeaturedCardWrapper>
    );
};

export default FeatureCard;
