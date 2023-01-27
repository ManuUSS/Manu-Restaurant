import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    
    CredentialsProvider({
        name: 'Custom login',
        credentials: {
            email: { label: 'Correo', type: 'email', placeholder: 'correo@dominio.com' },
            password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
        },
        async authorize ( credentials ) {
            return null;
        }
    }),
    GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
  ],
  callbacks: {
    
  }
}

export default NextAuth(authOptions);