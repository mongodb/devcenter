import { ContentPiece } from '../../interfaces/content-piece';
import { CardProps, CardVariant } from '../card/types';

export const getCardProps = (
    {
        authors,
        category,
        contentDate,
        description,
        tags,
        title,
        image,
    }: ContentPiece,
    variant: CardVariant
): CardProps => {
    const { alt, url } = image;
    const cardProps: CardProps = {
        authors,
        contentDate,
        description,
        title,
        pillCategory: category,
        tags,
        thumbnail: { alt, size: 'large', url }, // Size is irrelevant here.
        variant,
    };

    return cardProps;
};
