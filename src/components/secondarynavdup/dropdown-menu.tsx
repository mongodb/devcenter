import Link from 'next/link';
import { DropDownMenuList, DropDownWrapper } from './styles';

const aLinkStyles = () => {
    return {
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
};

const DropDownMenu = ({ items }: any) => (
    <DropDownWrapper>
        <DropDownMenuList>
            {items.map(({ name, slug, dropDownItems }: any) => (
                <li key={name}>
                    {slug ? (
                        <Link href={slug} passHref>
                            <a
                                className="dropdown-titles"
                                sx={aLinkStyles()}
                                key={name}
                            >
                                {name}
                            </a>
                        </Link>
                    ) : (
                        <p>{name}</p>
                    )}
                    {dropDownItems && (
                        <ul>
                            {dropDownItems.map(({ name, slug }: any) => (
                                <li key={name}>
                                    <Link href={slug} passHref>
                                        <a sx={aLinkStyles()} key={name}>
                                            {name}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </DropDownMenuList>
    </DropDownWrapper>
);

export default DropDownMenu;
