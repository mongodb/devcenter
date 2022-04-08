import Link from 'next/link';
import { BrandedIcon, TypographyScale } from '@mdb/flora';

import { topicCardStyles, iconStyles } from './styles';
import { ITopicCard } from './types';

const TopicCard: React.FunctionComponent<ITopicCard> = ({
    name,
    icon,
    href,
}) => {
    return (
        <Link href={href} passHref={true}>
            <a sx={topicCardStyles} tabIndex={0}>
                <BrandedIcon sx={iconStyles} name={icon} />
                <TypographyScale variant="body3" sx={{ my: 'auto' }}>
                    {name}
                </TypographyScale>
            </a>
        </Link>
    );
};

export default TopicCard;
