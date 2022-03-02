import { PillCategory } from '../../types/pill-category';
import { Image, ContentPiece } from '../../interfaces/content-piece';
import { Thumbnail } from '../../interfaces/thumbnail';
import { FeaturedMediumCardProps } from '../cards/featured-medium/types';
import { FeaturedCardProps } from '../cards/featured-large/types';

export const getCardProps = (
    { category, contentDate, description, title, image }: ContentPiece,
    omitThumbnail: boolean = false
): FeaturedMediumCardProps => {
    const thumbnail = omitThumbnail ? undefined : getThumbnail(category, image);
    const cardProps: FeaturedMediumCardProps = {
        contentDate,
        title,
        thumbnail,
        pillCategory: category,
    };
    if (category === 'Demo App') {
        cardProps.description = description;
    }
    return cardProps;
};

const getThumbnail = (category: PillCategory, { url, alt }: Image) => {
    if (category === 'Tutorial') {
        return undefined;
    }

    let size;
    switch (category) {
        case 'Demo App':
            size = 'medium';
            break;
        case 'Video':
            size = 'large';
            break;
        default:
            size = 'small';
    }
    return {
        size,
        url,
        alt,
    } as Thumbnail;
};

export const getFeaturedCardProps = ({
    authors,
    category,
    contentDate,
    description,
    tags,
    title,
    image,
}: ContentPiece): FeaturedCardProps => {
    const { alt, url } = image;
    const cardProps: FeaturedCardProps = {
        authors,
        contentDate,
        description,
        title,
        pillCategory: category,
        tags,
        thumbnail: { alt, size: 'large', url }, // Size is irrelevant here.
    };

    return cardProps;
};
