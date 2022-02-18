import { NextPage } from 'next';
import FeatureCard from '../components/cards/featured-card';

const Tutorials: NextPage = () => (
    <>
        <h1>Tutorials</h1>
        <FeatureCard
            pillCategory={'ARTICLE'}
            thumbnail={{
                size: 'small',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            }}
            title="Article1"
            description="This is my first article"
            tags={['Atlas Data Lake', 'tag2', 'tag2021', 'Realm Studio']}
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
            tags={['Atlas Data Lake', 'tag2', 'tag2021', 'Realm Studio']}
            contentDate={new Date()}
        />
        <FeatureCard
            pillCategory={'VIDEO'}
            thumbnail={{
                size: 'small',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            }}
            title="Article1"
            description="This is my first article"
            tags={['Atlas Data Lake', 'tag2', 'tag2021', 'Realm Studio']}
            contentDate={new Date()}
        />
    </>
);

export default Tutorials;
