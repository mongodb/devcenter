import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { Link as FloraLink, TypographyScale, Button } from '@mdb/flora';
import { getURLPath } from '../../utils/format-url-path';

export interface DropDownItem {
    name: string;
    slug: string;
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
    display: 'inline' as 'inline',
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
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        a:not(:last-child) {
            margin-bottom: ${theme.space.inc40};
        }
    }

    li {
        padding-top: ${theme.space.inc30};
        padding-bottom: ${theme.space.inc30};
        position: relative;
        a:hover {
            color: ${theme.colors.green40};
        }
    }
`;

const SubLinks = styled.ul`
    list-style-type: none;
    padding: 0;

    ul {
        list-style-type: none;
        padding: 0;
        margin-top: ${theme.space.inc30};

        > li {
            position: relative;

            &:last-child {
                display: none;
            }
        }
    }

    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        display: grid;
        grid-column-gap: ${theme.space.inc50};
        grid-template-columns: repeat(3, 1fr);
    }
`;

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
                    <SubLinks>
                        {dropDownItems?.map(
                            ({ name, slug, dropDownItems, l1Product }) => (
                                <li key={name}>
                                    <a
                                        href={getURLPath(slug)}
                                        sx={{
                                            ...aLinkStyles,
                                            fontWeight: [
                                                null,
                                                null,
                                                null,
                                                '700',
                                                '700',
                                            ],
                                        }}
                                        key={name}
                                    >
                                        {l1Product ? (
                                            <strong>{name}</strong>
                                        ) : (
                                            name
                                        )}
                                    </a>
                                    {dropDownItems && (
                                        <ul>
                                            {dropDownItems?.map(
                                                ({ name, slug }) => (
                                                    <li key={name}>
                                                        <a
                                                            href={getURLPath(
                                                                slug
                                                            )}
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
                            )
                        )}
                    </SubLinks>
                    {all && (
                        <FloraLink
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
                    href="example.com"
                    sx={{
                        marginTop: '25px',
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
        display: 'inline-block' as 'inline-block',
        fontSize: 'inc40',
        marginBottom: 'inc40',
    },

    boxShadow: [null, null, null, theme.shadows.level01],
    borderBottomRightRadius: [null, null, null, theme.radii.inc50],
    borderBottomLeftRadius: [null, null, null, theme.radii.inc50],
    backgroundColor: ['#fff', '#fff', '#fff', theme.colors.blue80],
    color: ['#000', '#000', '#000', theme.colors.text.inverse],
    left: [null, null, null, 0],
    marginTop: [null, null, null, theme.space.elementXSmall],
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
    zIndex: [null, null, null, 2],
};

const DropDownMenu = ({ items }: { items: DropDownItem[] }) => {
    return (
        <div sx={StylesDropDownWrapper}>
            <DropDownMenuList>
                {items.map(({ name, slug, all, path, dropDownItems }: any) => (
                    <>
                        <SubNavLink
                            key={name}
                            name={name}
                            slug={slug}
                            all={all}
                            path={path}
                            dropDownItems={dropDownItems}
                        />
                    </>
                ))}
            </DropDownMenuList>
        </div>
    );
};

export default DropDownMenu;
