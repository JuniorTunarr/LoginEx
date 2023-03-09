// 하단 내비게이터 컴포넌트

import styled from "@emotion/styled";
import {
  HomeOutlined,
  HomeFilled,
  FileTextOutlined,
  FileTextFilled,
  ShopOutlined,
  ShopFilled,
  CloudOutlined,
  CloudFilled,
  SmileOutlined,
  SmileFilled,
} from "@ant-design/icons";
import styles from "./LayoutFooter.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  background-color: rgb(255, 255, 255);
  position: sticky;
  bottom: 0px;
  height: 65px;
  width: 100%;
  z-index: 10;
  border-top: 1px solid rgb(214, 214, 214);
`;

const Nav = styled.nav`
  display: block;
  height: 100%;
`;
const Ul = styled.ul`
  list-style: none;
  height: 100%;
  padding: 2px 0 0 0;
  margin: 0px;
  display: flex !important;
  list-style-type: disc;
`;
const Li = styled.li`
  flex: 1 1 0%;
  display: flex !important;
  list-style-type: none
  cursor: pointer;
  color: rgb(102, 102, 102);

  .focused {
    font-weight: bold;
    color: black;
  }
`;
const BottomButton = styled.a`
  color: inherit;
  text-decoration: none;
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0px;
`;
export default function LayoutFooter() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(2);
  const menuArr = [
    {
      name: "아카이브",
      icon: <CloudOutlined style={{ fontSize: "24px" }} />,
      focusIcon: <CloudFilled style={{ fontSize: "24px" }} />,
      content: "/archieve",
    },
    {
      name: "탐색",
      icon: <FileTextOutlined style={{ fontSize: "24px" }} />,
      focusIcon: <FileTextFilled style={{ fontSize: "24px" }} />,
      content: "/contents",
    },
    {
      name: "홈",
      icon: <HomeOutlined style={{ fontSize: "24px" }} />,
      focusIcon: <HomeFilled style={{ fontSize: "24px" }} />,
      content: "/",
    },
    {
      name: "SHOP",
      icon: <ShopOutlined style={{ fontSize: "24px" }} />,
      focusIcon: <ShopFilled style={{ fontSize: "24px" }} />,
      content: "/shop",
    },
    {
      name: "마이페이지",
      icon: <SmileOutlined style={{ fontSize: "24px" }} />,
      focusIcon: <SmileFilled style={{ fontSize: "24px" }} />,
      content: "/mypage",
    },
  ];
  const onClickTab = (index: any) => {
    setCurrentTab(index);
    router.push(menuArr[index].content);
    // menuArr[index].name === "마이페이지";
    // ?
    // : router.push(menuArr[index].content);
  };
  return (
    <Wrapper>
      <Nav className={styles.Nav}>
        <Ul className={styles.Ul}>
          <Li className={styles.Li}>
            {menuArr.map((el, index) => (
              <BottomButton
                key={index}
                onClick={() => onClickTab(index)}
                className={styles.Button}>
                {index === currentTab ? el.focusIcon : el.icon}
                <span
                  className={router.pathname === el.content ? "focused" : ""}>
                  {el.name}
                </span>
              </BottomButton>
            ))}
          </Li>
        </Ul>
      </Nav>
    </Wrapper>
  );
}
