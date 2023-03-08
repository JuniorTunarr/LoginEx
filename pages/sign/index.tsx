// SignupForm.tsx

import React from "react";
import styled from "styled-components";
import { Button, Checkbox, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrorMessage from "@/src/components/atoms/error/FormErrorMessage";
import { fbAuth, createUserWithEmailAndPassword, db } from "@/firebase.config";
import { useRouter } from "next/router";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

// Types
type SignUpInputType = {
  email: string;
  nickname: string;
  password: string;
  password2: string;
  term: boolean;
};

// styled components
const StyledSignUpForm = styled(Form)`
  > div:not(:first-child) {
    margin-top: 20px; // ID 인풋박스만 제외하고
  }

  > div:not(:last-child) {
    position: relative; // 버튼 박스만 제외하고
  }

  > div > label {
    display: inline-block;
    padding-bottom: 8px;
  }
`;
// yup
const signUpValidation = yup.object({
  nickname: yup
    .string()
    .required("닉네임을 입력해주세요.")
    .max(15, "닉네임은 15자리 이하여야 합니다.")
    .min(2, "닉네임은 2자리 이상이어야 합니다."),
  email: yup
    .string()
    .required("아이디를 입력해주세요.")
    .email("이메일 형식이 아닙니다.")
    .max(12, "아이디는 12자리 이하여야 합니다.")
    .min(4, "아이디는 4자리 이상이어야 합니다."),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .max(15, "비밀번호는 15자리 이하여야 합니다.")
    .min(8, "비밀번호는 8자리 이상이어야 합니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
      "영문 숫자포함 8자리를 입력해주세요."
    ),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다."),
  term: yup.boolean().oneOf([true], "약관에 동의해주세요."),
});
// export
function SignUpForm() {
  const router = useRouter();
  const [newAccount, setNewAccount] = useState(true);
  const [errorFromSubmit, setErrorFromSubmit] = useState("");

  const { register, handleSubmit, errors, control } = useForm<SignUpInputType>({
    resolver: yupResolver(signUpValidation),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: any) => {
    try {
      if (newAccount) {
        // create account
        const createUser = await createUserWithEmailAndPassword(
          fbAuth,
          data.email,
          data.password
        );
        const docRef = await addDoc(collection(db, "users"), {
          name: data.name,
          email: data.email,
        });
        alert("회원가입이 완료되었습니다.");
        router.push({ pathname: "/login" });
      } else {
        alert("이미 가입된 계정이 있습니다.");
      }
    } catch (error) {
      setErrorFromSubmit(error.message);
    }
  };

  return (
    <StyledSignUpForm onFinish={onSubmit} size="large">
      <div>
        <label htmlFor="email">아이디</label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder="아이디(이메일)를 입력해주세요."
              type="email"
            />
          )}
        />
        {errors.email && (
          <FormErrorMessage errorMessage={errors.email.message} />
        )}
      </div>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder="닉네임을 입력해주세요."
              type="text"
            />
          )}
          name="nickname"
          control={control}
          defaultValue=""
        />
        {errors.nickname && (
          <FormErrorMessage errorMessage={errors.nickname.message} />
        )}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              placeholder="비밀번호를 입력해주세요."
            />
          )}
        />
        {errors.password && (
          <FormErrorMessage errorMessage={errors.password.message} />
        )}
      </div>
      <div>
        <label htmlFor="password2">비밀번호</label>
        <Controller
          name="password2"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              placeholder="비밀번호를 확인해주세요."
            />
          )}
        />
        {errors.password2 && (
          <FormErrorMessage errorMessage={errors.password2.message} />
        )}
      </div>
      <div>
        <Controller
          name="term"
          control={control}
          defaultValue={false}
          render={({ onChange, value }) => (
            <Checkbox
              onChange={(e) => onChange(e.target.checked)}
              checked={value}>
              약관에 동의합니다.
            </Checkbox>
          )}
        />
        {errors.term && <FormErrorMessage errorMessage={errors.term.message} />}
      </div>
      <div>
        <Button type="primary" htmlType="submit" block>
          가입하기
        </Button>
      </div>
    </StyledSignUpForm>
  );
}

export default SignUpForm;
