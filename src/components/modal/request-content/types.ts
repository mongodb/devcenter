import { PillCategory } from '../../../types/pill-category';

export enum REQUEST_MODAL_STAGE {
    TEXT = 'TEXT',
    THANKS = 'THANKS',
}

export interface ContentRequest {
    topic: string;
    description: string;
    email: string | null;
}

export interface RequestContentModalProps {
    contentCategory: PillCategory;
}

export interface TextRequestProps {
    onContinue: (topic: string, description: string, email: string) => void;
    contentCategory: PillCategory;
}
