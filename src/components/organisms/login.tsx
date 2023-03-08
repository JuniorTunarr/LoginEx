import { fbAuth } from "@/firebase.config";
import actionCodeSettings from "@/src/commons/libs/firebase/emailAuth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  console.log(fbAuth);
  const [btndisabled, setbtndisabled] = useState(true);

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

  // 로그인 검증 - 성공

  const onFinish = (values: any) => {
    console.log("Success:", values);
    router.push({ pathname: "/mypage", query: { user_id: values.id } });
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
        <Input placeholder="이메일을 입력해주세요" prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 1, span: 24 }}
        name="password"
        rules={[
          { min: 8, required: true, message: "비밀번호는 최소 8자리입니다" },
        ]}>
        <Input.Password
          placeholder="비밀번호를 입력해주세요"
          prefix={<LockOutlined />}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 5, span: 24 }}>
        <Button type="primary" htmlType="submit" disabled={btndisabled}>
          이메일로 로그인
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button onClick={onClickSignUp}>이메일로 가입</Button>
      </Form.Item>
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 7, span: 20 }}>
        <Checkbox>이메일 저장</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
