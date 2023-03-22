import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import RequestContentModal from '.';

describe('RequestContentModal', () => {
    it('renders correct flow of dialogs ', async () => {
        render(<RequestContentModal contentCategory="Demo App" />);

        const requestTitle = screen.getByText('Request a Demo App');
        expect(requestTitle).toBeInTheDocument();

        const topic = screen.getByLabelText('Topic');
        fireEvent.change(topic, { target: { value: 'Topic X' } });
        expect(topic).toHaveValue('Topic X');

        const description = screen.getByLabelText('Describe your experience');
        fireEvent.change(description, {
            target: { value: 'I want to learn Y about topic X' },
        });
        expect(description).toHaveValue('I want to learn Y about topic X');

        const email = screen.getByLabelText('Email (optional)');
        fireEvent.change(email, {
            target: { value: 'test@myemail.com' },
        });
        expect(email).toHaveValue('test@myemail.com');

        const submit = screen.getByText('Submit');
        expect(submit).toBeInTheDocument();
    });

    it('will not submit if required fields are not filled out', async () => {
        render(<RequestContentModal contentCategory="Demo App" />);

        const user = userEvent.setup();

        const submit = screen.getByText('Submit');
        await user.click(submit);

        const warningIcon = screen.getByLabelText('alert-icon');
        expect(warningIcon).toBeInTheDocument();
    });

    it('renders text request modal with correct grammar', () => {
        render(<RequestContentModal contentCategory="Article" />);

        const title = screen.getByText('Request an Article');
        expect(title).toBeInTheDocument();
    });

    it('does not render anything when closed', () => {
        render(<RequestContentModal contentCategory="Demo App" />);
        const requestTitle = screen.queryByText('Request an Article');
        expect(requestTitle).toBeNull();

        const thanksTitle = screen.queryByText('Thanks for your request!');
        expect(thanksTitle).toBeNull();
    });
});
