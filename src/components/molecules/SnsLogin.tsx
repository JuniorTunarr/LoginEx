import { signIn, useSession, signOut } from "next-auth/react";
import kakao from "@/public/assets/icons/kakako-icon.png";
import naver from "@/public/assets/icons/naver-icon.png";
import apple from "@/public/assets/icons/apple-icon.webp";
import google from "@/public/assets/icons/google-icon.png";
import github from "@/public/assets/icons/github-icon.png";
import Image from "next/image";

import {
  signInWithPopup,
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  GithubAuthProvider,
} from "firebase/auth";
import { fbAuth } from "@/firebase.config";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SnsLogin() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState("");
  const provider = new GoogleAuthProvider();
  const provider1 = new GithubAuthProvider();
  const handleGoogleLogin = () => {
    setPersistence(fbAuth, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(fbAuth, provider)
          .then(() => {
            // 로그인 성공
            router.push("/mypage");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGithubLogin = () => {
    setPersistence(fbAuth, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(fbAuth, provider1)
          .then(() => {
            // 로그인 성공

            router.push("/mypage");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div style={{ fontWeight: "bold", fontSize: 17, paddingBottom: "10px" }}>
        SNS 계정으로 간편 로그인
      </div>
      <div>
        <Image
          src={kakao}
          alt="카카오로그인"
          width="35"
          height="35"
          style={{ margin: "10px" }}
          onClick={() => signIn("kakao")}
        />

        <Image
          src={naver}
          alt="네이버로그인"
          width="35"
          height="35"
          style={{ margin: "10px" }}
          onClick={() => signIn("")}
        />
        <Image
          src={apple}
          alt="애플로그인"
          width="35"
          height="35"
          style={{ margin: "10px" }}
          onClick={() => signIn("")}
        />
        <Image
          src={google}
          alt="구글로그인"
          width="35"
          height="35"
          style={{ margin: "10px" }}
          onClick={handleGoogleLogin}
        />

        <Image
          src={github}
          alt="깃허브로그인"
          width="35"
          height="35"
          style={{ margin: "10px" }}
          onClick={handleGithubLogin}
        />
      </div>
    </>
  );
}
