import React from 'react';
import Link from 'next/link';
import { DeveloperTopicsMenuWrapper } from '../../styled/developer-topics-menu';

const DeveloperTopicsMenu: React.FunctionComponent = ({text}) => {
    return (
        <>
            <DeveloperTopicsMenuWrapper ref={ref}>
                <Link href="/developertopics" passHref>
                    {text}
                </Link>
            </DeveloperTopicsMenuWrapper>
        </>
    );
};

DeveloperTopicsMenu.displayName = 'DeveloperTopicsMenu'; // eslint will complain if this is not here because we use forwardRef.
export default DeveloperTopicsMenu;
