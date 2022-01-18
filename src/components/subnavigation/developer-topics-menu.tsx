import React, { useContext } from 'react';
import { Context } from './navbar';
import { DeveloperTopicsMenuWrapper } from '../../styled/developer-topics-menu';
import { useRouter } from 'next/router';

const DeveloperTopicsMenu: React.FunctionComponent = () => {
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
                <DeveloperTopicsMenuWrapper>
                    <button onClick={handleDeveloperTopicsClick}>
                        All Developer Topics
                    </button>
                </DeveloperTopicsMenuWrapper>
            )}
        </>
    );
};

export default DeveloperTopicsMenu;
