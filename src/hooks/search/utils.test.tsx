import '@testing-library/jest-dom';

import { isEmptyArray } from './utils';

test('correctly checks if array is empty', () => {
    expect(isEmptyArray([{}, {}])).toBeFalsy();
    expect(isEmptyArray([])).toBeTruthy();
    expect(isEmptyArray(null)).toBeTruthy();
    expect(isEmptyArray(undefined)).toBeTruthy();
});
