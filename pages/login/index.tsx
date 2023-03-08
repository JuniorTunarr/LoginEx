import styled from "@emotion/styled";
import { useState } from "react";
import Logo from "../../public/assets/images/top_logo.jpg";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import LoginForm from "@/src/components/organisms/login";
import kakao from "@/public/assets/icons/kakako-icon.png";
import naver from "@/public/assets/icons/naver-icon.png";
import apple from "@/public/assets/icons/apple-icon.webp";
import google from "@/public/assets/icons/google-icon.png";
const MainHome = styled.div`
  align-items: center;
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  width: 500px !important;
  height: 100% !important;
`;

export default function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: session } = useSession();
  if (session) {
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
  }
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
        <div
          style={{ fontWeight: "bold", fontSize: 17, paddingBottom: "10px" }}>
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
            onClick={() => signIn("")}
          />
        </div>
      </MainHome>
    </>
  );
}
