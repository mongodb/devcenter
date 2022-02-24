import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TopicCardsContainer } from '.';

const PRODUCT_NAME = 'Atlas';
const TOPIC_NAME = 'Aggregation';

test('renders topic cards with title', async () => {
    render(<TopicCardsContainer topics={[TOPIC_NAME]} name={PRODUCT_NAME} />);

    const title = screen.getByText(TOPIC_NAME);
    expect(title).toBeInTheDocument();

    const topicText = screen.getByText(TOPIC_NAME);
    expect(topicText).toBeInTheDocument();
});
