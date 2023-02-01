jest.mock('../../../../service/get-personalization-modal-config.preval', () => {
    // Note: "jest.mock" gets hoisted to the top, const vars have to be declared here or will return "undefined"
    const config = initializePersonalizationConfig(MOCK_META_INFO);
    return {
        __esModule: true,
        default: config,
    };
});

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { initializePersonalizationConfig } from '../utils';

import { MOCK_META_INFO } from '../../../../mockdata/mock-meta-info';

// Since component imports the preval being mocked, it has to be imported after
import ScrollPersonalizationModal from './personalization-scroll.modal';

describe('PaginatedPersonalizationModal', () => {
    it('renders', () => {
        const { container } = render(
            <ScrollPersonalizationModal
                title="Test Modal"
                subtitle="lorem ipsum"
            />
        );

        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('lorem ipsum')).toBeInTheDocument();

        // All categories should be present in viewport
        expect(screen.getByText('Languages')).toBeInTheDocument();
        expect(
            screen.getAllByTestId('scroll-modal-tags')[0].children.length
        ).toEqual(1);

        expect(screen.getByText('Technologies')).toBeInTheDocument();
        expect(
            screen.getAllByTestId('scroll-modal-tags')[1].children.length
        ).toEqual(2);

        expect(screen.getByText('Products')).toBeInTheDocument();
        expect(
            screen.getAllByTestId('scroll-modal-tags')[2].children.length
        ).toEqual(4);

        // Footer
        expect(container.getElementsByTagName('input').length).toEqual(1); // checkbox
        expect(container.getElementsByTagName('button').length).toEqual(1);
    });

    it('has working interactions', () => {
        const { container } = render(
            <ScrollPersonalizationModal
                title="Test Modal"
                subtitle="lorem ipsum"
            />
        );

        const input = container.getElementsByTagName('input')[0];

        // input should be set by default
        expect(input).toBeChecked();

        fireEvent.click(input);

        // TODO: test for POST/PUT when integrated
    });
});
