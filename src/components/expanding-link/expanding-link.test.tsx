import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import theme from '@mdb/flora/theme';

import ExpandingLink from '.';

const facebookUrl = 'https://www.facebook.com/';
const twitterUrl = 'https://www.twitter.com/';
const linkedinUrl = 'https://www.linkedin.com/';

test('renders expanding link with no hover override', () => {
    render(<ExpandingLink text="Atlas" href={'/products/atlas/'} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/developer/products/atlas/');
    expect(link.getElementsByTagName('span')[0]).toHaveTextContent('Atlas');

    expect(link).toHaveStyle({
        right: 0,
    });
    userEvent.hover(link);
    expect(link).toHaveStyle({
        right: `calc(${theme.sizes.inc60} - ${theme.sizes.inc70})`,
    });
});

test('renders expanding link with hover override', () => {
    render(
        <ExpandingLink
            text="Atlas"
            href={'/products/atlas/'}
            hoverStyleOverrides={{ top: '10px' }}
        />
    );

    const link = screen.getByRole('link');

    expect(link).toHaveStyle({
        right: 0,
    });

    userEvent.hover(link);
    expect(link).toHaveStyle({
        right: 0,
        top: '10px',
    });
});
