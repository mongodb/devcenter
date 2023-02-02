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
import { ThemeUICSSObject } from 'theme-ui';

interface RecommendedSectionProps {
    tags?: Tag[];
    content?: ContentItem[];
    onTagsSaved?: (tags: Tag[], digestChecked: boolean) => void;
    onTagSelected?: (tag: Tag, allSelectedTags: Tag[]) => void;
    showFooter?: boolean;
}

const recommendedSectionStyles: ThemeUICSSObject = {
    margin: 'auto',
    maxWidth: theme.sizes.maxWidthDesktop,
    marginBottom: 'section40',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
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

    const openPersonalizationModal = useCallback(() => {
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
            <TypographyScale
                variant="heading2"
                customStyles={{
                    ...h5Styles,
                    marginBottom: 'inc20',
                    flexGrow: 1,
                    order: 1,
                }}
            >
                Recommended for you
            </TypographyScale>

            <Link
                onClick={openPersonalizationModal}
                linkIcon="arrow"
                linkIconDisableExpand={true}
                customStyles={{
                    alignSelf: 'flex-end',
                    margin: 'auto 0 auto 0',
                    flexShrink: 1,
                    flexBasis: ['100%', null, null, 'auto'],
                    order: [2, null, null, 1],
                    marginBottom: ['inc30', null, null, 0],
                }}
            >
                {content.length
                    ? 'Follow More Topics'
                    : 'View All Topics to Follow'}
            </Link>
            <TypographyScale
                variant="body1"
                color="default"
                sx={{
                    display: 'block',
                    marginBottom: 'inc50',
                    flexBasis: '100%',
                    order: 1,
                }}
            >
                Select topics to follow for recommended content
            </TypographyScale>

            {!!content.length && (
                <RecommendedContentSection
                    content={content}
                    onSeeTopics={openPersonalizationModal}
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
