import theme from '@mdb/flora/theme';
import Image from 'next/future/image';

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

    return (
        <Image
            alt={alt || ''}
            src={url}
            width="0"
            height="0"
            sizes={`(max-width: ${theme.sizes.breakpoint.xlarge}) 100vw,
              50vw`}
            style={{ width: '100%', height: 'auto' }}
        />
    );
};
