import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Tooltip from '.';

test('renders Tooltip', () => {
    render(<Tooltip alwaysBelow>Hello</Tooltip>);

    const tooltip = screen.getByTestId('tooltip-body');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toBeVisible();
    expect(tooltip).toHaveTextContent('Hello');

    // Can't really test this at different viewports, but just make sure it always has this when bottom-aligned.
    expect(tooltip).toHaveStyle({ transform: 'translateX(50%)' });
});
