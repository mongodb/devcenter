import MobileView from './mobile';
import DesktopView from './desktop';

const SecondaryNav = () => (
    <>
        <div
            sx={{
                display: ['block', 'block', 'block', 'none'],
                position: 'fixed',
                background: '#fff',
                overflowY: 'auto',
                width: '100%',
                backgroundColor: 'white',
                zIndex: '10',
            }}
        >
            <MobileView />
        </div>
        <div sx={{ display: ['none', 'none', 'none', 'block'] }}>
            <DesktopView />
        </div>
    </>
);

export default SecondaryNav;
