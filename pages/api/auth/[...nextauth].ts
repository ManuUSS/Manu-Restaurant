import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbUsers } from "database";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    
    CredentialsProvider({
        name: 'Custom login',
        credentials: {
            email: { label: 'Correo', type: 'email', placeholder: 'correo@dominio.com' },
            password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
        },
        async authorize ( credentials ) {
            return dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password ).then();
        }
    }),
    GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {

        if( account ) {
            token.accessToken = account.access_token;

            switch ( account.type ) {
                
                case 'credentials':
                    token.user = user;
                break;
                
                case 'oauth':
                    token.user = await dbUsers.oAuthToDbUser( user?.email || '', user?.name || '' );
                break;

                default:
                    break;
            }
        }
        return token;

    },

    async session({ session, token, user }) {

        session.accessToken = token.accessToken as string;
        session.user = token.user as any;

        return session;

    }

  }
}

export default NextAuth ( authOptions );
