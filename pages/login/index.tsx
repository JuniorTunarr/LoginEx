import styled from "@emotion/styled";
import { useState } from "react";
import Logo from "../../public/assets/images/top_logo.jpg";
import Image from "next/image";
import LoginBtn from "@/src/components/organisms/login-btn";
const MainHome = styled.div`
  align-items: center;
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  width: 500px !important;
  height: 100% !important;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: lightgray;
  border: none;
  color: black;
`;

export default function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <LoginBtn />
      </MainHome>
    </>
  );
}
