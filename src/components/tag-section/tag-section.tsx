import { Tag } from '@mdb/flora';

import { tagStyles, tagWrapperStyles } from './styles';
import { TagSectionProps } from './types';

const TagSection: React.FunctionComponent<TagSectionProps> = ({
    tags,
    disappearOnMobile = false,
    className,
}) => (
    <div sx={tagWrapperStyles(disappearOnMobile)} className={className}>
        {tags.map(tag => (
            <Tag key={tag} variant="small" sx={tagStyles}>
                {tag}
            </Tag>
        ))}
    </div>
);
export default TagSection;
