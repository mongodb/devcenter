import BaseIcon, { BaseIconProps } from './BaseIcon';

export const FullApplication: React.FunctionComponent<BaseIconProps> = ({
    className,
}) => {
    return (
        <BaseIcon className={className}>
            <path d="M5.5,3c-.8,0-1.5,.7-1.5,1.5s.7,1.5,1.5,1.5,1.5-.7,1.5-1.5-.7-1.5-1.5-1.5h0Z" />
            <path d="M10.5,3c-.8,0-1.5,.7-1.5,1.5s.7,1.5,1.5,1.5,1.5-.7,1.5-1.5-.7-1.5-1.5-1.5h0Z" />
            <path
                fillRule="evenodd"
                d="M0,3C0,1.3,1.3,0,3,0H19c1.7,0,3,1.3,3,3V19c0,1.7-1.3,3-3,3H3c-1.7,0-3-1.3-3-3V3Zm3-1c-.6,0-1,.4-1,1V7H20V3c0-.6-.4-1-1-1H3Zm17,7H2v10c0,.6,.4,1,1,1H19c.6,0,1-.4,1-1V9Z"
            />
            <path
                fill="none"
                opacity={0.4}
                strokeMiterlimit={10}
                d="M19,21H3c-1.1,0-2-.9-2-2V3c0-1.1,.9-2,2-2h16c1.1,0,2,.9,2,2V19c0,1.1-.9,2-2,2Zm2-13H1"
            />
        </BaseIcon>
    );
};
