import '@testing-library/jest-dom';

import getSignInURL from './get-sign-in-url';

jest.mock('next/router', () => ({
    __esModule: true,
    ...jest.requireActual('next/router'),
    useRouter: jest.fn(() => ({ asPath: '' })),
}));

jest.mock('next/config', () => {
    return jest.fn(() => ({
        publicRuntimeConfig: {
            absoluteBasePath:
                'http://devcenter-local.mongodb.com:3000/developer',
            accountPortalUrl: 'https://www.example.com/account/login',
        },
    }));
});

test('get sign in URL for normal string', () => {
    const URL = getSignInURL('/products/mongodb/');
    expect(URL).toEqual(
        'https://www.example.com/account/login?fromURI=http%3A%2F%2Fdevcenter-local.mongodb.com%3A3000%2Fdeveloper%2Fauth%2Fsignin%2F%3FfromPagePath%3D%2Fproducts%2Fmongodb%2F'
    );
});
test('get sign in URL for undefined', () => {
    const URL = getSignInURL();
    expect(URL).toEqual(
        'https://www.example.com/account/login?fromURI=http%3A%2F%2Fdevcenter-local.mongodb.com%3A3000%2Fdeveloper%2Fauth%2Fsignin%2F'
    );
});
