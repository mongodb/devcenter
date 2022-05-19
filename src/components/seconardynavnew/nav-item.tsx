import React from 'react';

interface IProps {
    children: React.ReactNode;
}
const StyledList = {
    paddingLeft: 0,
    listStyle: [null, null, null, 'none'],
    display: ['block', 'block', 'block', 'inline-block'],
};

const SecondaryLinksList: React.FunctionComponent<IProps> = ({ children }) => {
    return <li sx={StyledList}>{children}</li>;
};

export default SecondaryLinksList;
