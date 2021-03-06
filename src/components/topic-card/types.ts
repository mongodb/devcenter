export interface ITopicCard {
    title: string;
    icon: string;
    href: string;
}

export interface TopicCardProps {
    title: string;
    icon: JSX.Element | null;
    href: string;
}

export interface TopicCardsContainerProps {
    topics: TopicCardProps[];
    title: string;
    className?: string;
}
