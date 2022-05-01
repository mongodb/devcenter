import styled from '@emotion/styled';
import Link from 'next/link';
import { DropDownMenuList, DropDownWrapper } from './styles';
import theme from '@mdb/flora/theme';

const aLinkStyles = {
    display: 'block',
    fontSize: 'inc20',
    fontFamily: 'euclid-circular-a',
    fontWeight: 300,
    paddingTop: ['inc40', 'inc40', 'inc40', 0],
    paddingBottom: ['inc40', 'inc40', 'inc40', 0],
    paddingLeft: ['inc70', 'inc70', 'inc70', 0],
    '&:hover': {
        color: 'text.selected',
    },
};

const SubLinks = styled.ul`
    list-style-type: none;
    padding: 0;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
`;

const DropDownMenu = ({ items }: any) => (
    <DropDownWrapper>
        <DropDownMenuList>
            {items.map(({ name, slug, all, path, dropDownItems }: any) => (
                <>
                    <li key={name}>
                        {slug ? (
                            <Link href={slug} passHref>
                                <a
                                    className="dropdown-titles"
                                    sx={aLinkStyles}
                                    key={name}
                                >
                                    {name}
                                </a>
                            </Link>
                        ) : (
                            <p>{name}</p>
                        )}
                        {dropDownItems && (
                            <>
                                <SubLinks>
                                    {dropDownItems.map(
                                        ({ name, slug }: any) => (
                                            <li key={name}>
                                                <Link href={slug} passHref>
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
                                </SubLinks>
                                <Link href={path} passHref>
                                    <a sx={aLinkStyles}>{all}</a>
                                </Link>
                            </>
                        )}
                    </li>
                </>
            ))}
        </DropDownMenuList>
    </DropDownWrapper>
);

export default DropDownMenu;
