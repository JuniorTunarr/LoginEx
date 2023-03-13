import styled from "@emotion/styled";
import { db, fbAuth } from "@/firebase.config";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
// Tell me why cd doesn't work

const MainHome = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Button = styled.button`
  width: 60px;
  height: 40px;
  margin-top: 20px;
  background-color: lightgray;
  border: none;
  color: black;
`;

export default function MypagePage() {
  const router = useRouter();
  const [nick, setNick] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  // 파이어베이스 Auth불러오기
  const Auth = fbAuth;
  // 현재 유저
  // const user = Auth.currentUser;
  // console.log(user);
  useEffect(() => {
    const result = Cookies.get("id");
    if (result) {
      const resultData = result.replaceAll('"', "");
      setIsLogin(true);
      const decodeName = JSON.parse(decodeURIComponent(Cookies.get("name")));
      const decodeNickname = JSON.parse(
        decodeURIComponent(Cookies.get("nickname"))
      );
      const decodeGender = JSON.parse(
        decodeURIComponent(Cookies.get("gender"))
      );
      const decodeEmail = JSON.parse(decodeURIComponent(Cookies.get("email")));
      const decodePhone = JSON.parse(decodeURIComponent(Cookies.get("phone")));
      const decodeBirthdate = JSON.parse(
        decodeURIComponent(Cookies.get("birthdate"))
      );

      setName(decodeName);
      setNickname(decodeNickname);
      setGender(decodeGender);
      setEmail(decodeEmail);
      setPhone(decodePhone);
      setBirthdate(decodeBirthdate);
      setNick(resultData);
    }
  }, [name, nickname, gender, email, phone, birthdate]);
  const onClickLogout = async () => {
    var result = confirm("로그아웃하시겠습니까?");
    if (result === true) {
      Cookies.remove("id");
      Cookies.remove("name");
      Cookies.remove("nickname");
      Cookies.remove("gender");
      Cookies.remove("email");
      Cookies.remove("phone");
      Cookies.remove("birthdate");
      setIsLogin(false);
      await signOut(Auth);
      router.push("/mypage");
    } else {
      return;
    }
  };
  return (
    <>
      <MainHome>
        {isLogin ? (
          <>
            <div>로그인한 유저 정보입니다.</div>
            <br />
            <div>이름: {name}</div>
            <div>닉네임: {nickname}</div>
            <div>성별: {gender}</div>
            <div>이메일: {email}</div>
            <div>휴대폰번호: {phone}</div>
            <div>생년월일: {birthdate}</div>

            <Button onClick={onClickLogout}>로그아웃</Button>
          </>
        ) : (
          <Link href="/login">
            <Button>로그인</Button>
          </Link>
        )}
      </MainHome>
    </>
  );
}
