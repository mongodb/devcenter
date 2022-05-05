export interface AuthorLockUp {
    name: string;
    image?: {
        src?: string;
        alt?: string;
    };
    url: string;
}
export interface AuthorLockupProps {
    className?: string;
    authors: AuthorLockUp[];
    title?: string;
    expandedNames?: boolean;
    clickableLinks?: boolean;
    size?: 'small' | 'large';
}

export interface AuthorImageProps {
    author: AuthorLockUp;
    className?: string;
    size: 'small' | 'large';
}
