import { TertiaryNavItem } from '../components/tertiary-nav/types';
import { MetaInfo } from '../interfaces/meta-info';
import { ESystemIconNames, SystemIcon } from '@mdb/flora';

export const appendDocumentationLinkToSideNav = (
    tertiaryNavItems: TertiaryNavItem[],
    metaInfoForTopic: MetaInfo | null
) => {
    if (metaInfoForTopic && metaInfoForTopic.documentationLink) {
        tertiaryNavItems.push({
            title: 'Documentation',
            url: metaInfoForTopic.documentationLink,
        });
    }
    return tertiaryNavItems.sort((a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
};

export const addExternalIconToSideNav = (
    tertiaryNavItems: TertiaryNavItem[],
    linkTitle: string
) => {
    const icon = (
        <div
            sx={{
                fill: 'blue60',
                stroke: 'blue60',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <SystemIcon name={ESystemIconNames.EXTERNAL} inheritColor />
        </div>
    );

    tertiaryNavItems.forEach(item => {
        if (item.title.toLowerCase() === linkTitle.toLowerCase()) {
            item.icon = icon;
        }
    });
    return tertiaryNavItems;
};
