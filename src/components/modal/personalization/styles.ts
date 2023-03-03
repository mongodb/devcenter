import { ThemeUICSSObject } from 'theme-ui';

// Shared
const wrapper: ThemeUICSSObject = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black00',
    maxHeight: '90vh',
    padding: ['inc40', null, null, 'inc70'],
    borderRadius: 'inc20',
};

const tagsWrapper: ThemeUICSSObject = {
    overflowY: 'scroll',
    height: 'auto',
    gap: 16,
    padding: '1px', // so selected card borders dont get cut off by surrounding margin
};

const tag = {
    gridColumn: 'span 1',
};

const subtitle = {
    display: 'block',
    paddingTop: ['inc10', null, null, 'inc20'],
    paddingBottom: ['inc40', null, null, 'inc60'],
};

const categoryHeader = {
    marginBottom: 'inc30',
};

const controls: ThemeUICSSObject = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 'inc60',
    backgroundColor: 'black00',
    width: '100%',
};

const checkbox = {
    paddingBottom: ['inc40', null, null, 'inc60'],
};

const button = {
    marginBottom: 'inc60',
};

// Paginated Modal specific
const badge = {
    width: 'fit-content',
    marginBottom: ['inc20', null, null, 'inc30'],
};

// Scroll Modal specific
const scrollHeader = {
    marginBottom: 'inc60',
};

const scrollTagSection = {
    marginBottom: 'inc70',
    gap: 16,

    '&:last-of-type': {
        marginBottom: 'inc10', // so scrolling to bottom will not cut off bottom most card
    },
};

const styles = {
    wrapper,
    tagsWrapper,
    tag,
    subtitle,
    categoryHeader,
    controls,
    checkbox,
    button,
    badge,
    scrollHeader,
    scrollTagSection,
};

export default styles;
