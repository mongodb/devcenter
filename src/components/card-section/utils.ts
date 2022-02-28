import { PillCategory } from '../../types/pill-category';
import { Image, ContentPiece } from '../../interfaces/content-piece';
import { Thumbnail } from '../../interfaces/thumbnail';
import { SharedCardProps } from '../cards/sharedcard/types';

export const getCardProps = ({
    category,
    contentDate,
    description,
    title,
    image,
    slug,
}: ContentPiece): SharedCardProps => {
    const thumbnail = getThumbnail(category, image);
    const cardProps: SharedCardProps = {
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

const getThumbnail = (category: PillCategory, { url }: Image) => {
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
    console.log(category, size);
    return {
        size,
        url,
    } as Thumbnail;
};
