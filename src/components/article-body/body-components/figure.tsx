import { ArticleImage } from './image';

export const Figure = ({
    url,
    alt,
    children,
}: {
    url?: string;
    alt?: string;
    children?: any;
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
