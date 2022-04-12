import styled from '@emotion/styled';
import { ComponentFactory } from '../component-factory';
import { ArticleNode } from '../../../interfaces/article-body-node';
import theme from '@mdb/flora/theme';
import { screenSize } from '../../../styled/theme';

const StyledLiteral = styled('code')`
    background: ${theme.colors.purple10};
    color: ${theme.colors.purple80};
    border-radius: ${theme.radii.inc20};
    padding: ${theme.space.inc10} ${theme.space.inc20};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.inc40};
    :hover {
        border: 1px solid ${theme.colors.purple40};
    }
    @media ${screenSize.upToLarge} {
        font-size: ${theme.fontSizes.inc30};
        line-height: ${theme.lineHeights.inc10};
    }
`;

export const InlineCode = ({
    children,
    value,
}: {
    children: ArticleNode[];
    value: string;
}) => {
    // Value is the DevHub CMS representation
    if (value) {
        return <StyledLiteral>{value}</StyledLiteral>;
    }
    return (
        <StyledLiteral>
            {children.map((node: ArticleNode, i: number) => (
                <ComponentFactory nodeData={node} key={i} />
            ))}
        </StyledLiteral>
    );
};
