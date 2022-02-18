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
                pillCategory={'VIDEO'}
                thumbnail={{
                    size: 'large',
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                }}
                header="This is a video"
                description="This is my first article"
                contentDate={new Date()}
            />
            <SharedCard
                pillCategory={'DEMO APP'}
                thumbnail={{
                    size: 'medium',
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                }}
                header="This is a demo App"
                description="This is my first article"
                contentDate={new Date()}
            />
            <SharedCard
                pillCategory={'ARTICLE'}
                thumbnail={{
                    size: 'small',
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                }}
                header="This is an article"
                description="This is my first article"
                contentDate={new Date()}
            />
            <SharedCard
                pillCategory={'TUTORIAL'}
                header="This is a tutorial"
                contentDate={new Date()}
            />
        </div>
    </>
);

export default Articles;
