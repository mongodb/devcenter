import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ShowcaseCard from '.';

test('renders showcase card', () => {
    render(
        <ShowcaseCard
            titleLink={{ text: 'Atlas', url: '/products/atlas/' }}
            alignment="left"
            description="Some description"
            // eslint-disable-next-line @next/next/no-img-element
            image={<img alt="some alt" src="https://www.example.com" />}
            cta={{ text: 'Some CTA', url: 'https://www.mongodb.com' }}
            links={[
                { text: 'Link 1', url: '/products/mongodb/' },
                { text: 'Link 2', url: '/languages/python/' },
            ]}
            wholeCardHref="/technologies/docker/"
        />
    );

    const links = screen.getAllByRole('link');
    const titleLink = links.find(
        link => link.getAttribute('href') === '/developer/products/atlas/'
    );
    expect(titleLink).toBeDefined();
    expect(titleLink?.getElementsByTagName('span')[0]).toHaveTextContent(
        'Atlas'
    );

    screen.getByText('Some description');

    const image = screen.getByAltText('some alt');
    expect(image).toHaveAttribute('src', 'https://www.example.com');

    const ctaLink = links.find(
        link => link.getAttribute('href') === 'https://www.mongodb.com'
    );
    expect(ctaLink).toBeDefined();
    expect(ctaLink?.getElementsByTagName('span')[0]).toHaveTextContent(
        'Some CTA'
    );

    const subLink = links.find(
        link => link.getAttribute('href') === '/developer/languages/python/'
    );
    expect(subLink).toBeDefined();
    expect(subLink?.getElementsByTagName('span')[0]).toHaveTextContent(
        'Link 2'
    );

    const wholeCardLink = links.find(
        link => link.getAttribute('href') === '/developer/technologies/docker/'
    );
    expect(wholeCardLink).toBeDefined();
    expect(wholeCardLink).toHaveStyle({ position: 'absolute' });
});
