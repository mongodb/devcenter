import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ContentPiece } from '../../interfaces/content-piece';
import CardSection, { FeaturedCardSection } from '.';

const content: ContentPiece[] = [
    {
        authors: ['Farah Appleseed'],
        category: 'Article',
        image: {
            alt: 'thumbnail',
            url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
        },
        title: 'This is 102 article',
        description: 'This is my second article',
        contentDate: new Date().toDateString(),
        tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        featured: false,
        slug: 'a2',
    },
    {
        authors: ['Farah Appleseed'],
        category: 'Article',
        image: {
            alt: 'thumbnail',
            url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
        },
        title: 'This is 103 article',
        description: 'This is my third article',
        contentDate: new Date().toDateString(),
        tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        featured: false,
        slug: 'a3',
    },
    {
        authors: ['Farah Appleseed'],
        category: 'Article',
        image: {
            alt: 'thumbnail',
            url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
        },
        title: 'This is 104 article',
        description: 'This is my fourth article',
        contentDate: new Date().toDateString(),
        tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        featured: false,
        slug: 'a4',
    },
];

test('renders card section', () => {
    render(<CardSection content={content} title="Test Articles" />);

    const title = screen.getByText('Test Articles');
    expect(title).toBeInTheDocument();

    content.forEach(piece => {
        const cardTitle = screen.getByText(piece.title);
        expect(cardTitle).toBeInTheDocument();
    });

    const allLink = screen.getAllByText('All Test Articles');
    expect(allLink).toHaveLength(2); // 1 for desktop 1 for mobile.
});

test('renders featured card section', () => {
    render(<FeaturedCardSection content={content} />);

    const title = screen.getByText('Featured');
    expect(title).toBeInTheDocument();

    content.forEach(piece => {
        const cardTitle = screen.getByText(piece.title);
        expect(cardTitle).toBeInTheDocument();
    });
});
