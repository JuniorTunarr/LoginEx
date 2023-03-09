// 최상단 헤더 페이지

import styled from "@emotion/styled";
import styles from "./LayoutHeader.module.css";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import Logo from "../../../../../public/assets/images/top_logo.jpg";
import { useCallback, useLayoutEffect, useRef } from "react";

const Wrapper = styled.div`
  background-color: rgb(255, 255, 255);
  position: sticky;
  height: 45px;
  width: 100%;
  z-index: 10;
  border-top: 1px solid rgb(214, 214, 214);
  /* transform: translate3d(0,-116px,1px); */
`;
export default function LayoutHeader() {
  return (
    <Wrapper>
      <header className={styles.header}>
        <div>
          <div className={styles.headerWrap}>
            <a className={styles.logo}>
              <span>
                <Image
                  src={Logo}
                  alt="로고"
                  width={90}
                  height={30}
                  style={{ objectFit: "cover", paddingTop: "3px" }}
                  priority
                />
              </span>
            </a>
            <div style={{ width: "315px", height: "0px" }} />
            <button className={styles.button}>
              <span>
                <SearchOutlined style={{ fontSize: "24px" }} />
              </span>
            </button>
            <button className={styles.button}>
              <span>
                <ShoppingCartOutlined style={{ fontSize: "24px" }} />
              </span>
            </button>
          </div>
        </div>
      </header>
    </Wrapper>
  );
}
