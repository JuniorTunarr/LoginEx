import styled from "@emotion/styled";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { db, fbAuth } from "@/firebase.config";
import { useState } from "react";
import LayoutBanner from "@/src/components/commons/layout/banner";

const MainHome = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
`;

export default function Home() {
  return (
    <>
      <MainHome>홈 화면입니당</MainHome>
    </>
  );
}
