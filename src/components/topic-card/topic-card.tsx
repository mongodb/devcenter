import Link from 'next/link';
import { BrandedIcon, TypographyScale } from '@mdb/flora';

import { topicCardStyles, iconStyles } from './styles';
import { TopicCardProps } from './types';

const TopicCard: React.FunctionComponent<TopicCardProps> = ({
    label,
    icon,
    href,
}) => {
    return (
        <Link href={href}>
            <a sx={topicCardStyles} tabIndex={0}>
                <BrandedIcon sx={iconStyles} name={icon} />
                <TypographyScale variant="body3" sx={{ my: 'auto' }}>
                    {label}
                </TypographyScale>
            </a>
        </Link>
    );
};

export default TopicCard;
