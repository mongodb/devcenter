import NavBar from './subnavigation/navbar';
import React from 'react';
import { PageWrapper } from '../styled/pages';

const CodeExamplesComponent: React.FunctionComponent = () => {
    return (
        <>
            <NavBar />
            <PageWrapper>
                <h2>Code Examples</h2>
            </PageWrapper>
        </>
    );
};

export default CodeExamplesComponent;
