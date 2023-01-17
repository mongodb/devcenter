import { useState } from 'react';
import { Grid } from 'theme-ui';
import {
    Button,
    Pagination,
    TypographyScale,
    ESystemIconNames,
    Pill,
} from '@mdb/flora';

import { useModalContext } from '../../../contexts/modal';

import { PersonlizationTagType } from './types';
import {
    initializePersonalizationConfig,
    submitPersonalizationSelections,
} from './utils';

import styles from './styles';

/* 
    *** Dev Notes for this component ***
    Flora does not treat their pagination with a zero based index, so the starting currentPage prop will always be "1"
    Instead of trying to do wacky logic adding and subtracting the newIndex param in the onChangePage callback and then lining that up with our local state and passing props back to the Pagination component,
    I figured it was simpler to understand by using a "skipIndex" buffer in our config, and then initialzing our [tabIndex] local state to start at "1".
    The skipIndex will not be exposed in the UI because we set the first index to be 1, and we subtract 1 from our pages count prop in <Pagination />
*/
const PaginatedPersonalizationModal = () => {
    const paginationConfig = initializePersonalizationConfig(true);

    const { closeModal } = useModalContext();

    const [tabIndex, setTabIndex] = useState(1);
    const [selections, setSelections] = useState<Array<PersonlizationTagType>>(
        []
    );

    const onPaginationChange = (newIndex: number) => setTabIndex(newIndex);

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
        // do your POST/PUT
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
                    currentPage={tabIndex}
                    pages={paginationConfig.length - 1}
                    onChangePage={onPaginationChange}
                />
            </div>
        </div>
    );
};

export default PaginatedPersonalizationModal;
