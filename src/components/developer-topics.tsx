import NavBar from './subnavigation/navbar';
import React from 'react';
import { PageWrapper } from '../styled/pages';

const DeveloperTopicsAComponent: React.FunctionComponent = () => {
    return (
        <>
            <NavBar />
            <PageWrapper>
                <h2>Developer Topics</h2>
            </PageWrapper>
        </>
    );
};

export default DeveloperTopicsAComponent;
