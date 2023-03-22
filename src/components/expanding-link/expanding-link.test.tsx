import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import theme from '@mdb/flora/theme';

import ExpandingLink from '.';

test('renders expanding link with no hover override', async () => {
    render(<ExpandingLink text="Atlas" href={'/products/atlas/'} />);

    const user = userEvent.setup();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/developer/products/atlas/');
    expect(link.getElementsByTagName('span')[0]).toHaveTextContent('Atlas');

    expect(link).toHaveStyle({
        right: 0,
    });
    await user.hover(link);
    expect(link).toHaveStyle({
        right: `calc(${theme.sizes.inc60} - ${theme.sizes.inc70})`,
    });
});

test('renders expanding link with hover override', async () => {
    render(
        <ExpandingLink
            text="Atlas"
            href={'/products/atlas/'}
            hoverStyleOverrides={{ top: '10px' }}
        />
    );
    const user = userEvent.setup();

    const link = screen.getByRole('link');

    expect(link).toHaveStyle({
        right: 0,
    });

    await user.hover(link);
    expect(link).toHaveStyle({
        right: 0,
        top: '10px',
    });
});
