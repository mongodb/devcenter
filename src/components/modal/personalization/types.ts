import { Tag } from '../../../interfaces/tag';

export interface ScrollModalProps {
    title: string | JSX.Element;
    subtitle?: string;
    existingSelections?: Array<Tag>;
}

export type PersonalizationModalConfig = {
    title: string;
    tags: Array<Tag>;
};
