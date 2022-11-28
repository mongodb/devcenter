import {
    ITopicCard,
    TopicCardProps,
} from '../../../components/topic-card/types';
import { ThirdPartyLogo, BrandedIcon } from '@mdb/flora';
import { iconStyles } from '../../../components/topic-card/styles';
import { TopicCardsContainer } from '../../../components/topic-card';
import { technologyToLogo } from '../../../utils/technology-to-logo';

interface TechnologiesSectionProps {
    title: string;
    items: ITopicCard[];
}

export const topicWithIcon = (
    item: ITopicCard | TopicCardProps
): TopicCardProps => {
    const hasLogo = item.title === 'Serverless' || technologyToLogo[item.title];
    let icon: JSX.Element | null = null;
    if (hasLogo) {
        // Really annoying, but we have a special case where we use a branded icon for serverless.
        if (item.title === 'Serverless') {
            icon = <BrandedIcon sx={iconStyles} name="atlas_serverless" />;
        } else {
            icon = (
                <ThirdPartyLogo
                    sx={iconStyles}
                    variant={technologyToLogo[item.title]}
                    href={item.href}
                />
            );
        }
    }

    return {
        ...item,
        icon,
    };
};

const TechnologiesSection: React.FunctionComponent<
    TechnologiesSectionProps
> = ({ title, items }) => {
    const itemsWithIcons = items.map(topicWithIcon);
    return (
        <div
            sx={{
                marginBottom: ['section20', null, null, 'section40'],
            }}
        >
            <div
                sx={{
                    display: 'flex',
                    gap: ['inc30', null, 'inc40'],
                }}
            >
                <TopicCardsContainer
                    topics={itemsWithIcons}
                    title={title}
                    sx={{ width: '100%' }}
                />
            </div>
        </div>
    );
};

export default TechnologiesSection;
