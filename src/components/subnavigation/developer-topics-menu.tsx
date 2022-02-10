import React from 'react';
import Link from 'next/link';
import { DeveloperTopicsMenuWrapper } from '../../styled/developer-topics-menu';

const DeveloperTopicsMenu = React.forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <>
            <DeveloperTopicsMenuWrapper ref={ref}>
                <Link href="/developertopics">
                    <button>All Developer Topics</button>
                </Link>
            </DeveloperTopicsMenuWrapper>
        </>
    );
});

DeveloperTopicsMenu.displayName = 'DeveloperTopicsMenu'; // eslint will complain if this is not here because we use forwardRef.
export default DeveloperTopicsMenu;
