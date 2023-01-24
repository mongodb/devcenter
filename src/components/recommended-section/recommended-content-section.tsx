import { Grid } from 'theme-ui';
import Card, { getCardProps } from '../card';
import { ContentItem } from '../../interfaces/content-item';
import AdditionalContentPlaceholder from './additional-content-placeholder';
import { placeholderStyles } from './styles';

interface RecommendedSectionProps {
    content?: ContentItem[];
    onSeeTopics: () => void;
}

const RecommendedContentSection: React.FunctionComponent<
    RecommendedSectionProps
> = ({ content = [], onSeeTopics }) => {
    const totalItems = Math.min(content.length + 1, 4);

    return (
        <Grid
            // If full 4 items (incl placeholder), never show a 3 column layout
            columns={[1, null, 2, totalItems === 4 ? 2 : 3, null, 4]}
            gap="inc30"
            sx={{
                overflow: 'visible',
                flexBasis: '100%',
                order: 1,
                marginBottom: ['inc30', null, null, 0],
            }}
        >
            {content.map((item, i) => (
                <Card
                    key={i}
                    sx={{
                        height: '100%',
                    }}
                    {...getCardProps(item, 'related')}
                />
            ))}

            {content.length < 4 && (
                <AdditionalContentPlaceholder
                    extraStyles={placeholderStyles(content.length)}
                    onSeeTopics={onSeeTopics}
                />
            )}
        </Grid>
    );
};

export default RecommendedContentSection;
