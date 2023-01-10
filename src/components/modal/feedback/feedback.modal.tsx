import axios from 'axios';
import { useState } from 'react';

import CheckboxFeedback from './dialogs/checkbox-feedback';
import TextFeedback from './dialogs/text-feedback';
import ThankYou from '../shared/thank-you';

import { getURLPath } from '../../../utils/format-url-path';

import {
    FeedbackModalProps,
    ICheckboxFeedback,
    ITextFeedback,
    FEEDBACK_MODAL_STAGE,
} from './types';

const updateFeedback = (body: ITextFeedback | ICheckboxFeedback) =>
    axios.put(getURLPath('/api/updateFeedback') as string, body, {
        headers: { Origin: origin },
    });

const FeedbackModal: React.FunctionComponent<FeedbackModalProps> = ({
    initialStage,
    stars,
    contentCategory,
    feedbackId,
}) => {
    const [modalState, setModalStage] = useState(initialStage);

    const onTextSubmit = (comment: string, email: string) => {
        updateFeedback({
            _id: feedbackId,
            comment,
            email,
        });
        setModalStage(FEEDBACK_MODAL_STAGE.THANKS);
    };

    const onCheckboxSubmit = (checkboxComments: string[]) => {
        updateFeedback({
            _id: feedbackId,
            checkboxComments,
        });
        setModalStage(FEEDBACK_MODAL_STAGE.TEXT);
    };

    const renderModal = (type: FEEDBACK_MODAL_STAGE) => {
        const modals = {
            [FEEDBACK_MODAL_STAGE.CHECKBOX]: (
                <CheckboxFeedback
                    stars={stars}
                    onContinue={onCheckboxSubmit}
                    contentCategory={contentCategory}
                />
            ),
            [FEEDBACK_MODAL_STAGE.TEXT]: (
                <TextFeedback
                    stars={stars}
                    onContinue={onTextSubmit}
                    contentCategory={contentCategory}
                />
            ),
            [FEEDBACK_MODAL_STAGE.THANKS]: (
                <ThankYou
                    title="We appreciate your feedback."
                    // TODO: Double check this comment about Flora
                    subtitle={
                        <>
                            We&apos;d love to chat with you and answer your
                            questions in our online{' '}
                            {/* The Flora Link component is not designed for inline use (it has an underline that increases the box size when inline). */}
                            <a
                                href="https://www.mongodb.com/community"
                                target="_blank"
                                rel="noreferrer"
                                sx={{ color: 'blue60' }}
                            >
                                MongoDB Community
                            </a>
                            . It&apos;s where people who develop MongoDB hang
                            out with people who develop with MongoDB.
                        </>
                    }
                    titleStyles={{ display: 'block', marginBottom: 'inc20' }}
                    subtitleStyles={{ display: 'block', marginBottom: 'inc50' }}
                />
            ),
        };

        return modals[type] ?? <></>;
    };

    return <form sx={{ width: '100%' }}>{renderModal(modalState)}</form>;
};

export default FeedbackModal;
