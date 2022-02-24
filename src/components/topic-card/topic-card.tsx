import { BrandedIcon, TypographyScale } from '@mdb/flora';

import { topicCardStyles, iconStyles } from './styles';
import { TopicCardProps } from './types';

const TopicCard: React.FunctionComponent<TopicCardProps> = ({
    label,
    icon,
}) => {
    return (
        <div sx={topicCardStyles}>
            <BrandedIcon sx={iconStyles} name={icon} />
            <TypographyScale variant="body3">{label}</TypographyScale>
        </div>
    );
};

export default TopicCard;
