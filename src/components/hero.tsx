import React from 'react';
import { GridLayout } from '@mdb/flora';
import styled from '@emotion/styled';

import Breadcrumbs from './breadcrumbs';
import { HeroProps } from '../interfaces/components/hero';

const LeftContainer = styled('div')`
    grid-column: span 6;
`;
const Hero: React.FunctionComponent<HeroProps> = ({ crumbs }) => {
    return (
        <GridLayout>
            <LeftContainer>
                <Breadcrumbs crumbs={crumbs} />
            </LeftContainer>
        </GridLayout>
    );
};

export default Hero;
