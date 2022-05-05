import { useState } from 'react';

import { ESystemIconNames, HorizontalRule, SystemIcon } from '@mdb/flora';
import { myData } from '../../data/secondary-nav';
import {
    SecondaryLinks,
    StyledFloraLink,
    StyledSecondaryNavContainer,
    MainLinkStyles,
    MainLink,
} from '../secondarynavdup/styles';

import SecondaryLinksList from '../secondarynavdup/nav-item';
import DropDownMenu from '../secondarynavdup/dropdown-menu';

const linkWrapperStyles = {
    position: 'relative' as 'relative',
    padding: 0,
};

const DropDownButton = ({ path, text, dropdownItems }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div sx={linkWrapperStyles}>
                {/* Topics */}
                <StyledFloraLink onClick={onClickShowMenu}>
                    {text}
                    {!isOpen && (
                        <SystemIcon
                            sx={{
                                paddingLeft: 'inc10',
                                display: ['none', 'none', 'none', 'inline'],
                            }}
                            name={ESystemIconNames.CHEVRON_DOWN}
                            size="small"
                        />
                    )}
                    {isOpen && (
                        <SystemIcon
                            sx={{
                                paddingLeft: 'inc10',
                                display: ['none', 'none', 'none', 'inline'],
                            }}
                            name={ESystemIconNames.CHEVRON_UP}
                            size="small"
                        />
                    )}
                </StyledFloraLink>
            </div>
            {isOpen && <DropDownMenu items={dropdownItems} />}
        </>
    );
};

const DesktopView = () => (
    <>
        <StyledSecondaryNavContainer>
            <div sx={linkWrapperStyles}>
                <MainLink sx={MainLinkStyles}>Developer Center</MainLink>
            </div>

            <SecondaryLinks>
                {myData.map(({ name, slug, dropDownItems }) => (
                    <SecondaryLinksList key={name}>
                        {dropDownItems?.length ? (
                            <DropDownButton
                                path={slug}
                                text={name}
                                dropdownItems={dropDownItems}
                            />
                        ) : (
                            <>
                                <div sx={linkWrapperStyles}>
                                    <StyledFloraLink href={slug}>
                                        {name}
                                    </StyledFloraLink>
                                </div>
                            </>
                        )}
                    </SecondaryLinksList>
                ))}
            </SecondaryLinks>
        </StyledSecondaryNavContainer>
    </>
);

export default DesktopView;
