import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../src/pages/index';
import { Article } from '../src/interfaces/article';

const mockArticles: Article[] = [
    {
        __typename: 'Article',
        name: 'Active-Active Application Architectures with MongoDB',
        description:
            'This post will begin by describing the database capabilities required by modern multi-data center applications.',
        slug: '/active-active-application-architectures',
    },
    {
        __typename: 'Article',
        name: 'Build a Newsletter Website With the MongoDB Data Platform',
        description:
            "How I ended up building a whole CMS for a newsletter — when it wasn't even my job",
        slug: '/build-newsletter-website-mongodb-data-platform',
    },
    {
        __typename: 'Article',
        name: 'Coronavirus Map and Live Data Tracker with MongoDB Charts',
        description:
            'Learn how we put MongoDB Charts to use to track the global Coronavirus outbreak.',
        slug: '/coronavirus-map-live-data-tracker-charts',
    },
];

test('renders home page', () => {
    render(<Home articles={mockArticles} />);
    const title = screen.getByText('MongoDB Developer Center');
    expect(title).toBeInTheDocument();

    const articleHeader = screen.getByRole('heading', { level: 2 });
    expect(articleHeader).toHaveTextContent('Articles');

    const articleItems = screen.getAllByRole('listitem');
    expect(articleItems).toHaveLength(3);

    expect(articleItems[0]).toHaveTextContent(
        'Active-Active Application Architectures with MongoDB'
    );
    expect(articleItems[0]).toHaveTextContent(
        'This post will begin by describing'
    );

    expect(articleItems[1]).toHaveTextContent(
        'Build a Newsletter Website With the MongoDB Data Platform'
    );
    expect(articleItems[1]).toHaveTextContent(
        'How I ended up building a whole CMS'
    );

    expect(articleItems[2]).toHaveTextContent(
        'Coronavirus Map and Live Data Tracker with MongoDB Charts'
    );
    expect(articleItems[2]).toHaveTextContent(
        'Learn how we put MongoDB Charts to use'
    );
});
