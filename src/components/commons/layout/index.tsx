import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNavigation from "./navigation";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

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
  return (
    <Wrap className="root">
      <LayoutHeader />
      <LayoutBanner />
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        #__next {
          height: 100%;
        }
      `}</style>
      <Body>{props.children}</Body>
      <LayoutFooter />
    </Wrap>
  );
}
