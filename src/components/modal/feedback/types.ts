import { PillCategory } from '../../../types/pill-category';

export enum FEEDBACK_MODAL_STAGE {
    CHECKBOX = 'CHECKBOX',
    TEXT = 'TEXT',
    THANKS = 'THANKS',
}

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

export interface IRating {
    stars: number;
    slug: string;
    title?: string;
}

export interface ITextFeedback {
    _id: string;
    comment: string;
    email: string;
}

export interface ICheckboxFeedback {
    _id: string;
    checkboxComments: string[];
}

export interface FeedbackModalProps {
    initialStage: FEEDBACK_MODAL_STAGE;
    stars: number;
    contentCategory: PillCategory;
    feedbackId: string;
}
