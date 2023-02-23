import { TopicCard } from '@mdb/devcenter-components';
import { Grid } from 'theme-ui';
import { Tag } from '../../interfaces/tag';
import { useCallback, useState } from 'react';
import { Button, Checkbox } from '@mdb/flora';
import { tagToTopic } from '../../utils/tag-to-topic';
import {
    digestCheckboxStyles,
    topicSaveButtonStyles,
    topicSaveButtonWrapperStyles,
    footerStyles,
} from './styles';

interface RecommendedTagSectionProps {
    tags?: Tag[];
    selectedTags?: Tag[];
    showFooter: boolean;
    onTagsSaved?: (tags: Tag[], digestChecked: boolean) => void;
    onTagClick?: (tag: Tag) => void;
}

const RecommendedTagSection: React.FunctionComponent<
    RecommendedTagSectionProps
> = ({
    tags = [],
    selectedTags = [],
    showFooter,
    onTagClick = () => undefined,
    onTagsSaved = () => undefined,
}) => {
    const [digestChecked, setDigestChecked] = useState(false);

    const onSaveButtonClick = useCallback(() => {
        onTagsSaved(selectedTags, digestChecked);
    }, [selectedTags, digestChecked, onTagsSaved]);

    return (
        <>
            <Grid
                columns={[2, null, 4]}
                gap={16}
                sx={{ marginBottom: 'inc50', flexBasis: '100%', order: 1 }}
            >
                {tags.map(tag => {
                    const { title, icon } = tagToTopic({
                        name: tag.name,
                        type: tag.type,
                        slug: '',
                    } as Tag);

                    return (
                        <div key={title} data-testid="recommended-topic-tag">
                            <TopicCard
                                title={title}
                                variant="selectable"
                                onSelect={() => onTagClick(tag)}
                                selected={selectedTags.some(
                                    selected => selected.slug === tag.slug
                                )}
                                icon={icon}
                            />
                        </div>
                    );
                })}
            </Grid>

            {showFooter && (
                <div sx={footerStyles(!!selectedTags.length)}>
                    <Checkbox
                        customStyles={digestCheckboxStyles}
                        onToggle={setDigestChecked}
                        label="Receive a monthly digest with new content based on topics you follow"
                        name="digest-checkbox"
                        checked
                    />

                    <div sx={topicSaveButtonWrapperStyles}>
                        <Button
                            customStyles={topicSaveButtonStyles}
                            onClick={onSaveButtonClick}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RecommendedTagSection;
