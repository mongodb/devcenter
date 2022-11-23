import BaseIcon, { BaseIconProps } from './BaseIcon';

export const Location: React.FunctionComponent<BaseIconProps> = ({
    className,
}) => {
    return (
        <BaseIcon className={className}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M2.04408 2.35936C3.05099 1.20558 4.45547 0.5 6 0.5C7.54453 0.5 8.94901 1.20558 9.95592 2.35936C10.8881 3.42755 11.0729 4.75553 10.7939 6.1956C10.5129 7.64605 9.76782 9.15956 8.91325 10.5001L6 15.0699L3.08675 10.5001C2.23218 9.15957 1.48706 7.64605 1.20609 6.1956C0.927126 4.75553 1.11186 3.42755 2.04408 2.35936Z"
                    stroke="#5D6C74"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <circle
                    cx="6"
                    cy="5.5"
                    r="2.25"
                    stroke="#5D6C74"
                    strokeWidth="1.5"
                />
            </svg>
        </BaseIcon>
    );
};
