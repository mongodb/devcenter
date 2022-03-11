import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TopicCardsContainer } from '.';
import { ITopicCard } from './types';

const PRODUCT_NAME = 'Atlas';
const TOPICS: ITopicCard[] = [
    {
        title: 'Aggregation',
        href: '#',
        icon: 'atlas_search',
    },
    {
        title: 'Atlas Search',
        href: '#',
        icon: 'atlas_search',
    },
    {
        title: 'Charts',
        href: '#',
        icon: 'atlas_search',
    },
    {
        title: 'Other Topic Here',
        href: '#',
        icon: 'atlas_search',
    },
];

test('renders topic cards with title', async () => {
    render(<TopicCardsContainer topics={TOPICS} title={PRODUCT_NAME} />);
    TOPICS.forEach(({ title }) => {
        expect(screen.getByText(title)).toBeInTheDocument();
    });
});
