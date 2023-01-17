import { Fragment, useState } from 'react';
import { Grid } from 'theme-ui';
import { Button, TypographyScale } from '@mdb/flora';

import { useModalContext } from '../../../contexts/modal';

import { PersonlizationTagType } from './types';
import {
    initializePersonalizationConfig,
    submitPersonalizationSelections,
} from './utils';

import styles from './styles';

const ScrollPersonalizationModal = () => {
    const tagConfig = initializePersonalizationConfig(false);

    const { closeModal } = useModalContext();
    const [selections, setSelections] = useState<Array<PersonlizationTagType>>(
        []
    );

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
            <TypographyScale variant="heading5" sx={styles.scroll_heading}>
                You&apos;re now following this topic. <br /> Interested in
                following other topics?
            </TypographyScale>
            <div sx={styles.tags}>
                {tagConfig.map(({ title, tags }) => {
                    return (
                        <Fragment key={title}>
                            <TypographyScale variant="heading6">
                                {title}
                            </TypographyScale>
                            <Grid columns={[3]} sx={styles.scroll_tagSection}>
                                {tags.map(tag => {
                                    const isSelected = !!selections.find(
                                        prevTags =>
                                            prevTags.tagName === tag.tagName
                                    );
                                    // TODO: Temp component until selectable card is ready, remove all of return below
                                    return (
                                        <button
                                            key={tag.tagName}
                                            type="button"
                                            value={tag.tagName}
                                            onClick={() =>
                                                onSelectionToggle(
                                                    tag,
                                                    isSelected
                                                )
                                            }
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
                        </Fragment>
                    );
                })}
            </div>
            <div sx={styles.controls}>
                <Button onClick={onCompletion}>Done</Button>
            </div>
        </div>
    );
};

export default ScrollPersonalizationModal;
