import { DefaultSession } from 'next-auth';
import { Tag } from './src/interfaces/tag';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        /** Default user values built in with Oauth provider. */
        user: DefaultSession['user'];
        expires: string;
        /** Custom: The user's first name. */
        firstName: string;
        /** Custom: The user's last name. */
        lastName: string;
        /** Custom: The user's email address, taken from profile. */
        email: string;
        /** additional fields added as part of personalization **/
        followedTags?: Tag[] | null;
        lastLogin: string | null;
        emailPreference: boolean;
        failedToFetch?: boolean;
    }

    interface Profile {
        /** Custom: The user's first name. */
        firstName: string;
        /** Custom: The user's last name. */
        lastName: string;
        /** Custom: The user's email address, taken from profile. */
        email: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        firstName: string;
        /** Custom: The user's last name. */
        lastName: string;
        /** Custom: The user's email address, taken from profile. */
        email: string;
        userId?: string;
    }
}
