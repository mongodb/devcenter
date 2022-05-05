import { Image } from './image';

export interface Author {
    name: string;
    image?: Image;
    url?: string;
    bio?: string;
}
