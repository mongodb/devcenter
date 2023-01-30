import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import SeriesCard from '.';
import { Series } from '../../interfaces/series';

const series: Series = {
    title: 'Cool Atlas Stuff',
    seriesEntry: [
        {
            title: 'This is 101 article',
            calculatedSlug: '/product/atlas/a1',
        },
        {
            title: 'This is 102 article',
            calculatedSlug: '/product/atlas/a2',
        },
        {
            title: 'This is 103 article',
            calculatedSlug: '/product/atlas/a3',
        },
        {
            title: 'This is 104 article',
            calculatedSlug: '/product/atlas/a4',
        },
    ],
};

const notLastTitle = 'This is 102 article';
const lastTitle = 'This is 104 article';

test("renders series with with piece that isn't last in series", () => {
    render(<SeriesCard series={series} currentTitle={notLastTitle} />);

    expect(screen.getByText('This is part of a series')).toBeInTheDocument();
    expect(screen.getByText(series.title)).toBeInTheDocument();
    expect(screen.getByText('Up Next')).toBeInTheDocument();
    expect(
        screen.getAllByRole('link', { name: 'This is 103 article' })
    ).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'Continue' })).toBeInTheDocument();
    series.seriesEntry.forEach(piece => {
        if (piece.title !== notLastTitle) {
            expect(
                screen
                    .getAllByRole('listitem')
                    .find(item => item.textContent?.includes(piece.title))
            ).toBeInTheDocument();
        }
    });
});

test('renders series with piece that is last in series', () => {
    render(<SeriesCard series={series} currentTitle={lastTitle} />);

    expect(screen.getByText('This is part of a series')).toBeInTheDocument();
    expect(screen.getByText(series.title)).toBeInTheDocument();
    expect(screen.queryByText('Up Next')).toBeNull();
    expect(
        screen.getAllByRole('link', { name: 'This is 103 article' })
    ).toHaveLength(1);
    expect(screen.queryByRole('link', { name: 'Continue' })).toBeNull();
});
