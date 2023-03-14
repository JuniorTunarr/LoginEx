// 여기서 모든 컴포넌트들이 모여서 렌더링됨

import type { AppProps } from "next/app";
import Layout from "../src/components/commons/layout";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { RecoilRoot, useRecoilState } from "recoil";
import { authState, isLogInState } from "@/src/commons/context/authRecoil";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fbAuth } from "@/firebase.config";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <RecoilRoot>
      <>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    </RecoilRoot>
  );
}
