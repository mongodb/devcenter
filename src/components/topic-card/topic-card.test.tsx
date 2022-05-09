import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopicCard from '.';
import { BrandedIcon } from '@mdb/flora';

const TOPIC_NAME = 'Atlas Search';
const ICON_NAME = 'atlas_search';

test('renders topic card', async () => {
    render(
        <TopicCard
            title={TOPIC_NAME}
            icon={<BrandedIcon name={ICON_NAME} />}
            href="#"
        />
    );

    const topicText = screen.getByText(TOPIC_NAME);
    expect(topicText).toBeInTheDocument();

    const topicIcon = screen.getByAltText(ICON_NAME);
    expect(topicIcon).toBeInTheDocument;
});
