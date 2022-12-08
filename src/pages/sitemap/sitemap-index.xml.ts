import fs from 'fs';
import path from 'path';
import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import allContentPreval from '../../service/get-all-content.preval';
import { getTopicPagePathMappings } from '../../service/get-topic-paths';

const DEVCENTER_URL = 'https://mongodb.com/developer';

export const getServerSideProps: GetServerSideProps = async context => {
    const curDate = new Date().toISOString();

    const { topicContentTypePaths, topicPaths } =
        await getTopicPagePathMappings();

    const staticPages = fs
        .readdirSync('src/pages', { withFileTypes: true })
        .filter(
            dirent =>
                dirent.isFile() &&
                !(dirent.name.startsWith('_') || dirent.name.startsWith('[')) &&
                !dirent.name.includes('index')
        )
        .map(dirent => ({
            loc: `${DEVCENTER_URL}/${path.parse(dirent.name).name}`,
            lastmod: curDate,
            priority: 1.0,
        }));

    const topicPages = [
        ...Object.keys(topicContentTypePaths),
        ...Object.keys(topicPaths),
    ].map(path => ({
        loc: `${DEVCENTER_URL}/${path}`,
        lastmod: curDate,
        priority: 0.7,
    }));

    const contentPages = allContentPreval.map(({ slug, contentDate }) => ({
        loc: `${DEVCENTER_URL}/${slug}`,
        lastmod: contentDate || curDate,
        priority: 0.5,
    }));

    return getServerSideSitemap(context, [
        ...staticPages,
        ...topicPages,
        ...contentPages,
    ]);
};

function Sitemap() {
    // do nothing
};
export default Sitemap;
