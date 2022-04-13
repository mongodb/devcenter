import BaseIcon, { BaseIconProps } from './BaseIcon';

export const MenuBoxed: React.FunctionComponent<BaseIconProps> = ({
    className,
}) => {
    return (
        <BaseIcon className={className}>
            <path
                d="M6.99474 9.00003L16.9945 8.99231M6.99474 14.9934L16.9945 14.9857M4.00879 2C2.89937 2 2 2.89937 2 4.00879M4.00879 2H19.9912M4.00879 2C2.9115 2 2 2.9115 2 4.00879M2 4.00879V19.9912M19.9912 2C21.1006 2 22 2.89937 22 4.00879M19.9912 2C21.0885 2 22 2.9115 22 4.00879M22 4.00879V19.9912M22 19.9912C22 21.1006 21.1006 22 19.9912 22M22 19.9912C22 21.0885 21.0885 22 19.9912 22M19.9912 22H4.00879M4.00879 22C2.89937 22 2 21.1006 2 19.9912M4.00879 22C2.9115 22 2 21.0885 2 19.9912"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </BaseIcon>
    );
};
