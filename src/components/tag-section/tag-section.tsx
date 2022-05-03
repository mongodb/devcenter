import { Tag } from '@mdb/flora';

import { tagStyles, tagWrapperStyles } from './styles';
import { TagSectionProps } from './types';
import { flattenTags } from '../../utils/flatten-tags';

const TagSection: React.FunctionComponent<TagSectionProps> = ({
    tags,
    disappearOnMobile = false,
    className,
}) => (
    <div sx={tagWrapperStyles(disappearOnMobile)} className={className}>
        {tags
            .filter(tag => tag.type !== 'AuthorType')
            .map(tag => (
                <Tag
                    key={`${tag.name} ${tag.type}`}
                    href={tag.slug}
                    variant="small"
                    sx={tagStyles}
                >
                    {tag.name}
                </Tag>
            ))}
    </div>
);
export default TagSection;
