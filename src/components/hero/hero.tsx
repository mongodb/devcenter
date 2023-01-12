import React, { memo } from 'react';

import {
    TypographyScale,
    GridLayout,
    Link,
    SystemIcon,
    ESystemIconNames,
} from '@mdb/flora';

import Breadcrumbs from '../breadcrumbs';
import { HeroProps } from './types';
import { heroContainerStyles } from './styles';

const Hero: React.FunctionComponent<HeroProps> = memo(
    ({ crumbs, name, description, ctas }) => {
        let pageType;
        let showFollowLink = false;

        //TODO: mock logged in/out state and following/not following state

        if (crumbs) {
            pageType = crumbs[crumbs.length - 1].text;
        }

        if (
            pageType === 'Languages' ||
            pageType === 'Technologies' ||
            pageType === 'Products'
        ) {
            showFollowLink = true;
        }

        const linkStyles = {
            '&:hover': {
                // color: 'text.selected',
            },
        };

        // const [showTooltip, setShowTooltip] = useState(false);

        const onFollowLinkClick = () => {
            // TODO: change state
            // setShowTooltip(true);
            // setTimeout(() => setShowTooltip(false), 2000);
        };

        return (
            <div sx={heroContainerStyles}>
                <GridLayout sx={{ rowGap: 'inc30' }}>
                    {crumbs && <Breadcrumbs crumbs={crumbs} />}
                    <div sx={{ gridColumn: ['span 6', null, 'span 5'] }}>
                        <TypographyScale
                            customElement="h1"
                            variant="heading2"
                            color="mark"
                            sx={{
                                marginBottom: ['inc20', null, null, 'inc40'],
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '16px',
                            }}
                        >
                            {name}
                            {/* <div sx={{ position: 'relative' }}>
                            <Tooltip
                                text={
                                    'Receive a monthly digest and recommended content based on topics you follow!'
                                }
                                arrowDirection={'left-center'}
                            > */}
                            {showFollowLink && (
                                <Link
                                    // linkIconColor="#006CFA"
                                    sx={{ linkStyles }}
                                    onClick={onFollowLinkClick}
                                >
                                    <SystemIcon //TODO: fix color
                                        name={ESystemIconNames.PLUS}
                                        inheritColor
                                    />
                                    &nbsp;Follow
                                </Link>
                            )}
                            {/* </Tooltip>
                            {showTooltip && (
                                <div sx={tooltipStyles.tooltipWrapper}>
                                    <div sx={tooltipStyles.tooltipArrow} />
                                    <div sx={tooltipStyles.tooltipBody}>
                                        You are now following this topic
                                    </div>
                                </div>
                            )} 
                            </div> */}
                        </TypographyScale>
                        {!!description && (
                            <TypographyScale variant="body2">
                                {description}
                            </TypographyScale>
                        )}
                    </div>
                    {ctas}
                </GridLayout>
            </div>
        );
    }
);

Hero.displayName = 'Hero';

export default Hero;
