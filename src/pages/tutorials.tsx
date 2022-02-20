import { NextPage } from 'next';
import FeatureCard from '../components/cards/featured-card';

const Tutorials: NextPage = () => (
    <>
        <h1>Tutorials</h1>
        <div
            style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
            }}
        >
            <FeatureCard
                pillCategory={'VIDEO'}
                thumbnail={{
                    size: 'small',
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                }}
                title="Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify"
                description="    In this post we'll see how to use Github Actions to continuously generate the DocC documentation for our Swift libraries and how to publish this documentation so that can be accessed online, using Netlify."
                tags={['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB']}
                contentDate={new Date()}
            />
            <FeatureCard
                pillCategory={'ARTICLE'}
                thumbnail={{
                    size: 'small',
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                }}
                title="Create a Custom Data Enabled API in MongoDB Realm in 10 Minutes or Less"
                description="Learn how to create a data API with MongoDB Realm in 10 minutes or less"
                tags={['Atlas Data Lake', 'Data API']}
                contentDate={new Date()}
            />
            <FeatureCard
                pillCategory={'DEMO APP'}
                thumbnail={{
                    size: 'small',
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                }}
                title="Article1"
                description="This is my first article"
                tags={['Atlas Data Lake', 'Realm Studio']}
                contentDate={new Date()}
            />
        </div>
    </>
);

export default Tutorials;
