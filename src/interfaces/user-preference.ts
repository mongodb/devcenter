import { Tag } from './tag';

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    followedTags?: Tag[] | null;
    lastLogin: string | null;
    emailPreference: boolean;
}
