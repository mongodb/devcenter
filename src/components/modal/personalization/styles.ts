import { ThemeUICSSObject } from 'theme-ui';

// TODO: depending on mobile styles, some classes might be able to just be merged into a "spacer" class

// Shared
const wrapper: ThemeUICSSObject = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black00',
    height: '85vh',
    padding: ['inc40', null, null, 'inc70'],
    borderRadius: 'inc20',
};

const tags: ThemeUICSSObject = {
    overflowY: 'scroll',
    height: 'auto',
};

const controls: ThemeUICSSObject = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 'inc60',
    backgroundColor: 'black00',
    width: '100%',
};

const button = {
    marginBottom: 'inc60',
};

// Paginated Modal specific
const paginated_badge = {
    width: 'fit-content',
    marginBottom: 'inc30',
};

const paginated_subtitle = {
    display: 'block',
    paddingTop: 'inc20',
    paddingBottom: 'inc60',
};

// Scroll Modal specific
const scroll_heading = {
    marginBottom: 'inc60',
};

const scroll_tagSection = {
    marginBottom: 'inc70',

    '&:last-of-type': {
        marginBottom: 0,
    },
};

const styles = {
    wrapper,
    tags,
    controls,
    button,
    paginated_badge,
    paginated_subtitle,
    scroll_heading,
    scroll_tagSection,
};

export default styles;
