import { TopicCard } from '@mdb/devcenter-components';
import { Button, Checkbox, TypographyScale } from '@mdb/flora';
import { Grid } from 'theme-ui';
import theme from '@mdb/flora/theme';

import { h5Styles } from '../../styled/layout';
import { ContentItem } from '../../interfaces/content-item';
import { useCallback, useState } from 'react';
import { tagToTopic } from '../../utils/tag-to-topic';
import { Tag } from '../../interfaces/tag';

interface RecommendedSectionProps {
    tags?: Tag[];
    content?: ContentItem[];
    onTagsSaved?: (topics: Tag[], digestChecked: boolean) => void;
    onTagSelected?: (topic: Tag) => void;
    showFooter: boolean;
}

const recommendedSectionStyles = {
    margin: 'auto',
    maxWidth: theme.sizes.maxWidthDesktop,
    marginBottom: 'section40',
};

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

const RecommendedSection: React.FunctionComponent<RecommendedSectionProps> = ({
    tags = [],
    content = [],
    showFooter,
    onTagSelected = () => undefined,
    onTagsSaved = () => undefined,
}) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
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

    const [digestChecked, setDigestChecked] = useState(false);

    const onSaveButtonClick = () => {
        onTagsSaved(selectedTags, digestChecked);
    };

    return (
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

            {content && (
                // TODO
                <div></div>
            )}

            {tags && !content.length && (
                <div>
                    <Grid columns={5} gap={16} sx={{ marginBottom: 'inc50' }}>
                        {tags.map(tag => {
                            const { title, icon } = tagToTopic(tag);

                            return (
                                <TopicCard
                                    key={title}
                                    title={title}
                                    variant="selectable"
                                    onSelect={topicCardSelected(tag)}
                                    selected={selectedTags.some(
                                        selected => selected.slug === tag.slug
                                    )}
                                    icon={icon}
                                />
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
            )}
        </div>
    );
};

export default RecommendedSection;
