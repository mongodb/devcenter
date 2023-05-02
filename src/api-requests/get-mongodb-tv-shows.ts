import { MongoDBTVShow } from '../interfaces/mongodb-tv';
import * as Sentry from '@sentry/nextjs';
import { slugify } from '../service/build-content-items';

export const getAllMongoDBTVShows = async (): Promise<MongoDBTVShow[]> => {
    const apiKey = process.env.MONGODB_TV_API_KEY;
    if (!apiKey) {
        const e = new Error('MONGODB_TV_API_KEY is not defined.');
        Sentry.captureException(e);
        throw e;
    }
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            apiKey,
        },
    };

    try {
        const req = await fetch(
            'https://data.mongodb-api.com/app/mongodb-tv-app-bsvzg/endpoint/api/epg',
            options
        );
        return req.json();
    } catch (e) {
        Sentry.captureException(e);
        throw new Error('Failed to fetch MongoDB TV content.');
    }
};

export const getMongoDBTVShowBySlug = async (
    slug: string
): Promise<MongoDBTVShow> => {
    const allMongoDBTVShows = await getAllMongoDBTVShows();
    const show = allMongoDBTVShows.find(
        show => '/videos/' + slugify(show.title) === slug
    );
    if (!show) {
        const e = new Error(
            `Could not find MongoDBTV show with slug "${slug}"`
        );
        Sentry.captureException(e);
        throw e;
    }
    return show;
};
