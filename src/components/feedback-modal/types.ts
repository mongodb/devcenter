import { PillCategory } from '../../types/pill-category';

export type modalStages = 'closed' | 'checkbox' | 'text' | 'thanks';

interface FeedbackDialogProps {
    stars: number;
    contentCategory: PillCategory;
}

export interface CheckboxFeedbackProps extends FeedbackDialogProps {
    onContinue: (comments: string[]) => void;
}

export interface TextFeedbackProps extends FeedbackDialogProps {
    onContinue: (comment: string, email: string) => void;
}

export interface Feedback {
    stars: number;
    checkboxComments: string[];
    comment: string;
    email: string;
    slug: string;
    title?: string;
}

export interface FeedbackModalProps {
    setModalStage: (stage: modalStages) => void;
    modalStage: modalStages;
    stars: number;
    contentCategory: PillCategory;
    slug: string;
    title?: string;
}
