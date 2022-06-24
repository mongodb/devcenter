export interface BaseIconProps {
    className?: string;
    isFilled?: boolean;
}

const BaseIcon: React.FunctionComponent<BaseIconProps> = ({
    className,
    children,
    isFilled = false,
}) => {
    return (
        <svg
            viewBox="0 0 24 24"
            {...(!isFilled && { fill: 'none' })}
            xmlns="http://www.w3.org/2000/svg"
            sx={{
                width: 'inc20',
                height: 'inc20',
                strokeWidth: '2px',
            }}
            className={className}
            data-testid="base-icon"
        >
            {children}
        </svg>
    );
};

export default BaseIcon;
