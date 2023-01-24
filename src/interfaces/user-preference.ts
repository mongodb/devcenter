import { TagType } from '../types/tag-type';

export interface UserPreference {
    tag_name: string;
    category: TagType;
    slug: string;
}

export interface User {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    preferences?: UserPreference[] | null;
    last_login: string | null;
    email_preference: boolean;
}
