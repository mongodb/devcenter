export interface Author {
    name: string;
    image?: {
        src?: string;
        alt?: string;
    };
    url: string;
}
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
