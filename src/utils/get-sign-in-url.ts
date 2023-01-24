import getConfig from 'next/config';

const getSignInURL = (path: string): string => {
    const fromPagePath = path ? `?fromPagePath=${path}` : '';
    const { publicRuntimeConfig } = getConfig();
    const { absoluteBasePath, accountPortalUrl } = publicRuntimeConfig;
    const signInParams = new URLSearchParams({
        fromURI: `${absoluteBasePath}/auth/signin/${fromPagePath}`,
    });
    const signInURL = `${accountPortalUrl}?` + signInParams.toString();
    return signInURL;
};

export default getSignInURL;
