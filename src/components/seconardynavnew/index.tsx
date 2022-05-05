import MobileView from './mobile';
import DesktopView from './desktop';

const SecondaryNav = () => (
    <>
        <div sx={{ display: ['block', 'block', 'block', 'none'] }}>
            <MobileView />
        </div>
        <div sx={{ display: ['none', 'none', 'none', 'block'] }}>
            <DesktopView />
        </div>
    </>
);

export default SecondaryNav;
