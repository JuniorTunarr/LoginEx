import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Logo from "../../public/assets/images/top_logo.jpg";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import LoginForm from "@/src/components/molecules/LoginForm";
import { getAuth } from "firebase/auth";
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
const CancelButton = styled.button`
  top: 0 !important;
  left: 0 !important;
  right: 10 !important;
  bottom: 0 !important;
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  (CloseOutlined) {
    fontsize: 24px;
  }
`;

export default function LoginPage() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const auth = getAuth();
  const router = useRouter();
  // const { data: session } = useSession();
  return (
    <>
      {" "}
      <MainHome>
        <CancelButton
          onClick={() => {
            router.back();
          }}>
          <CloseOutlined></CloseOutlined>
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
