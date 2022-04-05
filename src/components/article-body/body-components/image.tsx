export const ArticleImage = ({
    url,
    alt,
}: {
    url?: string;
    alt?: string;
    className?: string;
}) => {
    if (!url) {
        return null;
    }
    return <img src={url} alt={alt || ''} />;
};
