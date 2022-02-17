import React from 'react';
import { NextPage } from 'next';
import SharedCard from '../components/topics/shared-card';

const Articles: NextPage = () => (
    <>
        <h1>Articles</h1>
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
            }}
        >
            <SharedCard
                pillCategory={'ARTICLE'}
                thumbnail={{
                    size: 'large',
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                }}
                header="Article1"
                description="This is my first article"
                contentDate={new Date()}
            />
            <SharedCard
                pillCategory={'ARTICLE'}
                thumbnail={{
                    size: 'medium',
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                }}
                header="Article1"
                description="This is my first article"
                contentDate={new Date()}
            />
            <SharedCard
                pillCategory={'ARTICLE'}
                thumbnail={{
                    size: 'small',
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                }}
                header="Article1"
                description="This is my first article"
                contentDate={new Date()}
            />
            <SharedCard
                pillCategory={'ARTICLE'}
                header="Article1"
                contentDate={new Date()}
            />
        </div>
    </>
);

export default Articles;
