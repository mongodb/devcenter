import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Breadcrumbs from '.';

const crumbs = [
    { text: 'MongoDB Developer Center', url: '/' },
    { text: 'Developer Topics', url: '/topics' },
    { text: 'Products', url: '/topics' },
];

test('renders breadcrumbs', () => {
    render(<Breadcrumbs crumbs={crumbs} />);

    const firstCrumb = screen.getByText(crumbs[0].text);
    expect(firstCrumb).toBeInTheDocument();
    const secondCrumb = screen.getByText(crumbs[1].text);
    expect(secondCrumb).toBeInTheDocument();
    const thirdCrumb = screen.getByText(crumbs[2].text);
    expect(thirdCrumb).toBeInTheDocument();

    const chevrons = screen.getAllByText('chevron-right');
    expect(chevrons).toHaveLength(2);
});
