import { Fragment, useState } from 'react';
import { Grid } from 'theme-ui';
import { Button, TypographyScale, Checkbox } from '@mdb/flora';
import { TopicCard } from '@mdb/devcenter-components';
import { useModalContext } from '../../../../contexts/modal';
import { useNotificationContext } from '../../../../contexts/notification';
import tagConfig from '../../../../service/get-personalization-modal-config.preval';
import { Tag } from '../../../../interfaces/tag';
import { ScrollModalProps } from '../types';
import { submitPersonalizationSelections } from '../utils';
import { tagToTopic } from '../../../../utils/tag-to-topic';

import styles from '../styles';

const ScrollPersonalizationModal = ({
    title,
    subtitle = '',
    existingSelections = [],
}: ScrollModalProps) => {
    const { closeModal } = useModalContext();
    const { setNotification } = useNotificationContext();

    const [isOptedIn, setIsOptedIn] = useState(true);
    const [selections, setSelections] =
        useState<Array<Tag>>(existingSelections);

    const onCheckboxToggle = (isChecked: boolean) => setIsOptedIn(isChecked);

    const onSelectionToggle = (tag: Tag, wasSelected: boolean) => {
        if (wasSelected) {
            return setSelections(currSelections =>
                currSelections.filter(sel => sel.name !== tag.name)
            );
        }

        return setSelections(currSelections => [...currSelections, tag]);
    };

    const onCompletion = async () => {
        closeModal();

        const { error } = await submitPersonalizationSelections({
            followedTags: selections,
            emailPreference: isOptedIn,
        });

        if (!error) {
            setNotification({
                message: 'Successfully saved your preferences',
                variant: 'SUCCESS',
            });
        } else {
            setNotification({
                message:
                    'Your request could not be completed at this time. Please try again.',
                variant: 'WARN',
            });
        }
    };

    return (
        <div sx={styles.wrapper}>
            <TypographyScale
                variant="heading5"
                sx={{ ...(!subtitle && styles.scrollHeader) }}
            >
                {title}
            </TypographyScale>
            {subtitle && (
                <TypographyScale variant="body2" sx={styles.subtitle}>
                    {subtitle}
                </TypographyScale>
            )}
            <div sx={styles.tagsWrapper}>
                {tagConfig.map(({ title, tags }) => (
                    <Fragment key={title}>
                        <TypographyScale
                            variant="heading6"
                            sx={styles.categoryHeader}
                        >
                            {title}
                        </TypographyScale>
                        <Grid
                            columns={[2, null, null, 3]}
                            sx={styles.scrollTagSection}
                            data-testid="scroll-modal-tags"
                        >
                            {tags.map(tag => {
                                const isSelected = !!selections.find(
                                    prevTags => prevTags.name === tag.name
                                );
                                // only pass name and type to prevent the icons becoming active href's
                                const { icon, title } = tagToTopic({
                                    name: tag.name,
                                    type: tag.type,
                                } as Tag);
                                return (
                                    <TopicCard
                                        key={title}
                                        icon={icon}
                                        title={title}
                                        sx={styles.tag}
                                        variant="selectable"
                                        selected={isSelected}
                                        onSelect={() =>
                                            onSelectionToggle(tag, isSelected)
                                        }
                                    />
                                );
                            })}
                        </Grid>
                    </Fragment>
                ))}
            </div>
            <div sx={styles.controls}>
                <Checkbox
                    checked={isOptedIn}
                    onToggle={onCheckboxToggle}
                    name="scroll-modal-checkbox"
                    label="Receive a monthly digest with new content based on topics you follow"
                    sx={styles.checkbox}
                />
                <Button onClick={onCompletion}>Done</Button>
            </div>
        </div>
    );
};

export default ScrollPersonalizationModal;
