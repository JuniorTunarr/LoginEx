import styled from "@emotion/styled";
import { fbAuth } from "@/firebase.config";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
const MainHome = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
`;

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <>
      {isLoggedIn ? (
        <MainHome>홈 화면입니당(로그인O)</MainHome>
      ) : (
        <MainHome>홈 화면입니당(로그인X)</MainHome>
      )}
    </>
  );
}
