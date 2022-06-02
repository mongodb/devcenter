import { Lightbox } from '@mdb/flora';

import CheckboxFeedback from './dialogs/checkbox-feedback';
import TextFeedback from './dialogs/text-feedback';
import ThankYou from './dialogs/thank-you';
import { FeedbackModalProps, ICheckboxFeedback, ITextFeedback } from './types';
import axios from 'axios';
import { getURLPath } from '../../utils/format-url-path';

const updateFeedback = (body: ITextFeedback | ICheckboxFeedback) =>
    axios.put(getURLPath('/api/updateFeedback') as string, body);

const FeedbackModal: React.FunctionComponent<FeedbackModalProps> = ({
    setModalStage,
    modalStage,
    stars,
    contentCategory,
    feedbackId,
}) => {
    const onTextSubmit = (comment: string, email: string) => {
        const body: ITextFeedback = {
            _id: feedbackId,
            comment,
            email,
        };
        updateFeedback(body);
        setModalStage('thanks');
    };

    const onCheckboxSubmit = (checkboxComments: string[]) => {
        const body: ICheckboxFeedback = {
            _id: feedbackId,
            checkboxComments,
        };
        updateFeedback(body);
        setModalStage('text');
    };

    return (
        <Lightbox
            isOpen={modalStage !== 'closed'}
            onClose={() => setModalStage('closed')}
            sx={{ '>div': { height: 'unset' } }}
        >
            <form sx={{ width: '100%' }}>
                {modalStage === 'checkbox' ? (
                    <CheckboxFeedback
                        stars={stars}
                        onContinue={onCheckboxSubmit}
                        contentCategory={contentCategory}
                    />
                ) : modalStage === 'text' ? (
                    <TextFeedback
                        stars={stars}
                        onContinue={onTextSubmit}
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
