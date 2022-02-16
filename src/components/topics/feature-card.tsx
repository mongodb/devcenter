import React from 'react';
import { Thumbnail } from '../../interfaces/thumnail';
import { PillCategory } from '../../types/pill-category';
import { HorizontalRule, Pill, Tag, TypographyScale } from '@mdb/flora';
import {
    FeaturedCardWrapper,
    ThumbnailImage,
    CardHeader,
    CardFooter,
    ContentWrapper,
    TagWrapper,
} from '../../styled/feature-card';

//It will consume prop support for no thumbnail, large-medium-small thumbnail, pill, header, paragraph, a footer with date
interface IProps {
    authors?: string[];
    contentDate: Date;
    description?: string;
    header: string;
    pillCategory: PillCategory;
    tags?: string[];
    thumbnail?: Thumbnail;
}

const FeatureCard: React.FunctionComponent<IProps> = ({
    authors,
    contentDate,
    description,
    header,
    pillCategory,
    tags,
    thumbnail,
}: IProps) => {
    return (
        <FeaturedCardWrapper>
            <CardHeader>
                <ThumbnailImage loading="lazy" src={thumbnail?.url} />
                <ContentWrapper>
                    <Pill
                        variant="identifier"
                        text={pillCategory}
                        size="large"
                        color="secondary"
                    />
                    <TypographyScale variant="heading5">
                        {header}
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
