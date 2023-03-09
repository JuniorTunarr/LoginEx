import styled from "@emotion/styled";
import { useState } from "react";
import Logo from "../../public/assets/images/top_logo.jpg";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import LoginForm from "@/src/components/molecules/loginform";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import router, { useRouter } from "next/router";
import SnsLogin from "../../src/components/molecules/SnsLogin";
import { CloseOutlined } from "@ant-design/icons";

const MainHome = styled.div`
  align-items: center;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  width: 500px !important;
  height: 100% !important;
`;
const CancelButton = styled(CloseOutlined)`
  top: 0 !important;
  left: 0 !important;
  right: 10 !important;
  bottom: 0 !important;
  position: absolute;
  background
  fontsize: 24px;
`;

export default function LoginPage() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = getAuth();
  const router = useRouter();
  const { data: session } = useSession();
  const onClickCancel = () => {
    router.push("/mypage");
  };
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
        {" "}
        <MainHome>
          <CancelButton>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                top: "0px",
                left: "0px",
              }}
              onClick={onClickCancel}
            />
          </CancelButton>
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
