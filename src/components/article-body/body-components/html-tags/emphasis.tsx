import { ComponentFactory } from '../../component-factory';

export const Emphasis = ({ children }) => (
    <em>
        {children.map((child, index) => (
            <ComponentFactory nodeData={child} key={index} />
        ))}
    </em>
);
