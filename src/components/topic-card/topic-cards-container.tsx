import { Grid } from 'theme-ui';
import { TypographyScale } from '@mdb/flora';

import TopicCard from '.';
import { topicsGridStyles, topicsCardsContainerStyles } from './styles';
import { TopicCardsContainerProps } from './types';

const TopicCardsContainer: React.FunctionComponent<
    TopicCardsContainerProps
> = ({ topics, title, className }) => (
    <div sx={topicsCardsContainerStyles} className={className}>
        <TypographyScale variant="heading5">{title}</TypographyScale>
        <Grid columns={4} sx={topicsGridStyles}>
            {topics.map(topic => (
                <TopicCard key={topic.href} {...topic} />
            ))}
        </Grid>
    </div>
);
export default TopicCardsContainer;
