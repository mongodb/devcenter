import React, { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { ESystemIconNames } from '@mdb/flora';
import secondaryNavData, { myData } from '../../data/secondary-nav';
import {
    SecondaryLinks,
    StyledFloraLink,
    StyledSecondaryNavContainer,
    MainLinkStyles,
    MainLink,
} from './styles';

import SecondaryLinksList from './nav-item';
import DropDownMenu from './dropdown-menu';
import { HorizontalRule, SystemIcon } from '@mdb/flora';
import { getSecondaryNavMenu } from '../../service/get-secondary-nav-menu';

const chevronStylesForMainLink = {
    display: ['inline', 'inline', 'inline', 'none'],
    position: 'absolute' as 'absolute',
    right: ['inc40', 'inc50', 'inc50', 0],
    stroke: 'icon.system.success',
};

const plusOrMinusStylesForDropDowns = {
    display: ['inline', 'inline', 'inline', 'none'],
    position: 'absolute' as 'absolute',
    right: ['inc40', 'inc50', 'inc50', 0],
};

const linkWrapperStyles = {
    position: 'relative' as 'relative',
    paddingLeft: ['inc40', 'inc50', 'inc50', 0],
    paddingRight: ['inc40', 'inc50', 'inc50', 0],
    paddingTop: ['inc30', 'inc30', 'inc30', 0],
    paddingBottom: ['inc30', 'inc30', 'inc30', 0],
};

const mainLinkDividerStyle = {
    display: ['block', 'block', 'block', 'none'],
    borderTopWidth: 'inc20',
    borderColor: 'green60',
};

const secondaryLinkDividerStyle = {
    display: ['block', 'block', 'block', 'none'],
    borderTopWidth: 'inc10',
    borderColor: 'black20',
};

const DropDownButton = ({ path, text, dropdownItems }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div sx={linkWrapperStyles}>
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
                    {!isOpen && (
                        <SystemIcon
                            sx={plusOrMinusStylesForDropDowns}
                            name={ESystemIconNames.PLUS}
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
                            name={ESystemIconNames.CHEVRON_UP}
                            size="small"
                        />
                    )}
                    {isOpen && (
                        <SystemIcon
                            sx={plusOrMinusStylesForDropDowns}
                            name={ESystemIconNames.MINUS}
                            size="medium"
                            color="success"
                        />
                    )}
                </StyledFloraLink>
                {isOpen && <DropDownMenu items={dropdownItems} />}
            </div>
            <HorizontalRule
                sx={secondaryLinkDividerStyle}
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

                <div sx={linkWrapperStyles}>
                    <MainLink sx={MainLinkStyles} onClick={openMobileMenu}>
                        Developer Center
                        {!mobileMenuIsOpen && (
                            <SystemIcon
                                sx={chevronStylesForMainLink}
                                className="chevron-icon"
                                name={ESystemIconNames.CHEVRON_DOWN}
                                size="medium"
                            />
                        )}
                        {mobileMenuIsOpen && (
                            <SystemIcon
                                sx={chevronStylesForMainLink}
                                className="chevron-icon"
                                name={ESystemIconNames.CHEVRON_UP}
                                size="medium"
                            />
                        )}
                    </MainLink>
                </div>
                <HorizontalRule
                    sx={mainLinkDividerStyle}
                    spacing="none"
                    strokeWeight="medium"
                />

                {/*Secondary Links*/}
                <SecondaryLinks isOpen={mobileMenuIsOpen}>
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
                                    <HorizontalRule
                                        sx={secondaryLinkDividerStyle}
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

export const getStaticProps: GetStaticProps = async ({}) => {
    const secNav = await getSecondaryNavMenu();
    console.log('hello world', JSON.stringify(secNav));
    return {
        props: {},
    };
};
