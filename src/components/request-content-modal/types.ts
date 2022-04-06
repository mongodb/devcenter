import { PillCategory } from '../../types/pill-category';

export type modalStages = 'closed' | 'text' | 'thanks';

export interface ContentRequest {
    topic: string;
    description: string;
    email: string;
}

export interface RequestContentModalProps {
    setModalStage: (stage: modalStages) => void;
    modalStage: modalStages;
    contentCategory: PillCategory;
}

export interface TextRequestProps {
    onContinue: (topic: string, description: string, email: string) => void;
    contentCategory: PillCategory;
}
