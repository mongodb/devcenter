import { ThirdPartyLogo, BrandedIcon } from '@mdb/flora';
import { TopicCardProps } from '@mdb/devcenter-components';
import { iconStyles } from '../components/topic-cards-container/styles';
import { technologyToLogo } from './technology-to-logo';
import { productToLogo } from './product-to-logo';
import { languageToLogo } from './language-to-logo';
import { Tag } from '../interfaces/tag';
import { getURLPath } from './format-url-path';

export const tagToTopic = (tag: Tag): TopicCardProps => {
    let icon: JSX.Element | null = null;
    const href = tag.slug ? getURLPath(tag.slug) : undefined;

    if (tag.type === 'Technology' && tag.name === 'Serverless') {
        icon = <BrandedIcon sx={iconStyles} name="atlas_serverless" />;
    } else if (tag.type === 'Technology' && tag.name === 'Mobile') {
        icon = <BrandedIcon sx={iconStyles} name="misc_mobile" />;
    } else if (
        tag.type === 'Technology' ||
        tag.type === 'ProgrammingLanguage'
    ) {
        const iconName =
            tag.type === 'Technology'
                ? technologyToLogo[tag.name]
                : languageToLogo[tag.name];
        icon = iconName ? (
            <ThirdPartyLogo sx={iconStyles} variant={iconName} href={href} />
        ) : null;
    } else if (tag.type === 'L1Product' || tag.type === 'L2Product') {
        const iconName = productToLogo[tag.name];
        icon = iconName ? (
            <BrandedIcon sx={iconStyles} name={iconName} />
        ) : null;
    }

    return {
        title: tag.name,
        icon,
        href,
    };
};
