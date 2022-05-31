import { ComponentFactory } from '../component-factory';
import { ArticleNode } from '../../../interfaces/article-body-node';
import theme from '@mdb/flora/theme';

const codeStyles = {
    bg: 'purple10',
    color: 'purple80',
    borderRadius: 'inc20',
    px: `calc(${theme.space.inc20} - 2px)`, // Subtract  2px to account for the border.
    py: `calc(${theme.space.inc10} - 2px)`,
    fontFamily: 'mono',
    fontSize: ['inc30', null, null, 'inc40'],
    border: `1px solid ${theme.colors.purple40}`,
    lineHeight: ['inc30', null, null, '34px'], // To prevent vertical overlapping of code elements.
};

export const InlineCode = ({
    children,
    value,
}: {
    children: ArticleNode[];
    value: string;
}) => {
    // Value is the DevHub CMS representation
    if (value) {
        return <code sx={codeStyles}>{value}</code>;
    }
    return (
        <code sx={codeStyles}>
            {children.map((node: ArticleNode, i: number) => (
                <ComponentFactory nodeData={node} key={i} />
            ))}
        </code>
    );
};
