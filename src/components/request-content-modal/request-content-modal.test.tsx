import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RequestContentModalContext } from '../../contexts/request-content-modal';

import RequestContentModal from '.';

describe('RequestContentModal', () => {
    it('renders text request modal', async () => {
        const setModalStage = jest.fn();
        render(
            <RequestContentModalContext.Provider
                value={{ modalStage: 'text', setModalStage }}
            >
                <RequestContentModal contentCategory="Demo App" />
            </RequestContentModalContext.Provider>
        );

        const title = screen.getByText('Request a Demo App');
        expect(title).toBeInTheDocument();

        const submit = screen.getByText('Submit');
        submit.click();

        expect(setModalStage).toHaveBeenCalledTimes(1);
        expect(setModalStage).toHaveBeenCalledWith('thanks');
    });

    it('renders text request modal with correct grammar', () => {
        render(
            <RequestContentModalContext.Provider
                value={{ modalStage: 'text', setModalStage: jest.fn() }}
            >
                <RequestContentModal contentCategory="Article" />
            </RequestContentModalContext.Provider>
        );

        const title = screen.getByText('Request an Article');
        expect(title).toBeInTheDocument();
    });

    it('renders thank you modal', () => {
        const setModalStage = jest.fn();
        render(
            <RequestContentModalContext.Provider
                value={{ modalStage: 'thanks', setModalStage }}
            >
                <RequestContentModal contentCategory="Article" />
            </RequestContentModalContext.Provider>
        );

        const title = screen.getByText('Thanks for your request!');
        expect(title).toBeInTheDocument();

        const submit = screen.getByText('Close');
        submit.click();

        expect(setModalStage).toHaveBeenCalledTimes(1);
        expect(setModalStage).toHaveBeenCalledWith('closed');
    });

    it("doesn't render anything when closed", () => {
        render(<RequestContentModal contentCategory="Demo App" />);
        const requestTitle = screen.queryByText('Request an Article');
        expect(requestTitle).toBeNull();

        const thanksTitle = screen.queryByText('Thanks for your request!');
        expect(thanksTitle).toBeNull();
    });
});
