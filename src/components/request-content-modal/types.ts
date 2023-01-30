import { PillCategory } from '../../types/pill-category';

export type modalStages = 'closed' | 'text' | 'thanks';

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
