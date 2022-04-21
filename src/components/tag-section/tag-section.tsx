import { Tag } from '@mdb/flora';

import { tagStyles, tagWrapperStyles } from './styles';
import { TagSectionProps } from './types';
import { flattenTags } from '../../utils/flatten-tags';

const TagSection: React.FunctionComponent<TagSectionProps> = ({
    tags,
    disappearOnMobile = false,
    className,
}) => {
    const flattenedTags = flattenTags(tags);
    return (
        <div sx={tagWrapperStyles(disappearOnMobile)} className={className}>
            {flattenedTags.map(tag => (
                <Tag key={tag} variant="small" sx={tagStyles}>
                    {tag}
                </Tag>
            ))}
        </div>
    );
};
export default TagSection;
