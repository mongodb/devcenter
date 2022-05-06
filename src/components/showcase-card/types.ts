export interface ShowcaseCardItem {
    titleLink: {
        text: string;
        url: string;
    };
    imageString: string;
    description?: string;
    image?: JSX.Element;
    cta?: {
        text: string;
        url: string;
    };
    links?: {
        text: string;
        url: string;
    }[];
}

export interface ShowcaseCardProps {
    alignment: 'left' | 'center';
    titleLink: {
        text: string;
        url: string;
    };
    description?: string;
    image?: JSX.Element;
    cta?: {
        text: string;
        url: string;
    };
    className?: string;
    links?: {
        text: string;
        url: string;
    }[];
}
