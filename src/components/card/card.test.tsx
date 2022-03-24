import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from '.';
import { ContentPiece } from '../../interfaces/content-piece';
import { CardProps } from './types';
import { getCardProps } from './utils';

const cardContent: ContentPiece = {
    authors: ['Farah Appleseed'],
    category: 'Article',
    image: {
        alt: 'thumbnail',
        url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
    },
    title: 'Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify 1.',
    description:
        "In this post we'll see how to use Github Actions to continuously generate the DocC documentation" +
        ' for our Swift libraries and how to publish this ' +
        'documentation so that can be accessed online, using Netlify.',
    contentDate: 'Mon Mar 14 2022',
    tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
    featured: true,
    slug: 'product/atlas/v1',
};

const expectedProps: CardProps = {
    authors: ['Farah Appleseed'],
    pillCategory: 'Article',
    thumbnail: {
        alt: 'thumbnail',
        url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
    },
    title: 'Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify 1.',
    description:
        "In this post we'll see how to use Github Actions to continuously generate the DocC documentation" +
        ' for our Swift libraries and how to publish this ' +
        'documentation so that can be accessed online, using Netlify.',
    contentDate: 'Mon Mar 14 2022',
    tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
    variant: 'large',
};

test('returns correct card props', () => {
    const calculatedProps = getCardProps(cardContent, 'large');
    expect(calculatedProps).toEqual(expectedProps);
});

test('renders large', () => {
    const largeProps = getCardProps(cardContent, 'large');
    render(<Card {...largeProps} />);

    const title = screen.queryByText(cardContent.title);
    expect(title).toBeInTheDocument();

    const description = screen.queryByText(cardContent.description);
    expect(description).toBeInTheDocument();

    cardContent.tags.forEach(tag => {
        expect(screen.queryByText(tag)).toBeInTheDocument();
    });

    const pill = screen.queryByText(cardContent.category);
    expect(pill).toBeInTheDocument();

    const date = screen.queryByText(cardContent.contentDate);
    expect(date).toBeInTheDocument();

    const image = screen.queryByAltText(cardContent.image.alt);
    expect(image).toBeInTheDocument();
});

test('renders medium', () => {
    const mediumProps = getCardProps(cardContent, 'medium');
    render(<Card {...mediumProps} />);

    const title = screen.queryByText(cardContent.title);
    expect(title).toBeInTheDocument();

    const description = screen.queryByText(cardContent.description);
    expect(description).toBeNull();

    cardContent.tags.forEach(tag => {
        expect(screen.queryByText(tag)).toBeNull();
    });

    const pill = screen.queryByText(cardContent.category);
    expect(pill).toBeInTheDocument();

    const date = screen.queryByText(cardContent.contentDate);
    expect(date).toBeInTheDocument();

    const image = screen.queryByAltText(cardContent.image.alt);
    expect(image).toBeInTheDocument();
});

test('renders small', () => {
    const smallProps = getCardProps(cardContent, 'small');
    render(<Card {...smallProps} />);

    const title = screen.queryByText(cardContent.title);
    expect(title).toBeInTheDocument();

    const description = screen.queryByText(cardContent.description);
    expect(description).toBeNull();

    cardContent.tags.forEach(tag => {
        expect(screen.queryByText(tag)).toBeNull();
    });

    const pill = screen.queryByText(cardContent.category);
    expect(pill).toBeInTheDocument();

    const date = screen.queryByText(cardContent.contentDate);
    expect(date).toBeInTheDocument();

    const image = screen.queryByAltText(cardContent.image.alt);
    expect(image).toBeInTheDocument();
});

test('renders list', () => {
    const listProps = getCardProps(cardContent, 'list');
    render(<Card {...listProps} />);

    const title = screen.queryByText(cardContent.title);
    expect(title).toBeInTheDocument();

    const description = screen.queryByText(cardContent.description);
    expect(description).toBeInTheDocument();

    cardContent.tags.forEach(tag => {
        expect(screen.queryByText(tag)).toBeInTheDocument();
    });

    const pill = screen.queryByText(cardContent.category);
    expect(pill).toBeInTheDocument();

    const date = screen.queryByText(cardContent.contentDate);
    expect(date).toBeInTheDocument();

    const image = screen.queryByAltText(cardContent.image.alt);
    expect(image).toBeInTheDocument();
});

test('renders related', () => {
    const relatedProps = getCardProps(cardContent, 'related');
    render(<Card {...relatedProps} />);

    const title = screen.queryByText(cardContent.title);
    expect(title).toBeInTheDocument();

    const description = screen.queryByText(cardContent.description);
    expect(description).toBeNull();

    cardContent.tags.forEach(tag => {
        expect(screen.queryByText(tag)).toBeNull();
    });

    const pill = screen.queryByText(cardContent.category);
    expect(pill).toBeInTheDocument();

    const date = screen.queryByText(cardContent.contentDate);
    expect(date).toBeInTheDocument();

    const image = screen.queryByAltText(cardContent.image.alt);
    expect(image).toBeNull();
});
