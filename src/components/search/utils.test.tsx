import '@testing-library/jest-dom';

import { isValidPage } from './utils';

test('checks if page is valid', () => {
    const pageNumber = 5;
    const searchResults = [{}, {}];

    const searchInput = isValidPage(searchResults.length, pageNumber);
    expect(searchInput).toBeFalsy();
});
