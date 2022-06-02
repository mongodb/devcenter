import { Lightbox } from '@mdb/flora';

import TextRequest from './dialogs/text-request';
import ThankYou from './dialogs/thank-you';
import { RequestContentModalProps, ContentRequest } from './types';
import axios from 'axios';
import { getURLPath } from '../../utils/format-url-path';

const RequestContentModal: React.FunctionComponent<
    RequestContentModalProps
> = ({ modalStage, setModalStage, contentCategory }) => {
    const onSubmit = (topic: string, description: string, email: string) => {
        const contentRequest: ContentRequest = {
            topic,
            description,
            email,
        };

        axios.post(getURLPath('/api/requestContent') as string, contentRequest);
    };

    return (
        <Lightbox
            isOpen={modalStage !== 'closed'}
            onClose={() => setModalStage('closed')}
            sx={{ '>div': { height: 'unset' } }}
        >
            <form sx={{ width: '100%' }}>
                {modalStage === 'text' ? (
                    <TextRequest
                        onContinue={(topic, description, email) => {
                            setModalStage('thanks');
                            onSubmit(topic, description, email);
                        }}
                        contentCategory={contentCategory}
                    />
                ) : modalStage === 'thanks' ? (
                    <ThankYou onContinue={() => setModalStage('closed')} />
                ) : null}
            </form>
        </Lightbox>
    );
};

export default RequestContentModal;
