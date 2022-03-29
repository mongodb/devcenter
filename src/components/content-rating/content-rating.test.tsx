import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ContentRating from '.';
test('renders content rating', () => {
    let rating = 0;
    render(<ContentRating stars={3} onRate={r => (rating = r)} />);

    const filledStars = screen.getAllByAltText('star-filled');
    expect(filledStars).toHaveLength(3);

    const emptyStars = screen.getAllByAltText('star-empty');
    expect(emptyStars).toHaveLength(2);

    const fifthStar = screen.getByLabelText('Five Stars');
    fifthStar.click();

    expect(rating).toEqual(5);
});
