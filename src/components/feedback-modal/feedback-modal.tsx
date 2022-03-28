import { useState } from 'react';

import { Lightbox } from '@mdb/flora';

import CheckboxFeedback from './checkbox-feedback';
import TextFeedback from './text-feedback';
import ThankYou from './thank-you';
import { FeedbackModalProps, Feedback } from './types';

const FeedbackModal: React.FunctionComponent<FeedbackModalProps> = ({
    setModalStage,
    modalStage,
    stars,
    contentCategory,
    slug,
}) => {
    const [checkboxComments, setCheckboxComments] = useState<string[]>([]);

    const onSubmit = (comment: string, email: string) => {
        const feedbackContent: Feedback = {
            checkboxComments,
            comment,
            email,
            slug,
            stars,
        };
        console.log(feedbackContent);
    };

    return (
        <Lightbox
            isOpen={modalStage !== 'closed'}
            onClose={() => setModalStage('closed')}
        >
            <form>
                {modalStage === 'checkbox' ? (
                    <CheckboxFeedback
                        stars={stars}
                        onContinue={comments => {
                            setModalStage('text'),
                                setCheckboxComments(comments);
                        }}
                        contentCategory={contentCategory}
                    />
                ) : modalStage === 'text' ? (
                    <TextFeedback
                        stars={stars}
                        onContinue={(comment, email) => {
                            setModalStage('thanks');
                            onSubmit(comment, email);
                        }}
                        contentCategory={contentCategory}
                    />
                ) : modalStage === 'thanks' ? (
                    <ThankYou onContinue={() => setModalStage('closed')} />
                ) : (
                    <></>
                )}
            </form>
        </Lightbox>
    );
};

export default FeedbackModal;
