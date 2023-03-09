import styled from "@emotion/styled";
import { fbAuth } from "@/firebase.config";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
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

  // 파이어베이스 Auth불러오기
  const auth = fbAuth;

  // 현재 유저
  const user = auth.currentUser;

  const onClickLogout = async () => {
    var result = confirm("로그아웃하시겠습니까?");
    if (result === true) {
      await signOut(fbAuth);
    } else {
      return;
    }
  };
  return (
    <>
      <MainHome>
        {!user ? (
          <Link href="/login">
            <Button>로그인</Button>
          </Link>
        ) : (
          <>
            <div>환영합니다. {user && user.providerData[0].email}님!</div>

            <Button onClick={onClickLogout}>로그아웃</Button>
          </>
        )}
      </MainHome>
    </>
  );
}
