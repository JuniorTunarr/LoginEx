import { db, fbAuth } from "@/firebase.config";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  console.log(fbAuth);

  const [btndisabled, setbtndisabled] = useState(true);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const oneDayInMs = 24 * 60 * 60 * 1000; // one day in milliseconds
  const options = { expires: new Date(Date.now() + oneDayInMs) };

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
    const credential = await signInWithEmailAndPassword(
      fbAuth,
      registerEmail,
      registerPassword
    )
      .then(async () => {
        if (typeof window !== "undefined") {
          Cookies.set("id", JSON.stringify(registerEmail), options);
          const currentUser = fbAuth.currentUser;
          if (currentUser) {
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
              if (typeof window !== "undefined") {
                Cookies.set("name", JSON.stringify(data.name), options);
                Cookies.set("nickname", JSON.stringify(data.nickname), options);
                Cookies.set("gender", JSON.stringify(data.gender), options);
                Cookies.set("email", JSON.stringify(data.email), options);
                Cookies.set("phone", JSON.stringify(data.phone), options);
                Cookies.set(
                  "birthdate",
                  JSON.stringify(data.birthdate),
                  options
                );
              }
            });
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
  };

  // const getDocumentForCurrentUser = async () => {
  //   try {
  //     // Get the current user's ID
  //     const currentUser = fbAuth.currentUser;
  //     if (currentUser) {
  //       const userEmail = currentUser.email;
  //       // Create a query to filter documents by user EMAIL
  //       const q = query(
  //         collection(db, "users"),
  //         where("email", "==", userEmail),
  //         limit(1)
  //       );

  //       const querySnapshot = await getDocs(q);
  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data();
  //         console.log(data);
  //         setName(data.name);
  //         setNickname(data.nickname);
  //         setGender(data.gender);
  //         setEmail(data.email);
  //         setPhone(data.phone);
  //         setBirthdate(data.birthdate);
  //         if (typeof window !== "undefined") {
  //           Cookies.set("name", JSON.stringify(data.name), options);
  //           Cookies.set("nickname", JSON.stringify(data.nickname), options);
  //           Cookies.set("gender", JSON.stringify(data.gender), options);
  //           Cookies.set("email", JSON.stringify(data.email), options);
  //           Cookies.set("phone", JSON.stringify(data.phone), options);
  //           Cookies.set("birthdate", JSON.stringify(data.birthdate), options);
  //         }
  //       });
  //     }
  //     router.push("/mypage");
  //   } catch (error) {
  //     console.error("Error getting document: ", error);
  //   }
  // };

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
