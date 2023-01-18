import { useState } from 'react';
import { Grid } from 'theme-ui';
import {
    Button,
    Pagination,
    TypographyScale,
    ESystemIconNames,
    Pill,
} from '@mdb/flora';

import { useModalContext } from '../../../../contexts/modal';

import { PersonlizationTagType } from '../types';
import {
    initializePersonalizationConfig,
    submitPersonalizationSelections,
} from '../utils';

import styles from '../styles';

const PaginatedPersonalizationModal = () => {
    const paginationConfig = initializePersonalizationConfig();

    const { closeModal } = useModalContext();

    const [tabIndex, setTabIndex] = useState(0);
    const [selections, setSelections] = useState<Array<PersonlizationTagType>>(
        []
    );

    // Flora pagination is not zero-based, so need to always subtract 1 from the number in callback
    const onPaginationChange = (newIndex: number) => setTabIndex(newIndex - 1);

    const onSelectionToggle = (
        tag: PersonlizationTagType,
        wasSelected: boolean
    ) => {
        if (wasSelected) {
            return setSelections(currSelections =>
                currSelections.filter(sel => sel.tagName !== tag.tagName)
            );
        }

        return setSelections(currSelections => [...currSelections, tag]);
    };

    const onCompletion = () => {
        submitPersonalizationSelections(selections);
        closeModal();
    };

    return (
        <div sx={styles.wrapper}>
            <Pill variant="badge" text="New" sx={styles.paginated_badge} />
            <TypographyScale variant="heading5">
                What topics are you interested in?
            </TypographyScale>
            <TypographyScale variant="body2" sx={styles.paginated_subtitle}>
                Select topics you&apos;re interested in to receive personalized
                recommendations!
            </TypographyScale>
            <TypographyScale variant="heading6">
                {paginationConfig[tabIndex].title}
            </TypographyScale>
            <Grid columns={[3]} sx={styles.tags}>
                {paginationConfig[tabIndex]?.tags.map(tag => {
                    const isSelected = !!selections.find(
                        prevTags => prevTags.tagName === tag.tagName
                    );
                    // TODO: Temp component until selectable card is ready, remove all of return below
                    return (
                        <button
                            key={tag.tagName}
                            type="button"
                            value={tag.tagName}
                            onClick={() => onSelectionToggle(tag, isSelected)}
                            sx={{
                                background: 'transparent',
                                border: '1px solid black',
                                borderRadius: '8px',
                                padding: '16px 32px',
                                marginTop: '16px',
                                marginRight: '16px',
                                ...(isSelected && {
                                    background: 'lightblue',
                                }),
                            }}
                        >
                            {tag.tagName}
                        </button>
                    );
                })}
            </Grid>
            <div sx={styles.controls}>
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
