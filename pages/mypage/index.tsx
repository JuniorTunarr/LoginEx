import styled from "@emotion/styled";
import Head from "next/head";
import Link from "next/link";
const MainHome = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
`;
const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: lightgray;
  border: none;
  color: black;
`;

export default function MypagePage() {
  return (
    <>
      <MainHome>마이페이지입니당</MainHome>
      <Link href="/login">
        <Button>로그인 하러가기</Button>
      </Link>
    </>
  );
}
