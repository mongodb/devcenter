export interface ITopicCard {
    name: string;
    icon: string;
    href: string;
}

export interface TopicCardsContainerProps {
    topics: ITopicCard[];
    title: string;
    className?: string;
}
