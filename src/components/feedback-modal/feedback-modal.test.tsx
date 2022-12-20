import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import FeedbackModal from '.';
import { PillCategory } from '../../types/pill-category';

const feedbackProps = {
    setModalStage: () => null,
    contentCategory: 'Demo App' as PillCategory,
    slug: 'product/atlas/d1',
    feedbackId: 'id-1',
};

test('renders bad review checkbox modal', () => {
    render(
        <FeedbackModal {...feedbackProps} stars={1} modalStage="checkbox" />
    );

    const title = screen.getByText("We're sorry to hear that.");
    expect(title).toBeInTheDocument();

    const checkbox = screen.getByText(
        'This demo app contained incorrect information'
    );
    expect(checkbox).toBeInTheDocument();
});

test('renders good review checkbox modal', () => {
    render(
        <FeedbackModal {...feedbackProps} stars={5} modalStage="checkbox" />
    );

    const title = screen.getByText('Thanks for the feedback!');
    expect(title).toBeInTheDocument();

    const checkbox = screen.getByText('This demo app was a fun read');
    expect(checkbox).toBeInTheDocument();
});

test('renders bad review text modal', () => {
    render(<FeedbackModal {...feedbackProps} stars={1} modalStage="text" />);

    const title = screen.getByText('How could this be better?');
    expect(title).toBeInTheDocument();

    const textbox = screen.getByText('Describe your experience');
    expect(textbox).toBeInTheDocument();

    const email = screen.getByText('Email');
    expect(email).toBeInTheDocument();
});

test('renders good review text modal', () => {
    render(<FeedbackModal {...feedbackProps} stars={5} modalStage="text" />);

    const title = screen.getByText('Thanks for the feedback!');
    expect(title).toBeInTheDocument();
});

test('renders thank you modal', () => {
    render(<FeedbackModal {...feedbackProps} stars={5} modalStage="thanks" />);

    const title = screen.getByText('We appreciate your feedback.');
    expect(title).toBeInTheDocument();

    const linkout = screen.getByText('MongoDB Community');
    expect(linkout).toHaveAttribute(
        'href',
        'https://www.mongodb.com/community'
    );
});
