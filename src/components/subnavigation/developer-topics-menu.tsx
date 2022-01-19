import React, { useContext } from 'react';
import { Context } from './navbar';
import { DeveloperTopicsMenuWrapper } from '../../styled/developer-topics-menu';
import { useRouter } from 'next/router';

const DeveloperTopicsMenu = React.forwardRef<HTMLDivElement>((_, ref) => {
    const { open } = useContext(Context);
    const router = useRouter();

    const handleDeveloperTopicsClick = () => {
        router.push('/developertopics').then(r => {
            console.log(r);
        });
    };

    return (
        <>
            {open && (
                <DeveloperTopicsMenuWrapper ref={ref}>
                    <button onClick={handleDeveloperTopicsClick}>
                        All Developer Topics
                    </button>
                </DeveloperTopicsMenuWrapper>
            )}
        </>
    );
});

DeveloperTopicsMenu.displayName = 'DeveloperTopicsMenu'; // eslint will complain if this is not here because we use forwardRef.
export default DeveloperTopicsMenu;
