import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import BaseIcon from './BaseIcon';

test('renders base icon not filled', () => {
    render(
        <BaseIcon>
            <path />
        </BaseIcon>
    );

    const icon = screen.getByTestId('base-icon');

    expect(icon).toHaveAttribute('fill', 'none');
});

test('renders base icon filled', () => {
    render(
        <BaseIcon>
            <path />
        </BaseIcon>
    );

    const icon = screen.getByTestId('base-icon');

    expect(icon).not.toHaveAttribute('filled');
});
