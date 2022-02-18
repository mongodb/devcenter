import React from 'react';
import { ESystemIconNames } from '@mdb/flora';
import { BreadcrumbsProps } from '../interfaces/components/breadcrumbs';

import {
    Breadcrumb,
    BreadcrumbsContainer,
    StyledLink,
    StyledEyebrow,
    StyledIcon,
} from '../styled/breadcrumbs';

const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({ crumbs }) => {
    const crumbLength = crumbs.length;
    return (
        <BreadcrumbsContainer>
            {crumbs.map(({ text, url }, i) => (
                <Breadcrumb key={text}>
                    <StyledLink navItem={true} href={url}>
                        <StyledEyebrow>{text}</StyledEyebrow>
                    </StyledLink>
                    {i < crumbLength - 1 && (
                        <StyledIcon
                            color="success"
                            strokeWeight="medium"
                            name={ESystemIconNames.CHEVRON_RIGHT}
                        ></StyledIcon>
                    )}
                </Breadcrumb>
            ))}
        </BreadcrumbsContainer>
    );
};

export default Breadcrumbs;
