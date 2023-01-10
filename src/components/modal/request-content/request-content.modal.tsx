import axios from 'axios';
import { memo, useState } from 'react';

import ThankYou from '../shared/thank-you';
import TextRequest from './dialogs/text-request';

import { getURLPath } from '../../../utils/format-url-path';

import {
    RequestContentModalProps,
    ContentRequest,
    REQUEST_MODAL_STAGE,
} from './types';

const RequestContentModal: React.FunctionComponent<RequestContentModalProps> =
    memo(({ contentCategory }) => {
        const [modalStage, setModalStage] = useState(REQUEST_MODAL_STAGE.TEXT);

        const onSubmit = (
            topic: string,
            description: string,
            email: string
        ) => {
            const contentRequest: ContentRequest = {
                topic,
                description,
                email: email || null, // Convert empty string to null.
            };

            axios.post(
                getURLPath('/api/requestContent') as string,
                contentRequest,
                {
                    headers: { Origin: origin },
                }
            );
        };

        const onContinue = (
            topic: string,
            description: string,
            email: string
        ) => {
            setModalStage(REQUEST_MODAL_STAGE.THANKS);
            onSubmit(topic, description, email);
        };

        const renderModal = (type: REQUEST_MODAL_STAGE) => {
            const modals = {
                [REQUEST_MODAL_STAGE.TEXT]: (
                    <TextRequest
                        onContinue={onContinue}
                        contentCategory={contentCategory}
                    />
                ),
                [REQUEST_MODAL_STAGE.THANKS]: (
                    <ThankYou
                        title="Thanks for your request!"
                        subtitle="Someone from our Developer Experience team will review your request. Once reviewed, someone from our team may reach out to you to follow up"
                        titleStyles={{
                            display: 'block',
                            marginBottom: ['inc40', null, null, 'inc50'],
                        }}
                        subtitleStyles={{
                            display: 'block',
                            marginBottom: ['inc40', null, null, 'inc50'],
                        }}
                    />
                ),
            };

            return modals[type] ?? <></>;
        };

        return <form sx={{ width: '100%' }}>{renderModal(modalStage)}</form>;
    });

RequestContentModal.displayName = 'RequestContentModal';

export default RequestContentModal;
