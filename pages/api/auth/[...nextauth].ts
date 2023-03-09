import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { db } from "../../../firebase.config";
import * as firestoreFunctions from "firebase/firestore";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import firebase from "firebase/app";
import { fbAuth } from "@/firebase.config";

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const googleCredential = GoogleAuthProvider.credential(
          account?.id_token
        );
        const userCredential = await signInWithCredential(
          fbAuth,
          googleCredential
        ).catch((e) => {
          console.log(e);
          return false;
        });
        console.log("logged in:", userCredential);
        return userCredential ? true : false;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
  adapter: FirebaseAdapter({
    db: db,
    ...firestoreFunctions,
  }),
});
