import { Link, TypographyScale } from '@mdb/flora';
import theme from '@mdb/flora/theme';

import { h5Styles } from '../../styled/layout';
import { ContentItem } from '../../interfaces/content-item';
import { Tag } from '../../interfaces/tag';
import RecommendedTagSection from './recommended-tag-section';
import RecommendedContentSection from './recommended-content-section';
import { useModalContext } from '../../contexts/modal';
import { ScrollPersonalizationModal } from '../modal/personalization';
import { useCallback, useState } from 'react';

interface RecommendedSectionProps {
    tags?: Tag[];
    content?: ContentItem[];
    onTagsSaved?: (tags: Tag[], digestChecked: boolean) => void;
    onTagSelected?: (tag: Tag, allSelectedTags: Tag[]) => void;
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
}) => {
    const { openModal } = useModalContext();
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const onViewAllTopics = useCallback(() => {
        openModal(
            <ScrollPersonalizationModal
                title="What topics are you interested in?"
                subtitle="Follow topics for personalized recommendations"
                existingSelections={selectedTags}
            />,
            { hideCloseBtn: true }
        );
    }, [openModal, selectedTags]);

    return !!tags.length || !!content.length ? (
        <div sx={recommendedSectionStyles}>
            <div
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TypographyScale
                    variant="heading2"
                    customStyles={{
                        ...h5Styles,
                        marginBottom: 'inc20',
                    }}
                >
                    Recommended for you
                </TypographyScale>

                <Link
                    onClick={onViewAllTopics}
                    linkIcon="arrow"
                    linkIconDisableExpand={true}
                >
                    {content.length
                        ? 'Follow More Topics'
                        : 'View All Topics to Follow'}
                </Link>
            </div>
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
                <RecommendedContentSection
                    content={content}
                    onSeeTopics={onViewAllTopics}
                />
            )}

            {!!tags.length && !content.length && (
                <RecommendedTagSection
                    tags={tags}
                    showFooter={showFooter}
                    onTagsSaved={onTagsSaved}
                    onTagSelected={(tag: Tag, allSelectedTags: Tag[]) => {
                        onTagSelected(tag, allSelectedTags);
                        setSelectedTags(allSelectedTags);
                    }}
                />
            )}
        </div>
    ) : null;
};

export default RecommendedSection;
