import { useState } from 'react';
import { Grid } from 'theme-ui';
import {
    Pill,
    Button,
    Checkbox,
    Pagination,
    TypographyScale,
    ESystemIconNames,
} from '@mdb/flora';
import { useSession } from 'next-auth/react';
import { TopicCard } from '@mdb/devcenter-components';
import { useModalContext } from '../../../../contexts/modal';
import paginationConfig from '../../../../service/get-personalization-modal-config.preval';
import { Tag } from '../../../../interfaces/tag';
import { submitPersonalizationSelections } from '../utils';
import { tagToTopic } from '../../../../utils/tag-to-topic';

import styles from '../styles';

const PaginatedPersonalizationModal = () => {
    const { data: session } = useSession();
    const { closeModal } = useModalContext();

    const [tabIndex, setTabIndex] = useState(0);
    const [isOptedIn, setIsOptedIn] = useState(true);
    const [selections, setSelections] = useState<Array<Tag>>([]);

    // Flora pagination is not zero-based, so need to always subtract 1 from the number in callback
    const onPaginationChange = (newIndex: number) => setTabIndex(newIndex - 1);

    const onCheckboxToggle = (isChecked: boolean) => setIsOptedIn(isChecked);

    const onSelectionToggle = (tag: Tag, wasSelected: boolean) => {
        if (wasSelected) {
            return setSelections(currSelections =>
                currSelections.filter(sel => sel.name !== tag.name)
            );
        }

        return setSelections(currSelections => [...currSelections, tag]);
    };

    const onCompletion = () => {
        submitPersonalizationSelections(
            {
                followedTags: selections,
                emailPreference: isOptedIn,
            },
            session?.userId
        );
        closeModal();
    };

    return (
        <div sx={styles.wrapper}>
            <Pill variant="badge" text="new" sx={styles.badge} />
            <TypographyScale variant="heading5">
                What topics are you interested in?
            </TypographyScale>
            <TypographyScale variant="body2" sx={styles.subtitle}>
                Select topics you&apos;re interested in to receive personalized
                recommendations!
            </TypographyScale>
            <TypographyScale variant="heading6" sx={styles.categoryHeader}>
                {paginationConfig[tabIndex].title}
            </TypographyScale>
            <Grid
                columns={[2, null, null, 3]}
                sx={styles.tagsWrapper}
                data-testid="paginated-modal-tags"
            >
                {paginationConfig[tabIndex]?.tags.map(tag => {
                    const isSelected = !!selections.find(
                        prevTags => prevTags.name === tag.name
                    );
                    const { icon, title } = tagToTopic(tag);
                    return (
                        <TopicCard
                            key={title}
                            icon={icon}
                            title={title}
                            sx={styles.tag}
                            variant="selectable"
                            selected={isSelected}
                            onSelect={() => onSelectionToggle(tag, isSelected)}
                        />
                    );
                })}
            </Grid>
            <div sx={styles.controls}>
                <Checkbox
                    checked={isOptedIn}
                    onToggle={onCheckboxToggle}
                    name="paginated-modal-checkbox"
                    label="Receive a monthly digest with new content based on topics you follow"
                    sx={styles.checkbox}
                />
                {tabIndex < paginationConfig.length - 1 ? (
                    <Button
                        variant="secondary"
                        hasIcon
                        iconPosition="right"
                        iconName={ESystemIconNames.ARROW_RIGHT}
                        onClick={() => setTabIndex(tabIndex + 1)}
                        sx={styles.button}
                    >
                        {paginationConfig[tabIndex + 1].title}
                    </Button>
                ) : (
                    <Button sx={styles.button} onClick={onCompletion}>
                        Done
                    </Button>
                )}
                <Pagination
                    inverse
                    type="dots"
                    currentPage={tabIndex + 1} // Flora pagination is not zero-based
                    pages={paginationConfig.length}
                    onChangePage={onPaginationChange}
                />
            </div>
        </div>
    );
};

export default PaginatedPersonalizationModal;
