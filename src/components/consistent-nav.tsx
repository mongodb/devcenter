import React from 'react';
import styled from '@emotion/styled';
import { UnifiedNav } from '@mdb/consistent-nav';

import { layer } from './theme';

const UnifiedNavCustom = styled(UnifiedNav)`
    z-index: ${layer.superFront};
`;

const ConsistentNav: React.FunctionComponent = () => (
    <UnifiedNavCustom position="sticky" floraTheme="default" />
);

export default ConsistentNav;
