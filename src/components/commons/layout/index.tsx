import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { authState, isLogInState } from "@/src/commons/context/authRecoil";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fbAuth } from "@/firebase.config";

interface ILayoutProps {
  children: JSX.Element;
}

const Body = styled.div`
  height: -webkit-calc(100% - 65px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrap = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 8px;
  word-break: break-all;
  margin: 0 auto;
  padding: 0;
  justify-content: center;
  -webkit-box-pack: center;
`;

export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedInState, setIsLoggedInState] = useRecoilState(isLogInState);
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
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Wrap className="root">
      {router.pathname !== ("/login" || "/signup") ? <LayoutHeader /> : ""}
      {router.pathname === "/" ? <LayoutBanner /> : ""}
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        #__next {
          height: 100%;
        }
      `}</style>
      <Body>{props.children}</Body>
      {router.pathname !== "/login" ? <LayoutFooter /> : ""}
    </Wrap>
  );
}
