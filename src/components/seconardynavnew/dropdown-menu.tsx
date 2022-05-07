import styled from '@emotion/styled';
import Link from 'next/link';
import theme from '@mdb/flora/theme';
import { Link as FloraLink, TypographyScale, Button } from '@mdb/flora';
import { DropDownWrapper } from './styles';

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

const SubNavLink = ({ name, slug, dropDownItems, path, all }: any) => {
    return (
        <li key={name}>
            {slug ? (
                <Link href={slug} passHref>
                    <a className="dropdown-titles" sx={aLinkStyles} key={name}>
                        {name}
                    </a>
                </Link>
            ) : (
                <TypographyScale inverse variant="body1">
                    {name}
                </TypographyScale>
            )}
            {dropDownItems && (
                <>
                    <SubLinks>
                        {dropDownItems?.map(
                            ({ name, slug, dropDownItems, l1Product }: any) => (
                                <li key={name}>
                                    <Link href={slug} passHref>
                                        <a sx={aLinkStyles} key={name}>
                                            {l1Product ? (
                                                <strong>{name}</strong>
                                            ) : (
                                                name
                                            )}
                                        </a>
                                    </Link>
                                    {dropDownItems && (
                                        <ul>
                                            {dropDownItems?.map(
                                                ({ name, slug }: any) => (
                                                    <li key={name}>
                                                        <Link
                                                            href={slug}
                                                            passHref
                                                        >
                                                            <a
                                                                sx={aLinkStyles}
                                                                key={name}
                                                            >
                                                                {name}
                                                            </a>
                                                        </Link>
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
                        <Link href={path} passHref>
                            <FloraLink
                                inverse
                                linkIcon="chevron"
                                linkIconDisableExpand={true}
                            >
                                {all}
                            </FloraLink>
                        </Link>
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

const DropDownMenu = ({ items }: any) => {
    return (
        <DropDownWrapper>
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
        </DropDownWrapper>
    );
};

export default DropDownMenu;
