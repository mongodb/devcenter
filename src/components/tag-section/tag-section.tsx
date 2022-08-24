import { Tag as FloraTag, TypographyScale } from '@mdb/flora';
import { getURLPath } from '../../utils/format-url-path';
import { Tag as TagType } from '../../interfaces/tag';

import { filterTags, groupTagsByType } from './utils';
import { TagSectionProps } from './types';
import { tagStyles, tagWrapperStyles } from './styles';

const Tag = ({ text, href }: { text: string; href: string | undefined }) => (
    <FloraTag href={href} variant="small" sx={tagStyles}>
        {text}
    </FloraTag>
);

const renderTagsWithLabel = (fTags: TagType[]) => (
    <>
        {groupTagsByType(fTags).map(({ label, tags }) => (
            <div
                key={label}
                sx={{
                    paddingBottom: 'inc40',
                    '&:last-of-type': {
                        paddingBottom: 0,
                    },
                }}
            >
                <TypographyScale
                    variant="mono3"
                    sx={{ textTransform: 'uppercase' }}
                >
                    {label}
                </TypographyScale>
                <div
                    sx={{
                        ...tagWrapperStyles(false),
                        marginTop: 'inc10',
                    }}
                >
                    {tags.map(({ name, type, slug }) => (
                        <Tag
                            key={`${name} ${type}`}
                            text={name}
                            href={getURLPath(slug)}
                        />
                    ))}
                </div>
            </div>
        ))}
    </>
);

const TagSection: React.FunctionComponent<TagSectionProps> = ({
    tags,
    className = '',
    withLabels = false,
    disappearOnMobile = false,
}) => {
    const filteredTags: TagType[] = filterTags(tags);

    return withLabels ? (
        renderTagsWithLabel(filteredTags)
    ) : (
        <div
            className={className}
            data-testid="tag-section"
            sx={tagWrapperStyles(disappearOnMobile)}
        >
            {filteredTags.map(tag => (
                <Tag
                    key={`${tag.name} ${tag.type}`}
                    text={tag.name}
                    href={getURLPath(tag.slug)}
                />
            ))}
        </div>
    );
};

export default TagSection;
