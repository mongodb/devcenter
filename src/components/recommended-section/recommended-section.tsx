import { TopicCard } from '@mdb/devcenter-components';
import {
    BrandedIcon,
    Button,
    Checkbox,
    EThirdPartyLogoVariant,
    ThirdPartyLogo,
    TypographyScale,
} from '@mdb/flora';
import { Grid } from 'theme-ui';
import theme from '@mdb/flora/theme';

import { h5Styles } from '../../styled/layout';
import { ContentItem } from '../../interfaces/content-item';
import { MetaInfo } from '../../interfaces/meta-info';
import { iconStyles } from '../topic-cards-container/styles';
import { useCallback, useMemo, useState } from 'react';
import { topicToLogo } from '../../utils/logo';

interface RecommendedSectionProps {
    topics?: MetaInfo[];
    content?: ContentItem[];
    onTopicsSaved: (topics: MetaInfo[], digestChecked: boolean) => void;
    onTopicSelected?: (topic: MetaInfo) => void;
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
    topics = [],
    content = [],
    showFooter,
    onTopicSelected = () => undefined,
    onTopicsSaved,
}) => {
    const truncatedTopics = useMemo(
        () => (topics.length > 10 ? topics.slice(0, 10) : topics),
        [topics]
    );
    const truncatedContent = useMemo(
        () => (content.length > 4 ? content.slice(0, 4) : content),
        [content]
    );

    const [selectedTopics, setSelectedTopics] = useState<MetaInfo[]>([]);
    const topicCardSelected = useCallback(
        (topic: MetaInfo) => () => {
            const index = selectedTopics.findIndex(
                item => item.slug === topic.slug
            );

            if (index === -1) {
                onTopicSelected(topic);
                setSelectedTopics([...selectedTopics, topic]);
            } else {
                const newSelected = [...selectedTopics];
                newSelected.splice(index, 1);
                setSelectedTopics(newSelected);
            }
        },
        [selectedTopics, onTopicSelected]
    );

    const [digestChecked, setDigestChecked] = useState(false);

    const onSaveButtonClick = () => {
        onTopicsSaved(selectedTopics, digestChecked);
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

            {truncatedContent && (
                // TODO
                <div></div>
            )}

            {topics && !truncatedContent.length && (
                <div>
                    <Grid columns={5} gap={16} sx={{ marginBottom: 'inc50' }}>
                        {truncatedTopics.map((topic, i) => {
                            const iconString = topicToLogo(
                                topic.category,
                                topic.tagName
                            );

                            const icon = iconString ? (
                                Object.values(EThirdPartyLogoVariant).includes(
                                    iconString as EThirdPartyLogoVariant
                                ) ? (
                                    <ThirdPartyLogo
                                        sx={iconStyles}
                                        variant={
                                            iconString as EThirdPartyLogoVariant
                                        }
                                    />
                                ) : (
                                    <BrandedIcon
                                        sx={iconStyles}
                                        name={iconString}
                                    />
                                )
                            ) : null;

                            return (
                                <TopicCard
                                    key={i}
                                    title={topic.tagName}
                                    variant="selectable"
                                    onSelect={topicCardSelected(topic)}
                                    selected={selectedTopics.some(
                                        item => item.slug === topic.slug
                                    )}
                                    icon={icon}
                                />
                            );
                        })}
                    </Grid>

                    {showFooter && (
                        <div sx={footerStyles(!!selectedTopics.length)}>
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
