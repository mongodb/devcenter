import { Tag } from '../../interfaces/tag';

export interface TagSectionProps {
    tags: Tag[];
    disappearOnMobile?: boolean;
    className?: string;
}
