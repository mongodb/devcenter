import React from 'react';
import styled from '@emotion/styled';
import { UnifiedNav } from '@mdb/consistent-nav';

const UnifiedNavCustom = styled(UnifiedNav)`
    z-index: 100;
`;

const ConsistentNav: React.FunctionComponent = () => (
    <UnifiedNavCustom position="sticky" floraTheme="default" />
);

export default ConsistentNav;
