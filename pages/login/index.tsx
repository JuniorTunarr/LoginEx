import styled from "@emotion/styled";
import { useState } from "react";
import Logo from "../../public/assets/images/top_logo.jpg";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import LoginForm from "@/src/components/molecules/LoginForm";

import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import router, { useRouter } from "next/router";

const MainHome = styled.div`
  align-items: center;
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  width: 500px !important;
  height: 100% !important;
`;
import SnsLogin from "../../src/components/molecules/SnsLogin";

export default function LoginPage() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = getAuth();
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    console.log(session);
    return (
      <>
        <MainHome>
          <Image
            src={Logo}
            alt="로고"
            width={200}
            height={100}
            style={{ objectFit: "cover" }}
            priority
          />
          {session.user?.name}님 반갑습니다 <br />
          <button onClick={() => signOut()}>로그아웃</button>
        </MainHome>
      </>
    );
  } else {
    return (
      <>
        <MainHome>
          <Image
            src={Logo}
            alt="로고"
            width={200}
            height={100}
            style={{ objectFit: "cover" }}
            priority
          />
          <LoginForm />
          <SnsLogin />
        </MainHome>
      </>
    );
  }
}
