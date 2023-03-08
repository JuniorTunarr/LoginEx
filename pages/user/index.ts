import styled from "@emotion/styled";
import { useSession } from "next-auth/react";

const MainHome = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: -webkit-calc(100% - 65px);
  height: 100%;
`;

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <MainHome>홈 화면입니당</MainHome>
    </>
  );
}
