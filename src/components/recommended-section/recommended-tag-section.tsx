import { TopicCard } from '@mdb/devcenter-components';
import { Grid } from 'theme-ui';
import { Tag } from '../../interfaces/tag';
import { useCallback, useState } from 'react';
import { Button, Checkbox } from '@mdb/flora';
import { tagToTopic } from '../../utils/tag-to-topic';

const digestCheckboxStyles = {
    display: 'flex',
    marginBottom: 'inc50',
    '& label': {
        margin: 'auto',
    },
};

const topicSaveButtonStyles = {
    display: 'flex',
    width: '100%',
    '& button': {
        margin: 'auto',
    },
};

const topicSaveButtonWrapperStyles = {
    width: '100%',
    display: 'flex',
    '& > div': {
        margin: 'auto',
    },
};

const footerStyles = (show: boolean) => ({
    maxHeight: show ? '106px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.25s ease-in-out',
});

interface RecommendedTagSectionProps {
    tags?: Tag[];
    onTagsSaved?: (topics: Tag[], digestChecked: boolean) => void;
    onTagSelected?: (topic: Tag) => void;
    showFooter: boolean;
}

const RecommendedTagSection: React.FunctionComponent<
    RecommendedTagSectionProps
> = ({
    tags = [],
    onTagSelected = () => undefined,
    onTagsSaved = () => undefined,
    showFooter,
}) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [digestChecked, setDigestChecked] = useState(false);

    const topicCardSelected = useCallback(
        (tag: Tag) => () => {
            const index = selectedTags.findIndex(
                selected => selected.slug === tag.slug
            );

            if (index === -1) {
                onTagSelected(tag);
                setSelectedTags([...selectedTags, tag]);
            } else {
                const newSelected = [...selectedTags];
                newSelected.splice(index, 1);
                setSelectedTags(newSelected);
            }
        },
        [selectedTags, onTagSelected]
    );

    const onSaveButtonClick = useCallback(() => {
        onTagsSaved(selectedTags, digestChecked);
    }, [selectedTags, digestChecked, onTagsSaved]);

    return (
        <div>
            <Grid columns={4} gap={16} sx={{ marginBottom: 'inc50' }}>
                {tags.map(tag => {
                    const { title, icon } = tagToTopic(tag);

                    return (
                        <div key={title} data-testid="recommended-topic-tag">
                            <TopicCard
                                title={title}
                                variant="selectable"
                                onSelect={topicCardSelected(tag)}
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
        </div>
    );
};

export default RecommendedTagSection;
