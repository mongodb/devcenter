import { ComponentFactory } from '../component-factory';
import { ArticleNode } from '../../../interfaces/article-body-node';

export const ListItem = ({ children, ...rest }: { children: any }) => (
    <li>
        {/* div provides flex alignment with preceding bullet */}
        <div>
            {children.map((child: ArticleNode, index: number) => (
                <ComponentFactory {...rest} nodeData={child} key={index} />
            ))}
        </div>
    </li>
);
