import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Hero from '.';

import { createTopicPageCTAS } from './utils';

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

test('renders hero', () => {
    render(
        <Hero
            crumbs={crumbs}
            name={name}
            description={description}
            ctas={ctaElements}
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
});
