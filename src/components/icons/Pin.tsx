import BaseIcon, { BaseIconProps } from './BaseIcon';

export const Pin: React.FunctionComponent<BaseIconProps> = ({ className }) => {
    return (
        <BaseIcon className={className}>
            <path
                d="M8.67001 4.42139L10.0486 3L3 10.0914L4.40001 8.69138M8.67001 4.42139L18.5509 10.0676M8.67001 4.42139L4.40001 8.69138M18.5509 10.0676C18.5509 10.0629 18.5549 10.0676 18.5509 10.0676ZM18.5509 10.0676C18.5542 10.0643 18.5509 10.0723 18.5509 10.0676ZM18.5509 10.0676L14.3227 14.3227M18.5509 10.0676L10.07 18.5754M14.3227 14.3227L20.6751 20.6751M14.3227 14.3227L10.07 18.5754M10.07 18.5754C10.0747 18.5754 10.0667 18.5788 10.07 18.5754ZM10.07 18.5754C10.07 18.5795 10.0653 18.5754 10.07 18.5754ZM10.07 18.5754L4.40001 8.69138"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </BaseIcon>
    );
};
