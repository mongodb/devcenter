import React from 'react';
import styled from '@emotion/styled';
import { UnifiedNav } from '@mdb/consistent-nav';

// Replace this value once we set a theme and have final designs.
export const NAV_DESKTOP_HEIGHT = '88px';
export const NAV_MOBILE_HEIGHT = '55px';

const UnifiedNavCustom = styled(UnifiedNav)`
    z-index: 100;
`;

const ConsistentNav = () => (
    <UnifiedNavCustom position="sticky" floraTheme="default" />
);

export default ConsistentNav;
