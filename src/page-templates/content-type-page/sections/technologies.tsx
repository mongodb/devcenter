import { TopicCardsContainer } from '../../../components/topic-cards-container';
import { Tag } from '../../../interfaces/tag';
import { tagToTopic } from '../../../utils/tag-to-topic';

interface TechnologiesSectionProps {
    title: string;
    items: Tag[];
}

const TechnologiesSection: React.FunctionComponent<
    TechnologiesSectionProps
> = ({ title, items }) => {
    const topicItems = items.map(tagToTopic);
    return (
        <div
            sx={{
                marginBottom: ['section20', null, null, 'section40'],
            }}
        >
            <div
                sx={{
                    display: 'flex',
                    gap: ['inc30', null, 'inc40'],
                }}
            >
                <TopicCardsContainer
                    topics={topicItems}
                    title={title}
                    sx={{ width: '100%' }}
                />
            </div>
        </div>
    );
};

export default TechnologiesSection;
