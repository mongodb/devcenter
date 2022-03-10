import { Grid } from 'theme-ui';
import { TypographyScale } from '@mdb/flora';

import TopicCard from '.';
import { topicsGridStyles, topicsCardsContainerStyles } from './styles';
import { TopicCardsContainerProps } from './types';

const TopicCardsContainer: React.FunctionComponent<
    TopicCardsContainerProps
> = ({ topics, title }) => (
    <div sx={topicsCardsContainerStyles}>
        <TypographyScale variant="heading5">{title}</TypographyScale>
        <Grid columns={4} sx={topicsGridStyles}>
            {topics.map(topic => (
                <TopicCard key={topic.title} {...topic} /> // Icon hard coded for now.
            ))}
        </Grid>
    </div>
);
export default TopicCardsContainer;
