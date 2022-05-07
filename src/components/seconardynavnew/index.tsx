import MobileView from './mobile';
import DesktopView from './desktop';

const SecondaryNav = () => (
    <>
        <div
            sx={{
                boxSizing: 'border-box',
                background: '#fff',
                backgroundColor: 'white',
                display: ['block', 'block', 'block', 'none'],
                position: 'fixed',
                overflowY: 'auto',
                width: '100%',
                zIndex: '10',
            }}
        >
            <MobileView />
        </div>
        <div
            sx={{
                display: ['none', 'none', 'none', 'block'],
                borderBottom: 'solid 1px #B8C4C2',
            }}
        >
            <DesktopView />
        </div>
    </>
);

export default SecondaryNav;
