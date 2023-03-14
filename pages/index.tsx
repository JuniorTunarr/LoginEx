import styled from "@emotion/styled";
import { fbAuth } from "@/firebase.config";
import { useEffect, useState } from "react";
import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { useRecoilState } from "recoil";
import { isLogInState } from "../src/commons/context/authRecoil";
import authState from "@/src/components/atoms/authRecoil";
const MainHome = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
`;

export default function Home() {
  const credential = setPersistence(fbAuth, browserSessionPersistence);
  const [isLoggedInState, setIsLoggedInState] = useRecoilState(isLogInState);
  const [auth, setAuth] = useRecoilState(authState);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fbAuth, (user) => {
      if (user) {
        user.getIdToken().then(function (idToken) {
          // <------ Check this line
          console.log(idToken); // It shows the Firebase token now
        });
        setAuth(user.getIdToken());
        setIsLoggedInState(true);
      } else {
        setAuth(null);
        setIsLoggedInState(false);
      }
    });
  }, []);
  return (
    <>
      {isLoggedInState ? (
        <MainHome>홈 화면입니당(로그인O)</MainHome>
      ) : (
        <MainHome>홈 화면입니당(로그인X)</MainHome>
      )}
    </>
  );
}
