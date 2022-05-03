import { Lightbox } from '@mdb/flora';

import TextRequest from './dialogs/text-request';
import ThankYou from './dialogs/thank-you';
import { RequestContentModalProps, ContentRequest } from './types';
import axios from 'axios';

const RequestContentModal: React.FunctionComponent<
    RequestContentModalProps
> = ({ modalStage, setModalStage, contentCategory }) => {
    const onSubmit = (topic: string, description: string, email: string) => {
        const contentRequest: ContentRequest = {
            topic,
            description,
            email,
        };
        const url =
            'https://data.mongodb-api.com/app/devhub-api-ztlmp/endpoint/request_devhub_content';
        axios
            .post(url, contentRequest, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            .then(({ data }) => {
                console.log(data);
            });
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
