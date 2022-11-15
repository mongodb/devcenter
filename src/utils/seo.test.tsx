import '@testing-library/jest-dom';

import {
    getCanonicalUrl,
    getCanonicalUrlWithParams,
    shouldDefineDefaultCanonical,
    CONTENT_ROUTE,
} from './seo';

test('get canonical URL for a page', () => {
    const absoluteBasePath =
        'http://devcenter-local.mongodb.com:3000/developer';

    const articlesWithValidParamsPath = '/articles/?page=10';
    const articlesWithInvalidParamsPath =
        '/articles/?page=helloworld&testgkdffkl=ewrwerfsd0';
    const articlesWithoutParamsPath = '/articles/';

    const shouldDefaultCanonicalForArticle =
        shouldDefineDefaultCanonical(CONTENT_ROUTE);

    const canonicalInvalidParamValue = getCanonicalUrlWithParams(
        absoluteBasePath,
        articlesWithValidParamsPath,
        {
            page: '2',
        }
    );
    const canonicalInvalidParamKey = getCanonicalUrlWithParams(
        absoluteBasePath,
        articlesWithValidParamsPath,
        {
            rsdf: '2',
            helloworkd: 'test',
        }
    );
    const canonicalValidParamValue = getCanonicalUrlWithParams(
        absoluteBasePath,
        articlesWithValidParamsPath,
        {
            page: '10',
        }
    );

    expect(
        getCanonicalUrl(absoluteBasePath, articlesWithInvalidParamsPath)
    ).toEqual('http://devcenter-local.mongodb.com:3000/developer/articles/');
    expect(
        getCanonicalUrl(absoluteBasePath, articlesWithoutParamsPath)
    ).toEqual('http://devcenter-local.mongodb.com:3000/developer/articles/');
    expect(shouldDefaultCanonicalForArticle).toBeFalsy();
    expect(
        getCanonicalUrl(absoluteBasePath, articlesWithInvalidParamsPath)
    ).toEqual('http://devcenter-local.mongodb.com:3000/developer/articles/');
    expect(canonicalInvalidParamValue).toEqual(
        'http://devcenter-local.mongodb.com:3000/developer/articles/'
    );
    expect(canonicalInvalidParamKey).toEqual(
        'http://devcenter-local.mongodb.com:3000/developer/articles/'
    );
    expect(canonicalValidParamValue).toEqual(
        'http://devcenter-local.mongodb.com:3000/developer/articles/?page=10'
    );
});
