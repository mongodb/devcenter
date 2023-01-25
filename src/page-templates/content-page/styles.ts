import { ThemeUICSSObject } from 'theme-ui';
import theme from '@mdb/flora/theme';

const wrapper = {
    paddingBottom: 'inc160',
    px: ['inc40', null, 'inc50', 'inc70'],
    paddingTop: ['inc40', null, 'inc50', 'inc70'],
};

const headerGrid = {
    display: 'grid',
    alignItems: 'center',
    rowGap: ['inc30', null, null, 'inc40'],
    marginBottom: ['inc30', null, null, 'inc40'],
};

const defaultHeaderGrid = {
    ...headerGrid,
    gridTemplateAreas: [
        `
      "authordate"
      "tags"
      "social"
    `,
        null,
        `
      "authordate social"
      "tags tags"
    `,
    ],
};

const eventHeaderGrid = {
    ...headerGrid,
    gridTemplateAreas: [
        `
        "tags"
        "social"
        "eventType"
        `,
        null,
        `
        "tags social"
        "eventType eventType"
        `,
    ],
};

const vidOrPodHeaderGrid = {
    ...headerGrid,
    gridTemplateAreas: [
        `
      "authordate"
      "tags"
      "social"
    `,
        null,
        `
      "authordate authordate"
      "tags social"
    `,
    ],
};

const image: ThemeUICSSObject = {
    marginBottom: ['inc20', null, null, 'inc30'],
    aspectRatio: '16/9',
    position: 'relative',
};

const breadcrumbs = {
    marginBottom: ['inc20', null, null, 'inc30'],
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 9'],
};

const section = {
    maxWidth: '100%', // patches a Codemirror bug on FF https://github.com/codemirror/CodeMirror/issues/4142.
    gridColumn: ['span 6', null, 'span 8', '1 /span 9', '4 /span 6'],
};

const bodySection = {
    ...section,
    my: ['section20', null, 'section30', 'section40'],
};

const footer: ThemeUICSSObject = {
    display: 'flex',
    flexDirection: 'column',
    gap: ['section30', null, 'section40', 'section50'],
    ...section,
};

const footerActions: ThemeUICSSObject = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: ['start', null, 'center'],
    flexDirection: ['column', null, 'row'],
    gap: 'inc30',
    marginTop: ['inc30', null, null, 'inc40'],
};

const ratingSection = {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
};

const requestBtn = {
    display: 'block',
    margin: '0 auto',
};

const externalExamples: ThemeUICSSObject = {
    display: 'flex',
    columnGap: [0, 'inc70'],
    flexDirection: ['column', 'row'],
    alignItems: ['start', 'center'],
};

const floatingMenu = {
    display: ['none', null, null, 'block'],
    gridColumn: '10 /span 3',
    gridRow: '3 / 5',
    paddingLeft: 'inc70',
};

const vidOrPodContent: ThemeUICSSObject = {
    whiteSpace: 'pre-wrap',
    a: {
        color: 'blue60',
        '&:hover': {
            borderBottomWidth: 2,
            borderBottomStyle: 'solid',
            borderBottomColor: 'blue80',
        },
    },
};

const tooltip = {
    tooltipArrow: {
        // positioning
        position: 'absolute',

        top: ['100%', null, '50%'],
        transform: ['translateX(50%) rotate(90deg)', null, 'translateY(-50%)'],
        left: [null, null, '100%'],
        right: ['50%', null, 'initial'],
        marginLeft: [null, null, 'inc20'],
        marginTop: ['-12px', null, 'initial'],

        // styling
        borderBottom: '8px solid transparent',
        borderTop: '8px solid transparent',
        borderRight: `8px solid ${theme.colors.background.containerInverse}`,
    } as ThemeUICSSObject,
    tooltipBody: {
        // positioning
        position: 'absolute',
        top: ['100%', null, '50%'],
        transform: ['translateX(50%)', null, 'translateY(-50%)'],
        left: [null, null, '100%'],
        right: ['50%', null, 'initial'],
        marginLeft: [null, null, 'inc30'],
        width: 'max-content',
        maxWidth: [104, null, 208],

        // styling
        bg: 'background.containerInverse',
        color: 'text.inverse',
        borderRadius: 'tooltips',
        padding: ['inc10', null, null, 'inc20'],
        textAlign: 'left',
        fontSize: ['inc00', null, null, 'inc10'],
        lineHeight: ['inc10', null, null, 'inc20'],
        fontFamily: 'body',
        boxShadow: 'level01',
    } as ThemeUICSSObject,
};

const styles = {
    image,
    footer,
    floatingMenu,
    wrapper,
    section,
    ratingSection,
    bodySection,
    defaultHeaderGrid,
    vidOrPodHeaderGrid,
    breadcrumbs,
    vidOrPodContent,
    externalExamples,
    requestBtn,
    footerActions,
    tooltip,
    eventHeaderGrid,
};

export default styles;
