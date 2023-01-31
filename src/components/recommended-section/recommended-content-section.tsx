import { Grid } from 'theme-ui';
import Card, { getCardProps } from '../card';
import { ContentItem } from '../../interfaces/content-item';
import AdditionalContentPlaceholder from './additional-content-placeholder';

interface RecommendedSectionProps {
    content?: ContentItem[];
}

const placeholderStyles = (contentLength: number) => {
    const gridColumnValues = [
        ['auto', null, null, '2 / span 2', null, '2 / span 3'],
        ['auto', null, '1 / span 2', 'auto', null, '3 / span 2'],
        'auto',
    ];

    return { gridColumn: gridColumnValues[contentLength - 1] };
};

const RecommendedContentSection: React.FunctionComponent<
    RecommendedSectionProps
> = ({ content = [] }) => {
    const totalItems = Math.min(content.length + 1, 4);

    return (
        <Grid
            // If full 4 items (incl placeholder), never show a 3 column layout
            columns={[1, null, 2, totalItems === 4 ? 2 : 3, null, 4]}
            gap="inc30"
            sx={{
                overflow: 'visible',
            }}
        >
            {content.map((item, i) => (
                <div key={i} data-testid="recommended-content-item">
                    <Card
                        key={i}
                        sx={{
                            height: '100%',
                        }}
                        {...getCardProps(item, 'medium')}
                    />
                </div>
            ))}

            {content.length < 4 && (
                <AdditionalContentPlaceholder
                    extraStyles={placeholderStyles(content.length)}
                />
            )}
        </Grid>
    );
};

export default RecommendedContentSection;
