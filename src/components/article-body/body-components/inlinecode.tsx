import { screenSize, size } from '../../../styled/theme';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { ComponentFactory } from '../component-factory';

const desktopPadding = css`
    padding: 2px ${size.xsmall} 4px;
`;

const tabletPadding = css`
    padding: 0px 4px 2px;
`;

const StyledLiteral = styled('code')`
    background: #f4c8f4;
    border-radius: 4px;
    ${tabletPadding};
    @media ${screenSize.mediumAndUp} {
        ${desktopPadding};
    }
`;

export const InlineCode = ({ children, value }) => {
    // Value is the DevHub CMS representation
    if (value) {
        return <StyledLiteral>{value}</StyledLiteral>;
    }
    return (
        <StyledLiteral>
            {children.map((node, i) => (
                <ComponentFactory nodeData={node} key={i} />
            ))}
        </StyledLiteral>
    );
};
