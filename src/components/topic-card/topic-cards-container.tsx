import { Grid } from 'theme-ui';
import { TypographyScale } from '@mdb/flora';

import TopicCard from './topic-card';
import { topicsGridStyles, topicsCardsContainerStyles } from './styles';
import { TopicCardsContainerProps } from './types';

const TopicCardsContainer: React.FunctionComponent<
    TopicCardsContainerProps
> = ({ topics, name }) => (
    <div sx={topicsCardsContainerStyles}>
        <TypographyScale variant="heading5">{name} Topics</TypographyScale>
        <Grid columns={4} sx={topicsGridStyles}>
            {topics.map(topic => (
                <TopicCard key={topic} label={topic} icon="atlas_search" /> // Icon hard coded for now.
            ))}
        </Grid>
    </div>
);
export default TopicCardsContainer;
