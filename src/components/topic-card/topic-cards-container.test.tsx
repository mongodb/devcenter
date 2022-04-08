import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TopicCardsContainer } from '.';
import { ITopicCard } from './types';

const PRODUCT_NAME = 'Atlas';
const TOPICS: ITopicCard[] = [
    {
        name: 'Aggregation',
        href: '#',
        icon: 'atlas_search',
    },
    {
        name: 'Atlas Search',
        href: '#',
        icon: 'atlas_search',
    },
    {
        name: 'Charts',
        href: '#',
        icon: 'atlas_search',
    },
    {
        name: 'Other Topic Here',
        href: '#',
        icon: 'atlas_search',
    },
];

test('renders topic cards with title', async () => {
    render(<TopicCardsContainer topics={TOPICS} title={PRODUCT_NAME} />);
    TOPICS.forEach(({ name }) => {
        expect(screen.getByText(name)).toBeInTheDocument();
    });
});
