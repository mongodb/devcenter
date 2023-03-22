import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { Link as FloraLink, TypographyScale, Button } from '@mdb/flora';
import { getURLPath } from '../../utils/format-url-path';
import { layers } from '../../styled/layout';

export interface DropDownItem {
    name: string;
    slug?: string;
    all: string;
    path: string;
    dropDownItems: DropDownItem2[];
}

export interface DropDownItem2 {
    name: string;
    l1Product?: boolean;
    slug: string;
    dropDownItems?: DropDownItem3[];
}

interface DropDownItem3 {
    name: string;
    slug: string;
}

const aLinkStyles = {
    display: 'inline',
    alignItems: 'center',
    fontSize: 'inc20',
    fontFamily: 'euclid-circular-a',
    fontWeight: 300,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    '&:hover': {
        color: 'text.selected',
    },
};

const DropDownMenuList = styled.ul`
    list-style-type: none;
    padding: 0;
    white-space: nowrap;
    font-weight: 500;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        a:not(:last-child) {
            margin-bottom: ${theme.space.inc40};
        }

        li:nth-of-type(3) {
            padding-bottom: 0;
        }

        li:nth-of-type(4) {
            padding-bottom: 0;
        }
    }

    li {
        padding-bottom: ${theme.space.inc50};
        position: relative;
        a:hover {
            color: ${theme.colors.green40};
        }

        ul {
            margin-top: ${theme.space.inc50};
            margin-bottom: ${theme.space.inc30};
        }
    }

    li:nth-of-type(2) {
        margin-right: 0;
    }
`;

const subLinkStyles = {
    listStyleType: 'none',
    padding: 0,
    marginTop: 'inc30',
    display: [null, null, null, 'grid'],
    gridColumnGap: [null, null, null, 'inc70', 'inc90'],
    gridTemplateColumns: [null, null, null, 'repeat(3, 1fr)'],
    marginRight: [null, null, null, 'inc90', 'inc130'],
};

const SubNavLink = ({ name, slug, dropDownItems, path, all }: DropDownItem) => {
    return (
        <li key={name}>
            {slug ? (
                <a
                    href={getURLPath(slug)}
                    className="dropdown-titles"
                    sx={aLinkStyles}
                    key={name}
                >
                    {name}
                </a>
            ) : (
                <TypographyScale inverse variant="body1">
                    {name}
                </TypographyScale>
            )}
            {dropDownItems && (
                <>
                    <ul sx={subLinkStyles}>
                        {dropDownItems?.map(({ name, slug, dropDownItems }) => (
                            <li
                                sx={{
                                    position: 'relative',
                                }}
                                key={name}
                            >
                                <a
                                    href={getURLPath(slug)}
                                    sx={{
                                        ...aLinkStyles,
                                    }}
                                    key={name}
                                >
                                    {name}
                                </a>
                                {!!dropDownItems?.length && (
                                    <ul>
                                        {dropDownItems?.map(
                                            ({ name, slug }) => (
                                                <li key={name}>
                                                    <a
                                                        href={getURLPath(slug)}
                                                        sx={aLinkStyles}
                                                        key={name}
                                                    >
                                                        {name}
                                                    </a>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    {all && (
                        <FloraLink
                            sx={{
                                display: 'inline-block',
                                marginBottom: theme.space.inc50,
                            }}
                            href={getURLPath(path)}
                            inverse
                            linkIcon="chevron"
                            linkIconDisableExpand={true}
                        >
                            {all}
                        </FloraLink>
                    )}
                </>
            )}
            {name.includes('Expertise Levels') && (
                <Button
                    href={getURLPath('topics')}
                    sx={{
                        marginTop: '25px',
                        px: 'inc70',
                        py: 'inc30',
                        '&:hover': {
                            color: 'initial!important',
                        },
                    }}
                    variant="primary"
                >
                    All Topics
                </Button>
            )}
        </li>
    );
};

const StylesDropDownWrapper = {
    '.dropdown-titles': {
        display: 'inline-block',
        fontSize: 'inc40',
        marginBottom: 'inc40',
    },

    boxShadow: [null, null, null, theme.shadows.level01],
    borderBottomRightRadius: [null, null, null, theme.radii.inc50],
    borderBottomLeftRadius: [null, null, null, theme.radii.inc50],
    backgroundColor: ['#fff', '#fff', '#fff', theme.colors.blue80],
    color: ['#000', '#000', '#000', theme.colors.text.inverse],
    left: [null, null, null, 0],
    top: [null, null, null, '66px', '70px', '70px'],
    position: ['initial', 'initial', 'initial', 'absolute'] as [
        'initial',
        'initial',
        'initial',
        'absolute'
    ],
    paddingTop: [null, null, null, theme.space.inc70],
    paddingBottom: [null, null, null, theme.space.inc70],
    paddingRight: [null, null, null, theme.space.inc90],
    paddingLeft: ['inc50', 'inc50', 'inc50', theme.space.inc90],
    zIndex: [null, null, null, layers.secondaryNav],
};

const DropDownMenu = ({ items }: { items: DropDownItem[] }) => {
    return (
        <div sx={StylesDropDownWrapper}>
            <DropDownMenuList>
                {items.map(({ name, slug, all, path, dropDownItems }: any) => (
                    <SubNavLink
                        key={`${name} (${slug})`}
                        name={name}
                        slug={slug}
                        all={all}
                        path={path}
                        dropDownItems={dropDownItems}
                    />
                ))}
            </DropDownMenuList>
        </div>
    );
};

export default DropDownMenu;
