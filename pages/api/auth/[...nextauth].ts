import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

const { GITHUB_ID = "", GITHUB_SECRET = "" } = process.env;

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
});
