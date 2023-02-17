import { Grid } from 'theme-ui';
import Card, { getCardProps } from '../card';
import AdditionalContentPlaceholder from './additional-content-placeholder';
import {
    placeholderStyles,
    recommendedContentGridStyles,
    recommendedContentTaglineStyles,
} from './styles';
import { RecommendedContentData } from '../../hooks/personalization';
import { TypographyScale } from '@mdb/flora';
import { ContentItem } from '../../interfaces/content-item';
import { Tag } from '../../interfaces/tag';

interface RecommendedSectionProps {
    content?: RecommendedContentData;
    onSeeTopics: () => void;
}

const generateTagString = (item: ContentItem, followedTags: Tag[]) => {
    const intersection = followedTags.filter(ftag =>
        item.tags.some(tag => tag.slug === ftag.slug)
    );

    // Shouldn't ever happen, but add this here as a failsafe
    if (intersection.length === 0) return '';

    let tagString = intersection[0].name;

    if (intersection.length > 1) {
        tagString += ` and ${intersection.length - 1} other topic`;
        tagString += intersection.length > 2 ? 's' : '';
    }

    return `Because you follow ${tagString}`;
};

const RecommendedContentSection: React.FunctionComponent<
    RecommendedSectionProps
> = ({
    content: { contentItems = [], followedTags = [] } = {},
    onSeeTopics,
}) => {
    const totalItems = Math.min(contentItems.length + 1, 4);

    return (
        <Grid
            // If full 4 items (incl placeholder), never show a 3 column layout
            columns={[1, null, 2, totalItems === 4 ? 2 : 3, null, 4]}
            gap="inc30"
            sx={recommendedContentGridStyles}
        >
            {contentItems.map((item, i) => (
                <div key={i} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Card
                        sx={{ flexGrow: '1' }}
                        {...getCardProps(item, 'related')}
                    />
                    <TypographyScale
                        variant="body3"
                        sx={recommendedContentTaglineStyles}
                    >
                        {generateTagString(item, followedTags)}
                    </TypographyScale>
                </div>
            ))}

            {contentItems.length < 4 && (
                <AdditionalContentPlaceholder
                    extraStyles={placeholderStyles(contentItems.length)}
                    onSeeTopics={onSeeTopics}
                />
            )}
        </Grid>
    );
};

export default RecommendedContentSection;
