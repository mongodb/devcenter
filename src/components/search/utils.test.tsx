import '@testing-library/jest-dom';

import { isValidPage } from './utils';

test('checks if page is valid', () => {
    const searchResults = [{}, {}];

    expect(isValidPage(searchResults.length, 5)).toBeFalsy();
    expect(isValidPage(searchResults.length, -1)).toBeFalsy();
    expect(isValidPage(searchResults.length, 0)).toBeFalsy();
    expect(isValidPage(searchResults.length, 1)).toBeTruthy();
});
