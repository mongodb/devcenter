import { useRouter } from 'next/router';
import { useMemo } from 'react';
import getSignInURL from '../utils/get-sign-in-url';

const useSignInURL = () => {
    const { asPath } = useRouter();
    const signInURL = useMemo(() => getSignInURL(asPath), [asPath]);
    return signInURL;
};

export default useSignInURL;
