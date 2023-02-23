import { Link, TypographyScale } from '@mdb/flora';

import { Tag } from '../../interfaces/tag';
import RecommendedTagSection from './recommended-tag-section';
import RecommendedContentSection from './recommended-content-section';
import { useModalContext } from '../../contexts/modal';
import { ScrollPersonalizationModal } from '../modal/personalization';
import { useCallback, useState } from 'react';
import {
    followTopicsArrowStyles,
    recommendedSectionHeadingStyles,
    recommendedSectionStyles,
    recommendedSectionSubheadingStyles,
} from './styles';
import { RecommendedContentData } from '../../hooks/personalization';
import { Notification } from '../notification';

interface RecommendedSectionProps {
    tags?: Tag[];
    followedTags?: Tag[];
    content?: RecommendedContentData;
    onTagsSaved?: (tags: Tag[], digestChecked: boolean) => void;
    onTagSelected?: (tag: Tag, allSelectedTags: Tag[]) => void;
    showFooter?: boolean;
    hasContentError?: boolean;
}

const RecommendedSection: React.FunctionComponent<RecommendedSectionProps> = ({
    tags = [],
    followedTags = [],
    content: { contentItems = [] } = {},
    content,
    showFooter = true,
    hasContentError = false,
    onTagsSaved = () => undefined,
}) => {
    const { openModal } = useModalContext();
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const openPersonalizationModal = useCallback(() => {
        openModal(
            <ScrollPersonalizationModal
                title="What topics are you interested in?"
                subtitle="Follow topics for personalized recommendations"
                existingSelections={
                    followedTags.length ? followedTags : selectedTags
                }
            />,
            { hideCloseBtn: true }
        );
    }, [openModal, followedTags, selectedTags]);

    const onTagClick = useCallback(
        (tag: Tag) => {
            const index = selectedTags.findIndex(
                selected => selected.slug === tag.slug
            );

            if (index === -1) {
                setSelectedTags([...selectedTags, tag]);
            } else {
                setSelectedTags(selectedTags.filter((_, i) => i !== index));
            }
        },
        [selectedTags]
    );

    return !!tags.length || !!contentItems.length || !!hasContentError ? (
        <div sx={recommendedSectionStyles}>
            <TypographyScale
                variant="heading2"
                customStyles={recommendedSectionHeadingStyles}
            >
                Recommended for you
            </TypographyScale>

            <Link
                onClick={openPersonalizationModal}
                linkIcon="arrow"
                linkIconDisableExpand
                customStyles={followTopicsArrowStyles}
            >
                {contentItems.length
                    ? 'Follow More Topics'
                    : 'View All Topics to Follow'}
            </Link>
            {hasContentError ? (
                <div sx={{ flexBasis: '100%', order: 1 }}>
                    <Notification
                        customStyles={{ width: 'fit-content' }}
                        message="An error occurred while fetching recommended content. Please try refreshing the page."
                        variant="WARN"
                    />
                </div>
            ) : (
                <>
                    <TypographyScale
                        variant="body1"
                        color="default"
                        sx={recommendedSectionSubheadingStyles}
                    >
                        Select topics to follow for recommended content
                    </TypographyScale>
                    {!!contentItems.length && (
                        <RecommendedContentSection
                            content={content}
                            onSeeTopics={openPersonalizationModal}
                        />
                    )}

                    {!!tags.length && !contentItems.length && (
                        <RecommendedTagSection
                            tags={tags}
                            selectedTags={selectedTags}
                            showFooter={showFooter}
                            onTagsSaved={onTagsSaved}
                            onTagClick={onTagClick}
                        />
                    )}
                </>
            )}
        </div>
    ) : null;
};

export default RecommendedSection;
