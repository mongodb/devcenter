import { ArticleImage } from './image';

type FigureCaptionChild = {
    [k: string]: string;
};

export const Figure = ({
    url,
    alt,
    children,
}: {
    url?: string;
    alt?: string;
    children?: FigureCaptionChild[];
}) => {
    if (!url) {
        return null;
    }
    const caption = children && children[0]['value'];
    return (
        <figure>
            <ArticleImage url={url} alt={alt} />
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
};
