import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import RequestContentModal from '.';
jest.mock('../../../service/get-all-meta-info.preval', () => {
    return [
        { tagName: 'Lang', category: 'ProgrammingLanguage' },
        { tagName: 'Tech', category: 'Technology' },
    ];
});

// The regular flow is already tested in integration tests.
describe('RequestContentModal', () => {
    it('will not submit if required fields are not filled out', () => {
        render(<RequestContentModal contentCategory="Demo App" />);

        const submit = screen.getByText('Submit');
        submit.click();

        waitFor(() =>
            expect(screen.getByTitle('circle-alert')).toBeInTheDocument()
        );
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
