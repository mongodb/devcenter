import { ComponentFactory } from '../component-factory';

export const ListItem = ({ children, ...rest }) => (
    <li>
        {/* div provides flex alignment with preceding bullet */}
        <div>
            {children.map((child, index) => (
                <ComponentFactory
                    {...rest}
                    nodeData={child}
                    key={index}
                    // Include <p> tags in <li> if there is more than one paragraph
                    parentNode={children.length === 1 ? 'listItem' : undefined}
                />
            ))}
        </div>
    </li>
);
