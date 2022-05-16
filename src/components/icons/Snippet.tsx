import BaseIcon, { BaseIconProps } from './BaseIcon';

export const Snippet: React.FunctionComponent<BaseIconProps> = ({
    className,
}) => {
    return (
        <BaseIcon className={className}>
            <path
                d="M8.01751 8.00029L4 11.9976L8.00195 16.0105M16.0058 8.01584L20 12.0054L16.0214 16.0105M12.0149 4L12.0227 20"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </BaseIcon>
    );
};
