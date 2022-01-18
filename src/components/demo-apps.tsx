import NavBar from './subnavigation/navbar';
import React from 'react';
import { PageWrapper } from '../styled/pages';

const DemoAppsComponent: React.FunctionComponent = () => {
    return (
        <>
            <NavBar />
            <PageWrapper>
                <h2>Demo Apps</h2>
            </PageWrapper>
        </>
    );
};

export default DemoAppsComponent;
