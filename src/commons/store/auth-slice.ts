// store/auth-slice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // localStroage에서 token에 해당하는 값을 초기값으로
    token: localStorage.getItem("token"),

    // localStorage에 인증 토큰이 존재한다면 로그인 상태를 불리언 값으로
    isLoggedIn: !!localStorage.getItem("token"),
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;

      // localStroage에 token이라는 키로 인증 토큰을 저장
      localStorage.setItem("token", action.payload.token);

      // localStorage experationTime이라는 키로 토큰 만료 기간을 저장
      localStorage.setItem("experationTime", action.payload.experationTime);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;

      // localStorage에 token이라는 키의 값을 제거한다.
      localStorage.removeItem("token");

      // localStorage에 experationTime이라는 키의 값 제거
      localStorage.removeItem("experationTime");
    },
  },
});

export default authSlice;
