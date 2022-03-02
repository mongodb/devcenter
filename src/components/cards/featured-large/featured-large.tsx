import React from 'react';
import Image from 'next/image';
import { TypographyScale, Pill, Tag, HorizontalRule } from '@mdb/flora';

import {
    cardHeaderStyles,
    thumbnailWrapperStyles,
    tagWrapperStyles,
    descriptionStyles,
    tagStyles,
} from './styles';
import { cardWrapperStyles, pillStyles } from '../styles';
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

const FeaturedLarge: React.FunctionComponent<FeaturedCardProps> = ({
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
        <div sx={cardWrapperStyles} className={className}>
            <div sx={cardHeaderStyles(listView)}>
                {thumbnail && (
                    <div sx={thumbnailWrapperStyles(pillCategory, listView)}>
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
                    <TypographyScale variant="body2" sx={descriptionStyles}>
                        {description}
                    </TypographyScale>
                    <div sx={tagWrapperStyles}>
                        {tags?.map(tag => (
                            <Tag key={tag} variant="small" sx={tagStyles}>
                                {tag}
                            </Tag>
                        ))}
                    </div>
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

export default FeaturedLarge;
