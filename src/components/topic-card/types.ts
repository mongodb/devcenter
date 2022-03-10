export interface ITopicCard {
    title: string;
    icon: string;
    href: string;
}

export interface TopicCardsContainerProps {
    topics: ITopicCard[];
    title: string;
}
