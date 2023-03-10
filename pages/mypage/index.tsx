import styled from "@emotion/styled";
import { fbAuth } from "@/firebase.config";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
// Tell me why cd doesn't work

const MainHome = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Button = styled.button`
  width: 60px;
  height: 40px;
  margin-top: 20px;
  background-color: lightgray;
  border: none;
  color: black;
`;

export default function MypagePage() {
  const router = useRouter();
  const [nick, setNick] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  // 파이어베이스 Auth불러오기
  const Auth = fbAuth;
  // 현재 유저
  // const user = Auth.currentUser;
  // console.log(user);
  useEffect(() => {
    const result = Cookies.get("id");
    if (result) {
      const resultData = result.replaceAll('"', "");
      setNick(resultData);
      setIsLogin(true);
    }
  }, []);

  const onClickLogout = async () => {
    var result = confirm("로그아웃하시겠습니까?");
    if (result === true) {
      Cookies.remove("id");
      setIsLogin(false);
      await signOut(Auth);
      router.push("/mypage");
    } else {
      return;
    }
  };
  return (
    <>
      <MainHome>
        {isLogin ? (
          <>
            <div>환영합니다. {nick}님!</div>

            <Button onClick={onClickLogout}>로그아웃</Button>
          </>
        ) : (
          <Link href="/login">
            <Button>로그인</Button>
          </Link>
        )}
      </MainHome>
    </>
  );
}
