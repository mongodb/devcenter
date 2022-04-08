import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopicCard from '.';

const TOPIC_NAME = 'Atlas Search';
const ICON_NAME = 'atlas_search';

test('renders topic card', async () => {
    render(<TopicCard name={TOPIC_NAME} icon={ICON_NAME} href="#" />);

    const topicText = screen.getByText(TOPIC_NAME);
    expect(topicText).toBeInTheDocument();

    const topicIcon = screen.getByAltText(ICON_NAME);
    expect(topicIcon).toBeInTheDocument;
});
