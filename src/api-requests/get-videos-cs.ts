import { UnderlyingClient } from '../types/client-factory';
import { Video } from '../interfaces/video';
import { OtherTags } from '../interfaces/other-tags';
import { GenericTagTypeResponse } from '../interfaces/tag-type-response';
import { CSEdges, CSVideo } from '../interfaces/contentstack';

import { allVideosQuery, videoBySlugQuery } from '../graphql/videos';
import {
    fetchAll,
    extractFieldsFromNode,
    extractFieldsFromNodes,
    getOtherTags,
    getSEO,
} from './utils';

const formatResponses = (csVideos: CSVideo[]): Video[] => {
    return csVideos.map(v => ({
        // explicitly defined instead of using spread operator
        // to ensure default value for undefined
        description: v.description ? v.description : '',
        publishDate: v.publishDate ? v.publishDate : '',
        title: v.title ? v.title : '',
        slug: v.slug ? v.slug : '',
        videoId: v.videoId ? v.videoId : '',
        // relevantLinks follow old format to return null value
        // but cast as string to conform to the interface
        relevantLinks: (v.relevantLinks ? v.relevantLinks : null) as string,
        l1Product: extractFieldsFromNode(v.l1Product as CSEdges<any>, [
            'name',
            'calculatedSlug',
        ]) as GenericTagTypeResponse,
        l2Product: extractFieldsFromNode(v.l2Product as CSEdges<any>, [
            'name',
            'calculatedSlug',
        ]) as GenericTagTypeResponse,
        programmingLanguage: extractFieldsFromNodes(
            v.programmingLanguage as CSEdges<any>,
            ['name', 'calculatedSlug']
        ) as GenericTagTypeResponse[],
        technology: extractFieldsFromNodes(v.technology as CSEdges<any>, [
            'name',
            'calculatedSlug',
        ]) as GenericTagTypeResponse[],
        otherTags: getOtherTags(v.otherTags) as OtherTags,
        seo: getSEO(v.seo),
    }));
};

const getAllVideosFromAPI = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<Video[]> => {
    const podcasts = (await fetchAll(
        client,
        allVideosQuery,
        'videos'
    )) as CSVideo[];
    const data = formatResponses(podcasts);

    return data;
};

export const getVideoBySlugFromAPI = async (
    client: UnderlyingClient<'ApolloGraphQL'>,
    slug: string
): Promise<Video | null> => {
    const variables = { slug };
    const videos = (await fetchAll(
        client,
        videoBySlugQuery,
        'videos',
        variables
    )) as CSVideo[];

    if (!videos) {
        return null;
    }

    const data = formatResponses(videos)[0];
    return data;
};

export default getAllVideosFromAPI;
