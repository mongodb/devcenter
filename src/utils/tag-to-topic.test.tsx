import '@testing-library/jest-dom';

import { Tag } from '../interfaces/tag';
import { tagToTopic } from './tag-to-topic';

test('creates Serverless topic', () => {
    const tag: Tag = {
        name: 'Serverless',
        type: 'Technology',
        slug: '/technologies/serverless',
    };
    const topic = tagToTopic(tag);
    expect(topic.href).toEqual('/developer/technologies/serverless/');
    expect(topic.icon?.props.name).toEqual('atlas_serverless');
});

test('creates product topics', () => {
    const tag: Tag = {
        name: 'Atlas',
        type: 'L1Product',
        slug: '/products/atlas',
    };
    const topic = tagToTopic(tag);
    expect(topic.href).toEqual('/developer/products/atlas/');
    expect(topic.icon?.props.name).toEqual('atlas_product_family');
});

test('creates technology topics', () => {
    const tag: Tag = {
        name: 'Docker',
        type: 'Technology',
        slug: '/technologies/docker',
    };
    const topic = tagToTopic(tag);
    expect(topic.href).toEqual('/developer/technologies/docker/');
    expect(topic.icon?.props.variant).toEqual('Docker');
});

test('creates language topics', () => {
    const tag: Tag = {
        name: 'Python',
        type: 'ProgrammingLanguage',
        slug: '/languages/python',
    };
    const topic = tagToTopic(tag);
    expect(topic.href).toEqual('/developer/languages/python/');
    expect(topic.icon?.props.variant).toEqual('Python LogoMark');
});

test('creates topics with no icon', () => {
    const tag: Tag = {
        name: 'Hello',
        type: 'Technology',
        slug: '/technologies/hello',
    };
    const topic = tagToTopic(tag);
    expect(topic.href).toEqual('/developer/technologies/hello/');
    expect(topic.icon).toBeNull();
});
