import { db, fbAuth } from "@/firebase.config";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import {
  browserSessionPersistence,
  onIdTokenChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import authState from "../atoms/authRecoil";
import { isLogInState } from "@/src/commons/context/authRecoil";
const LoginForm: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [auth, setAuth] = useRecoilState(authState);
  console.log(fbAuth);

  const [btndisabled, setbtndisabled] = useState(true);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [isLoggedInState, setIsLoggedInState] = useRecoilState(isLogInState);

  const onClickSignUp = () => {
    router.push("/signup");
  };

  const rightId = useCallback((_: any, value: string) => {
    const email_regExp =
      /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+.[a-zA-Z]+$/i;
    if (!value) {
      return Promise.reject(new Error("아이디(이메일)를 입력해주세요"));
    }
    if (!email_regExp.test(value)) {
      return Promise.reject(
        new Error("아이디는 이메일 형식으로 입력해주세요 ")
      );
    }
    return Promise.resolve();
  }, []);

  // 로그인 검증 - 성공 . 기존 onChange -> onFinish

  const onFinish = async () => {
    const credential = await setPersistence(
      fbAuth,
      browserSessionPersistence
    ).then(() => {
      return signInWithEmailAndPassword(fbAuth, registerEmail, registerPassword)
        .then(async () => {
          if (typeof window !== "undefined") {
            const currentUser = fbAuth.currentUser;
            console.log(currentUser);
            if (currentUser) {
              console.log(currentUser);
              setAuth(currentUser.getIdToken());
              setIsLoggedInState(true);
              router.push("/mypage");
            }
          }
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/wrong-password":
              return alert("이메일 혹은 비밀번호가 일치하지 않습니다.");
            case "auth/user-not-found":
              return alert("일치하는 사용자가 없습니다.");
            case "auth/internal-error":
              return alert("잘못된 요청입니다.");
            default:
              return alert("로그인에 실패 하였습니다.");
          }
        });
    });
    credential;
  };

  // 로그인 검증 - 실패

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 500, paddingTop: 10, margin: "0 auto" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFieldsChange={() =>
        setbtndisabled(
          form.getFieldsError().some((field) => field.errors.length > 0)
        )
      }
      onFinishFailed={onFinishFailed}
      autoComplete="on">
      <Form.Item
        wrapperCol={{ offset: 1, span: 24 }}
        name="id"
        rules={[
          { whitespace: true, message: "아이디는 공백만으로 만들 수 없습니다" },
          { validator: rightId },
        ]}>
        <Input
          placeholder="이메일을 입력해주세요"
          prefix={<UserOutlined />}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 1, span: 23 }}
        name="password"
        rules={[
          { min: 8, required: true, message: "비밀번호는 최소 8자리입니다" },
        ]}>
        <Input.Password
          placeholder="비밀번호를 입력해주세요"
          prefix={<LockOutlined />}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 2, span: 22 }}>
        <Button type="primary" htmlType="submit" disabled={btndisabled}>
          이메일로 로그인
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 18 }}>
        <Button onClick={onClickSignUp}>이메일로 가입</Button>
      </Form.Item>
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 3, span: 20 }}>
        <Checkbox>이메일 저장</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
function axios(
  arg0: string
): { userData: any } | PromiseLike<{ userData: any }> {
  throw new Error("Function not implemented.");
}
