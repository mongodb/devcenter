import GithubProvider from 'next-auth/providers/github';
import NextAuth from 'next-auth';

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: 'afc4427410c1263c56d4',
            clientSecret: 'e197d4e6acc5448415e4422b421ec28cc8ea04b6',
        }),
    ],
});
