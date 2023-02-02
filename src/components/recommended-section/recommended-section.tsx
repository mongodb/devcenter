import { TypographyScale } from '@mdb/flora';
import theme from '@mdb/flora/theme';

import { h5Styles } from '../../styled/layout';
import { ContentItem } from '../../interfaces/content-item';
import { Tag } from '../../interfaces/tag';
import RecommendedTagSection from './recommended-tag-section';
import RecommendedContentSection from './recommended-content-section';

interface RecommendedSectionProps {
    tags?: Tag[];
    content?: ContentItem[];
    onTagsSaved?: (topics: Tag[], digestChecked: boolean) => void;
    onTagSelected?: (topic: Tag) => void;
    showFooter?: boolean;
}

const recommendedSectionStyles = {
    margin: 'auto',
    maxWidth: theme.sizes.maxWidthDesktop,
    marginBottom: 'section40',
};

const RecommendedSection: React.FunctionComponent<RecommendedSectionProps> = ({
    tags = [],
    content = [],
    showFooter = true,
    onTagSelected = () => undefined,
    onTagsSaved = () => undefined,
}) =>
    !!tags.length || !!content.length ? (
        <div sx={recommendedSectionStyles}>
            <TypographyScale
                variant="heading2"
                customStyles={{
                    ...h5Styles,
                    marginBottom: 'inc20',
                }}
            >
                Recommended for you
            </TypographyScale>

            <TypographyScale
                variant="body1"
                color="default"
                sx={{
                    display: 'block',
                    marginBottom: 'inc50',
                }}
            >
                Select topics to follow for recommended content
            </TypographyScale>

            {!!content.length && (
                <RecommendedContentSection content={content} />
            )}

            {!!tags.length && !content.length && (
                <RecommendedTagSection
                    tags={tags}
                    showFooter={showFooter}
                    onTagsSaved={onTagsSaved}
                    onTagSelected={onTagSelected}
                />
            )}
        </div>
    ) : null;

export default RecommendedSection;
