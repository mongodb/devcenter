import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Hero from '.';

import { createTopicPageCTAS } from './utils';
import { Tag } from '../../interfaces/tag';

jest.mock('next/router', () => ({
    __esModule: true,
    ...jest.requireActual('next/router'),
    useRouter: jest.fn(() => ({ asPath: '' })),
}));

jest.mock('next-auth/react', () => ({
    __esModule: true,
    ...jest.requireActual('next/router'),
    useSession: jest.fn(() => ({ session: null })),
}));

jest.mock('../../utils/get-sign-in-url', () => {
    return jest.fn(() => '');
});

const crumbs = [
    { text: 'MongoDB Developer Center', url: '/' },
    { text: 'Developer Topics', url: '/topics' },
    { text: 'Products', url: '/topics' },
];

const name = 'Atlas';
const description =
    'Blurb consisting of a description of the title or tag for the page. No more than 2 - 3 lines, and 5 column max';
const ctas = [
    { text: 'Primary CTA', url: 'https://www.mongodb.com/atlas' },
    {
        text: 'Secondary CTA',
        url: 'https://www.mongodb.com/cloud/atlas/register',
    },
];

const ctaElements = createTopicPageCTAS(ctas);

const topic: Tag = {
    name: 'Atlas',
    type: 'L1Product',
    slug: '/products/atlas',
};

test('renders Hero', () => {
    render(
        <Hero
            crumbs={crumbs}
            name={name}
            description={description}
            ctas={ctaElements}
            topic={topic}
        />
    );
    // Breadcrumbs
    const firstCrumb = screen.getByText(crumbs[0].text);
    expect(firstCrumb).toBeInTheDocument();

    // Text
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent(name);

    const descriptionBlock = screen.getByText(description);
    expect(descriptionBlock).toBeInTheDocument();

    // CTAs
    const primaryCTA = screen.getByText('Primary CTA');
    expect(primaryCTA).toBeInTheDocument();

    const secondaryCTA = screen.getByText('Secondary CTA');
    expect(secondaryCTA).toBeInTheDocument();

    const followButton = screen.getByText('Follow');
    expect(followButton).toBeInTheDocument();
});
