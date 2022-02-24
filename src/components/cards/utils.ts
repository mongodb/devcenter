import { ImageLoaderProps } from 'next/dist/client/image';

export const thumbnailLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `${src}?w=${width}&q=${quality || 75}`;
};
