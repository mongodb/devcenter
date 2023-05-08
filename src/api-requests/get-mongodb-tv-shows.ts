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

    try {
        const req = await fetch(
            'https://data.mongodb-api.com/app/mongodb-tv-app-bsvzg/endpoint/api/epg',
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    apiKey,
                },
            }
        );
        const shows: MongoDBTVShow[] = await req.json();
        // Don't want to include shows that have aired in the past for now.
        const currentTime = new Date();
        return shows.filter(show => new Date(show.till) > currentTime);
    } catch (e) {
        Sentry.captureException(e);
        throw new Error('Failed to fetch MongoDB TV content.');
    }
};

export const getMongoDBTVShowBySlug = async (
    slug: string
): Promise<MongoDBTVShow | null> => {
    const allMongoDBTVShows = await getAllMongoDBTVShows();
    const show = allMongoDBTVShows.find(
        show => '/videos/' + slugify(show.title) === slug
    );

    return show || null;
};
