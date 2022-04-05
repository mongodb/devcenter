import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import SeriesCard from '.';
import { PillCategory } from '../../types/pill-category';

const series = {
    title: 'Cool Atlas Stuff',
    content: [
        {
            authors: ['Farah Appleseed'],
            category: 'Article' as PillCategory,
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 101 article',
            description: 'This is my first article',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: true,
            slug: 'product/atlas/a1',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Article' as PillCategory,
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 102 article',
            description: 'This is my second article',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/a2',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Article' as PillCategory,
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 103 article',
            description: 'This is my third article',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/a3',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Article' as PillCategory,
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 104 article',
            description: 'This is my fourth article',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/a4',
        },
    ],
};

const notLastSlug = 'product/atlas/a2';
const lastSlug = 'product/atlas/a4';

test("renders series with with piece that isn't last in series", () => {
    render(<SeriesCard series={series} currentSlug={notLastSlug} />);

    expect(screen.getByText('This is part of a series')).toBeInTheDocument();
    expect(screen.getByText(series.title)).toBeInTheDocument();
    expect(screen.getByText('Up Next')).toBeInTheDocument();
    expect(
        screen.getByRole('link', { name: 'This is 103 article' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Continue' })).toBeInTheDocument();
    series.content.forEach(piece => {
        if (piece.slug !== notLastSlug) {
            expect(
                screen
                    .getAllByRole('listitem')
                    .find(item => item.textContent?.includes(piece.title))
            ).toBeInTheDocument();
        }
    });
});

test('renders series with with piece that is last in series', () => {
    render(<SeriesCard series={series} currentSlug={lastSlug} />);

    expect(screen.getByText('This is part of a series')).toBeInTheDocument();
    expect(screen.getByText(series.title)).toBeInTheDocument();
    expect(screen.queryByText('Up Next')).toBeNull();
    expect(
        screen.queryByRole('link', { name: 'This is 103 article' })
    ).toBeNull();
    expect(screen.queryByRole('link', { name: 'Continue' })).toBeNull();
});
