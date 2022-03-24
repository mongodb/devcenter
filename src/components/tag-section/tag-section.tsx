import { Grid } from 'theme-ui';
import { Tag } from '@mdb/flora';

import { tagStyles, tagWrapperStyles } from './styles';
import { TagSectionProps } from './types';

const TagSection: React.FunctionComponent<TagSectionProps> = ({ tags }) => (
    <div sx={tagWrapperStyles}>
        {tags.map(tag => (
            <Tag key={tag} variant="small" sx={tagStyles}>
                {tag}
            </Tag>
        ))}
    </div>
);
export default TagSection;
