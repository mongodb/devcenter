import React from 'react';
import { NextPage } from 'next';
import SharedCard from '../components/cards/shared-card';

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
                pillCategory={'VIDEO'}
                thumbnail={{
                    size: 'large',
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                }}
                title="Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify."
                description="In this post we'll see how to use Github Actions to continuously generate the DocC documentation for our Swift libraries and how to publish this documentation so that can be accessed online, using Netlify."
                contentDate={new Date()}
            />
            <SharedCard
                pillCategory={'DEMO APP'}
                thumbnail={{
                    size: 'medium',
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                }}
                title="Create a Custom Data Enabled API in MongoDB Realm in 10 Minutes or Less."
                description="Learn how to create a data API with MongoDB Realm in 10 minutes or less."
                contentDate={new Date()}
            />
            <SharedCard
                pillCategory={'ARTICLE'}
                thumbnail={{
                    size: 'small',
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                }}
                title="This is an article"
                description="This is my first article"
                contentDate={new Date()}
            />
            <SharedCard
                pillCategory={'TUTORIAL'}
                title="This is a tutorial"
                contentDate={new Date()}
            />
        </div>
    </>
);

export default Articles;
