export interface BaseIconProps {
    className?: string;
}

const BaseIcon: React.FunctionComponent<BaseIconProps> = ({
    className,
    children,
}) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            sx={{
                width: 'inc20',
                height: 'inc20',
                strokeWidth: '2px',
            }}
            className={className}
        >
            {children}
        </svg>
    );
};

export default BaseIcon;
