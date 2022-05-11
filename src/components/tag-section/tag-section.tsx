import { Tag } from '@mdb/flora';
import { getURLPath } from '../../utils/format-url-path';

import { tagStyles, tagWrapperStyles } from './styles';
import { TagSectionProps } from './types';

const TagSection: React.FunctionComponent<TagSectionProps> = ({
    tags,
    disappearOnMobile = false,
    className,
}) => (
    <div sx={tagWrapperStyles(disappearOnMobile)} className={className}>
        {tags
            .filter(
                tag =>
                    !['AuthorType', 'ExpertiseLevel', 'ContentType'].includes(
                        tag.type
                    )
            )
            .map(tag => (
                <Tag
                    key={`${tag.name} ${tag.type}`}
                    href={getURLPath(tag.slug)}
                    variant="small"
                    sx={tagStyles}
                >
                    {tag.name}
                </Tag>
            ))}
    </div>
);
export default TagSection;
