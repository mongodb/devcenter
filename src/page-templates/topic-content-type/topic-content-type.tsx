import type { NextPage } from 'next';
import { SideNav, GridLayout, Eyebrow, TypographyScale } from '@mdb/flora';

import { TopicContentTypePageProps } from './types';
import TertiaryNav from '../../components/tertiary-nav';

const sideNavStyles = (rowCount: number) => ({
    display: ['none', null, null, null, 'block'],
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 3'],
    nav: {
        position: 'static' as 'static',
    },
    // We have a variable amount of rows, but should have at least 3. If this is problematic, maybe we calculate the rows
    // before render and update this accordingly.
    gridRow: [null, null, null, null, `span ${rowCount}`],
});

const sideNavTitleStyles = {
    borderLeft: 'solid',
    borderWidth: '2px',
    borderColor: 'black20',
    paddingBottom: 'inc30',
    px: 'inc60',
};

const TopicContentTypePage: NextPage<TopicContentTypePageProps> = ({
    contentType,
    tertiaryNavItems,
    topicName,
    subTopics,
}) => {
    const mainGridDesktopRowsCount = subTopics.length > 0 ? 3 : 2;
    return (
        <>
            <TertiaryNav items={tertiaryNavItems} topic={topicName} />
            <div
                sx={{
                    paddingBottom: 'inc160',
                    px: ['inc40', null, 'inc50', 'inc70'],
                    paddingTop: ['inc40', null, 'inc50', 'inc70'],
                }}
            >
                <GridLayout
                    sx={{
                        rowGap: ['inc90', null, null, 'inc130'],
                    }}
                >
                    <div sx={sideNavStyles(mainGridDesktopRowsCount)}>
                        <TypographyScale
                            variant="heading6"
                            sx={sideNavTitleStyles}
                        >
                            {topicName}
                        </TypographyScale>

                        <SideNav currentUrl="#" items={tertiaryNavItems} />
                    </div>
                    <div>
                        <Eyebrow>{topicName}</Eyebrow>
                        <TypographyScale
                            variant="heading2"
                            sx={{
                                marginBottom: ['inc20', null, null, 'inc40'],
                            }}
                        >
                            {contentType}s
                        </TypographyScale>
                    </div>
                </GridLayout>
            </div>
        </>
    );
};

export default TopicContentTypePage;
