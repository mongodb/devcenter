import React, { useState } from 'react';

import {
    SecondaryLinks,
    StyledFloraLink,
    StyledSecondaryNavContainer,
    MainLinkStyles,
    MainLink,
} from './styles';
import secondaryNavData from '../../data/secondary-nav';
import SecondaryLinksList from './nav-item';
import DropDownMenu from './dropdown-menu';
import { HorizontalRule, SystemIcon } from '@mdb/flora';

const chevronStylesForMainLink = () => {
    return {
        display: ['inline', 'inline', 'inline', 'none'],
        position: 'absolute',
        right: ['inc40', 'inc50', 'inc50', 0],
        stroke: 'icon.system.success',
    };
};

const plusOrMinusStylesForDropDowns = () => {
    return {
        display: ['inline', 'inline', 'inline', 'none'],
        position: 'absolute',
        right: ['inc40', 'inc50', 'inc50', 0],
    };
};

const linkWrapperStyles = () => {
    return {
        position: 'relative',
        paddingLeft: ['inc40', 'inc50', 'inc50', 0],
        paddingRight: ['inc40', 'inc50', 'inc50', 0],
        paddingTop: ['inc30', 'inc30', 'inc30', 0],
        paddingBottom: ['inc30', 'inc30', 'inc30', 0],
    };
};

const mainLinkDividerStyle = () => {
    return {
        display: ['block', 'block', 'block', 'none'],
        borderTopWidth: 'inc20',
        borderColor: 'green60',
    };
};

const secondaryLinkDividerStyle = () => {
    return {
        display: ['block', 'block', 'block', 'none'],
        borderTopWidth: 'inc10',
        borderColor: 'black20',
    };
};

const DropDownButton = ({ path, text, dropdownItems }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div sx={linkWrapperStyles()}>
                <StyledFloraLink onClick={onClickShowMenu}>
                    {text}
                    {!isOpen && (
                        <SystemIcon
                            sx={{
                                paddingLeft: 'inc10',
                                display: ['none', 'none', 'none', 'inline'],
                            }}
                            name="chevron-down"
                            size="small"
                        />
                    )}
                    {!isOpen && (
                        <SystemIcon
                            sx={plusOrMinusStylesForDropDowns()}
                            name="plus"
                            size="medium"
                            color="success"
                        />
                    )}
                    {isOpen && (
                        <SystemIcon
                            sx={{
                                paddingLeft: 'inc10',
                                display: ['none', 'none', 'none', 'inline'],
                            }}
                            name="chevron-up"
                            size="small"
                        />
                    )}
                    {isOpen && (
                        <SystemIcon
                            sx={plusOrMinusStylesForDropDowns()}
                            name="minus"
                            size="medium"
                            color="success"
                        />
                    )}
                </StyledFloraLink>
                {isOpen && <DropDownMenu items={dropdownItems} />}
            </div>
            <HorizontalRule
                sx={secondaryLinkDividerStyle()}
                spacing="none"
                strokeWeight="medium"
            />
        </>
    );
};

const SecondaryNavBarDup: React.FunctionComponent = () => {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const openMobileMenu = () => {
        setMobileMenuIsOpen(!mobileMenuIsOpen);
    };
    return (
        <>
            <StyledSecondaryNavContainer>
                {/*Main Link*/}

                <div sx={linkWrapperStyles()}>
                    <MainLink sx={MainLinkStyles()} onClick={openMobileMenu}>
                        University
                        {!mobileMenuIsOpen && (
                            <SystemIcon
                                sx={chevronStylesForMainLink()}
                                className="chevron-icon"
                                name="chevron-down"
                                size="medium"
                            />
                        )}
                        {mobileMenuIsOpen && (
                            <SystemIcon
                                sx={chevronStylesForMainLink()}
                                className="chevron-icon"
                                name="chevron-up"
                                size="medium"
                            />
                        )}
                    </MainLink>
                </div>
                <HorizontalRule
                    sx={mainLinkDividerStyle()}
                    spacing="none"
                    strokeWeight="medium"
                />

                {/*Secondary Links*/}
                <SecondaryLinks isOpen={mobileMenuIsOpen}>
                    {secondaryNavData.map(({ text, path, dropdownItems }) => (
                        <SecondaryLinksList key={text}>
                            {dropdownItems?.length ? (
                                <DropDownButton
                                    path={path}
                                    text={text}
                                    dropdownItems={dropdownItems}
                                />
                            ) : (
                                <>
                                    <div sx={linkWrapperStyles()}>
                                        <StyledFloraLink href={path}>
                                            {text}
                                        </StyledFloraLink>
                                    </div>
                                    <HorizontalRule
                                        sx={secondaryLinkDividerStyle()}
                                        spacing="none"
                                        strokeWeight="medium"
                                    />
                                </>
                            )}
                        </SecondaryLinksList>
                    ))}
                </SecondaryLinks>
            </StyledSecondaryNavContainer>
        </>
    );
};

export default SecondaryNavBarDup;
