import NavBar from './subnavigation/navbar';
import React from 'react';
import { PageWrapper } from '../styled/pages';

const TutorialsComponent: React.FunctionComponent = () => {
    return (
        <>
            <NavBar />
            <PageWrapper>
                <h2>Tutorials</h2>
            </PageWrapper>
        </>
    );
};

export default TutorialsComponent;
