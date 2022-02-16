import React from 'react';
import { Thumbnail } from '../../interfaces/thumnail';
import { PillCategory } from '../../types/pill-category';
import { HorizontalRule, Pill, TypographyScale } from '@mdb/flora';
import {
    SharedCardWrapper,
    ThumbnailImage,
    CardHeader,
    CardFooter,
    ContentWrapper,
} from '../../styled/shared-card';

//It will consume prop support for no thumbnail, large-medium-small thumbnail, pill, header, paragraph, a footer with date
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
            <CardHeader>
                {thumbnail && (
                    <ThumbnailImage
                        size={thumbnail?.size ? thumbnail.size : 'medium'}
                        loading="lazy"
                        src={thumbnail?.url}
                    />
                )}
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
                    {description && (
                        <TypographyScale variant="body2">
                            {description}
                        </TypographyScale>
                    )}
                </ContentWrapper>
            </CardHeader>
            <CardFooter>
                <HorizontalRule spacing="none" strokeWeight="medium" />
            </CardFooter>
        </SharedCardWrapper>
    );
};

export default SharedCard;
