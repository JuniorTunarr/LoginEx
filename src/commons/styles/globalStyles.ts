import { css } from "@emotion/react";

export const globalStyles = css`
  * {
    box-sizing: border-box;
    position: relative;
    /* min-height: -webkit-fill-available; */
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    background: #f5f5f5 important!;
    max-width: 500px;
    margin: 0 auto;
    /* 폰트 다운 실패하면 뒤에껏을 순서대로 불러옴 */
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
  body {
    display: block;
  }
  .root {
    height: 100% !important;
  }
  /* @font-face {
    font-family: "myfont";
    src: url("/fonts/scifibit.ttf");
  } */
`;
