// 상단 네비게이터 페이지

import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState } from "react";
const Wrapper = styled.div`
padding-top: 15px;
top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: sticky;
    z-index: 999;
    background-color: #fff;
    display: block;
    width: 100%,
    height: 44px;
    padding-bottom: 12px;
    border-top: 0;
    border-bottom: 1px solid #f0f1f5;

`;
const ButtonWrap = styled.div`
  align-items: center;
  flex-wrap: nowrap;
  display: flex;
  position: relative;
  transition: color 0.3s, background-color 0.3s;
  margin-left: 15px;

  button {
    background: transparent;
    border: 0;
    font-size: 14px;
    height: 100%;
    margin-right: 20px;
  }
  .focused {
    font-weight: bold;
    text-decoration: underline;
    text-underline-offset: 0.5rem;
    text-decoration-thickness: 2px;
  }
`;
export default function LayoutBanner() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isHome, setIsHome] = useState(true);
  const menuArr = [
    { name: "홈", content: "/" },
    { name: "컬렉션", content: "/collections" },
    { name: "랭킹", content: "/ranking" },
    { name: "시향기", content: "/reviews" },
    { name: "커뮤니티", content: "/community" },
  ];

  const onClickTab = (index: any) => {
    setCurrentTab(index);
    router.push(menuArr[index].content);
  };

  const router = useRouter();
  return (
    <Wrapper>
      <ButtonWrap>
        {isHome
          ? menuArr.map((el, index) => (
              <button
                className={index === currentTab ? "focused" : ""}
                key={index}
                onClick={() => onClickTab(index)}>
                {el.name}
              </button>
            ))
          : ""}
      </ButtonWrap>
    </Wrapper>
  );
}
