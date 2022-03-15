import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import TertiaryNav from '.';

const items = [
    {
        title: 'Quickstarts',
        url: `/products/example/quickstarts`,
    },
    {
        title: `Articles`,
        url: `/products/example/articles`,
    },
    {
        title: `Courses`,
        url: `/products/example/courses`,
    },
    {
        title: `Community Discussion`,
        url: `https://www.mongodb.com/community/forums/`,
    },
    {
        title: `Documentation`,
        url: `https://docs.mongodb.com/`,
    },
];

test('renders tertiary nav', () => {
    render(<TertiaryNav topic="Example Topic" items={items} />);

    const title = screen.getByText('All Example Topic Content');
    expect(title).toBeInTheDocument();

    items.forEach(item => {
        const navItem = screen.getByText(item.title);
        expect(navItem).toBeInTheDocument();
    });
});
