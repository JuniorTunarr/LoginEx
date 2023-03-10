//authRecoil.ts

import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: null,
  // TypeError: Cannot freeze 방지
  dangerouslyAllowMutability: true,
});

export const isLogInState = atom({
  key: "isLogInState",
  default: false,
});

