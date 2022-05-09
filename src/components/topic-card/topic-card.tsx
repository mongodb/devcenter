import { TypographyScale } from '@mdb/flora';

import { topicCardStyles } from './styles';
import { TopicCardProps } from './types';

const TopicCard: React.FunctionComponent<TopicCardProps> = ({
    title,
    icon,
    href,
}) => {
    return (
        <div sx={{ ...topicCardStyles, position: 'relative' }} tabIndex={0}>
            {/* Sometimes the icon itself can be a link, so we need this absolute wrapping element */}
            <a
                href={href}
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0,
                }}
            />
            {icon}
            <TypographyScale variant="body3" sx={{ my: 'auto' }}>
                {title}
            </TypographyScale>
        </div>
    );
};

export default TopicCard;
