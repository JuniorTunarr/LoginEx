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
      getDocumentForCurrentUser();
      setNick(resultData);
      setIsLogin(true);
    }
  }, []);
  const getDocumentForCurrentUser = async () => {
    try {
      // Get the current user's ID
      const currentUser = fbAuth.currentUser;
      const userEmail = currentUser.email;

      // Create a query to filter documents by user EMAIL
      const q = query(
        collection(db, "users"),
        where("email", "==", userEmail),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);

        setName(data.name);
        setNickname(data.nickname);
        setGender(data.gender);
        setEmail(data.email);
        setPhone(data.phone);
        setBirthdate(data.birthdate);
      });
    } catch (error) {
      console.error("Error getting document: ", error);
    }
  };
  const onClickLogout = async () => {
    var result = confirm("로그아웃하시겠습니까?");
    if (result === true) {
      Cookies.remove("id");
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
            <br/>
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
