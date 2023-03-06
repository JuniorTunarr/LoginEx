import styled from "@emotion/styled";
import Head from "next/head";

const MainHome = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
`;

const HeadSection = styled.div`
  padding: 0 10px 0 16px !important;
  min-height: 45px;
  background-color: blue;
`;
const Header = styled.div`
  position: relative !important;
`;

export default function CollectionsPage() {
  return (
    <>
      <MainHome>컬렉션입니당</MainHome>
    </>
  );
}
