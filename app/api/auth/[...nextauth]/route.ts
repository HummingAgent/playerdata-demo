import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Demo users - in production this would be a database
const users = [
  {
    id: "1",
    name: "Luke Wiseman",
    email: "luke@playerdata.com",
    password: bcrypt.hashSync("playerdata2026", 10),
    role: "admin",
  },
  {
    id: "2", 
    name: "Roy Thompson",
    email: "roy@playerdata.com",
    password: bcrypt.hashSync("playerdata2026", 10),
    role: "admin",
  },
  {
    id: "3",
    name: "Shawn Kercher",
    email: "shawn@hummingagent.ai",
    password: bcrypt.hashSync("demo2026", 10),
    role: "admin",
  },
  {
    id: "4",
    name: "Joey Kercher",
    email: "joey@hummingagent.ai",
    password: bcrypt.hashSync("demo2026", 10),
    role: "admin",
  },
  {
    id: "5",
    name: "Demo User",
    email: "demo@playerdata.com",
    password: bcrypt.hashSync("demo2026", 10),
    role: "viewer",
  },
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find((u) => u.email === credentials.email);
        if (!user) {
          return null;
        }

        const isValid = bcrypt.compareSync(credentials.password, user.password);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
