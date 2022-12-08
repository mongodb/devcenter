import { TypographyScale } from '@mdb/flora';
import { ComponentFactory } from './component-factory';

const aLinkStyles = {
    display: 'inline-block',
    marginLeft: 'inc20',
    span: {
        fontSize: 'inc20',
        lineHeight: 'inc20',
    },
    color: 'black40',
    '&:hover': {
        color: 'text.default',
    },
};

const unorderedListStyles = {
    listStyleType: 'none',
    paddingLeft: 0,
    'li:not(:last-child)': {
        marginBottom: 'inc30',
    },
};

const formatText = (text: string | any) => {
    if (!text) return '';
    return typeof text === 'string' ? (
        <TypographyScale variant="body3">{text}</TypographyScale>
    ) : (
        text.map((e: any, index: number) => (
            <ComponentFactory key={index} nodeData={e} />
        ))
    );
};

export const TableOfContents = ({
    headingNodes,
    className,
}: {
    headingNodes: any;
    className?: string;
}) => {
    return (
        <div className={className}>
            <TypographyScale variant="heading6">
                Table of Contents
            </TypographyScale>
            <ul sx={unorderedListStyles}>
                {headingNodes.map(
                    ({
                        id,
                        title,
                    }: {
                        id: string;
                        title: string | unknown[];
                    }) => {
                        return (
                            <li key={id}>
                                <div
                                    sx={{
                                        borderLeftWidth: 'inc30',
                                        borderLeftStyle: 'solid',
                                        borderLeftColor: 'transparent',
                                        height: '100%',
                                        '&:hover': {
                                            borderLeftColor: 'blue80',
                                        },
                                    }}
                                >
                                    <a
                                        key={id}
                                        href={`#${id}`}
                                        sx={aLinkStyles}
                                    >
                                        {formatText(title)}
                                    </a>
                                </div>
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
};
