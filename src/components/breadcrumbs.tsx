import React from 'react';
import { ESystemIconNames } from '@mdb/flora';
import { BreadcrumbsProps } from '../interfaces/components/breadcrumbs';

import {
    BreadcrumbsContainer,
    StyledLink,
    StyledEyebrow,
    StyledIcon,
} from '../styled/breadcrumbs';

const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({ crumbs }) => {
    const crumbLength = crumbs.length;
    return (
        <BreadcrumbsContainer>
            {crumbs.map((crumb, i) => (
                <>
                    <StyledLink navItem={true} href={crumb.url} key={i}>
                        <StyledEyebrow>{crumb.text}</StyledEyebrow>
                    </StyledLink>
                    {i < crumbLength - 1 && (
                        <StyledIcon
                            key={i}
                            color="success"
                            strokeWeight="medium"
                            name={ESystemIconNames.CHEVRON_RIGHT}
                        ></StyledIcon>
                    )}
                </>
            ))}
        </BreadcrumbsContainer>
    );
};

export default Breadcrumbs;
