import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RequestContentModal from '.';

describe('RequestContentModal', () => {
    it('renders text request modal', () => {
        let nextStage;
        render(
            <RequestContentModal
                contentCategory="Demo App"
                setModalStage={stage => {
                    nextStage = stage;
                }}
                modalStage="text"
            />
        );

        const title = screen.getByText('Request a Demo App');
        expect(title).toBeInTheDocument();

        const submit = screen.getByText('Submit');
        submit.click();
        expect(nextStage).toEqual('thanks');
    });

    it('renders text request modal with correct grammar', () => {
        render(
            <RequestContentModal
                contentCategory="Article"
                setModalStage={() => {}}
                modalStage="text"
            />
        );

        const title = screen.getByText('Request an Article');
        expect(title).toBeInTheDocument();
    });

    it('renders thank you modal', () => {
        let nextStage;
        render(
            <RequestContentModal
                contentCategory="Demo App"
                setModalStage={stage => {
                    nextStage = stage;
                }}
                modalStage="thanks"
            />
        );

        const title = screen.getByText('Thanks for your request!');
        expect(title).toBeInTheDocument();

        const submit = screen.getByText('Close');
        submit.click();
        expect(nextStage).toEqual('closed');
    });

    it("doesn't render anything when closed", () => {
        render(
            <RequestContentModal
                contentCategory="Demo App"
                setModalStage={() => {}}
                modalStage="closed"
            />
        );
        const requestTitle = screen.queryByText('Request an Article');
        expect(requestTitle).toBeNull();

        const thanksTitle = screen.queryByText('Thanks for your request!');
        expect(thanksTitle).toBeNull();
    });
});
