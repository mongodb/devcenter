import { ComponentFactory } from '../../component-factory';

export const Strong = ({ children }) => (
    <strong>
        {children.map((child, index) => (
            <ComponentFactory nodeData={child} key={index} />
        ))}
    </strong>
);
