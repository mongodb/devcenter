import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { initializePersonalizationConfig } from '../utils';
import { MOCK_META_INFO } from '../../../../mockdata/mock-meta-info';

jest.mock('../../../../service/get-personalization-modal-config.preval', () => {
    // Note: "jest.mock" gets hoisted to the top, const vars have to be declared here or will return "undefined"
    const config = initializePersonalizationConfig(MOCK_META_INFO);
    return {
        __esModule: true,
        default: config,
    };
});

// Since component imports the preval being mocked, it has to be imported after
import PaginatedPersonalizationModal from './personalization-paginated.modal';

describe('PaginatedPersonalizationModal', () => {
    it('renders', () => {
        render(<PaginatedPersonalizationModal />);

        expect(
            screen.getByText('What topics are you interested in?')
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                "Select topics you're interested in to receive personalized recommendations!"
            )
        ).toBeInTheDocument();

        expect(screen.getByText('Languages')).toBeInTheDocument();
        // "Languages" has one item in the mock meta info
        expect(
            screen.getByTestId('paginated-modal-tags').children.length
        ).toEqual(1);

        // The next topic label should be shown to navigate to on button click
        expect(screen.getByText('Technologies')).toBeInTheDocument();

        const pagination = screen.getByTestId('dots-container');
        expect(pagination).toBeInTheDocument();
        expect(pagination.children.length).toEqual(3);
    });

    it('should show correct categories based on user navigation', () => {
        render(<PaginatedPersonalizationModal />);

        // Button to Navigate to Technologies
        fireEvent.click(screen.getByText('Technologies'));

        // Shows next categories tags
        expect(
            screen.getByTestId('paginated-modal-tags').children.length
        ).toEqual(2);

        // Updates the navigation button
        const nextBtnLabel = screen.getByText('Products');
        expect(nextBtnLabel).toBeInTheDocument();

        fireEvent.click(nextBtnLabel);

        expect(screen.getByText('Done')).toBeInTheDocument();

        // Clicking on the first dot in the pagination component should send the user back to the first category
        const paginationPageDot =
            screen.getByTestId('dots-container').childNodes[0];

        fireEvent.click(paginationPageDot);

        expect(screen.getByText('Languages')).toBeInTheDocument();
    });

    it('has working interactions', () => {
        const { container } = render(<PaginatedPersonalizationModal />);

        const input = container.getElementsByTagName('input')[0];

        // input should be set by default
        expect(input).toBeChecked();

        fireEvent.click(input);

        expect(input).not.toBeChecked();

        // TODO: test for POST/PUT when integrated
    });
});
