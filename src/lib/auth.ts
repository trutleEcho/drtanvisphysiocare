import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  password: string;
  createdAt: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // In a real app, you'd validate against your database
        // For now, we'll use a simple check
        if (credentials.email === "admin@healthcare.com" && credentials.password === "admin123") {
          return {
            id: "1",
            email: credentials.email,
            name: "Healthcare Admin",
            role: "admin",
          }
        }

        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user } ) {
      if (user) {
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        // session.user.id = token.sub
        // session.user.role = token.role
      }
      return session
    },
  },
}
