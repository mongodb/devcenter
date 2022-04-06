import type { NextPage } from 'next';

import { TopicContentTypePageProps } from './types';

const TopicContentTypePage: NextPage<TopicContentTypePageProps> = ({
    topicSlug,
    contentTypeSlug,
}) => {
    return (
        <div>
            Topic: {topicSlug} | Content type: {contentTypeSlug}
        </div>
    );
};

export default TopicContentTypePage;
