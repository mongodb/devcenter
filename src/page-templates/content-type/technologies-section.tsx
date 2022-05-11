import { ITopicCard } from '../../components/topic-card/types';
import { ThirdPartyLogo, EThirdPartyLogoVariant } from '@mdb/flora';
import { iconStyles } from '../../components/topic-card/styles';
import { TopicCardsContainer } from '../../components/topic-card';

interface TechnologiesSectionProps {
    title: string;
    items: ITopicCard[];
}

const TechnologiesSection: React.FunctionComponent<
    TechnologiesSectionProps
> = ({ title, items }) => {
    const itemsWithIcons = items.map(item => {
        const image = (
            <ThirdPartyLogo
                sx={iconStyles}
                variant={item.icon as EThirdPartyLogoVariant}
            />
        );
        return {
            ...item,
            icon: image,
        };
    });
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
