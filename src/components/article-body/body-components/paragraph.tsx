import { ComponentFactory } from '../component-factory';
import { ArticleNode } from '../../../interfaces/article-body-node';

export const Paragraph = ({
    children,
    ...rest
}: {
    children: ArticleNode[];
}) => {
    return (
        <div sx={{ wordBreak: 'break-word' }}>
            {children.map((child: ArticleNode, index: number) => (
                <ComponentFactory {...rest} key={index} nodeData={child} />
            ))}
        </div>
    );
};
