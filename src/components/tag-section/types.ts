import { Tag } from '../../interfaces/tag';

export interface TagSectionProps {
    tags: Tag[];
    withLabels?: boolean;
    disappearOnMobile?: boolean;
    className?: string;
}
