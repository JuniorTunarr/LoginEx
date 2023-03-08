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
  const auth = fbAuth;
  const user = auth.currentUser;

  const user_id = router.query.user_id;
  const onClickLogout = () => {
    var result = confirm("로그아웃하시겠습니까?");
    if (result === true) {
      if (typeof window !== undefined) {
        const isLogOut = window.confirm(authMessage["auth/logout-confirm"]);
        if (!isLogOut) return;
      }
      router.push("/login");
    } else {
      return;
    }
  };
  return (
    <>
      <MainHome>
        {user_id === "undefined" ? (
          <Link href="/login">
            <Button>로그인 하러가기</Button>
          </Link>
        ) : (
          <>
            <div>환영합니다. {user?.email}님!</div>

            <Button onClick={onClickLogout}>로그아웃</Button>
          </>
        )}
      </MainHome>
    </>
  );
}
