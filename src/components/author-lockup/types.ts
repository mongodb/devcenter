import { Author } from '../../interfaces/author';
export interface AuthorLockupProps {
    className?: string;
    authors: Author[];
    title?: string;
    expandedNames?: boolean;
    clickableLinks?: boolean;
    size?: 'small' | 'large';
}

export interface AuthorImageProps {
    author: Author;
    className?: string;
    size: 'small' | 'large';
}
