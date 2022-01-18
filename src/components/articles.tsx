import NavBar from './subnavigation/navbar';
import React from 'react';
import { PageWrapper } from '../styled/pages';

const ArticlesComponent: React.FunctionComponent = () => {
    return (
        <>
            <NavBar />
            <PageWrapper>
                <h2>Articles</h2>
            </PageWrapper>
        </>
    );
};

export default ArticlesComponent;
