import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Logo from "../../public/assets/images/top_logo.jpg";
import Image from "next/image";
import { fbAuth, createUserWithEmailAndPassword, db } from "@/firebase.config";
import { useRouter } from "next/router";
import { useState } from "react";
import { collection, addDoc, Firestore, setDoc, doc } from "firebase/firestore";

interface FormValue {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Error = styled.div`
  color: red;
  margin: 2px 0 10px 0;
`;
const MainHome = styled.div`
  align-items: center;
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  width: 500px !important;
  height: 100% !important;
`;
const StyledForm = styled.form`
  background-color: white;
  width: 300px;
  margin-top: 20px;
  border: 1px solid gray;
  padding: 10px 30px 30px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const StyledInput = styled.input`
  border: 0.5px solid rgb(219, 219, 219);
  padding: 10px;
  margin-top: 10px;
`;
const StyledButton = styled.button`
  margin: 20px 0px;
  background-color: rgb(93, 93, 230);
  font-size: 16px;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

export default function SignUpPage() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  // 아이디, 패스워드 정규식

  const formSchema = yup.object({
    name: yup
      .string()
      .required("닉네임을 입력해주세요")
      .min(2, "최소 2자 이상 입력해주세요."),
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다."),
    password: yup
      .string()
      .required("영문, 숫자포함 8자리를 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        "영문 숫자포함 8자리를 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
  });

  // react-hook-form 정의
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      if (newAccount) {
        // create account
        const createUser = await createUserWithEmailAndPassword(
          fbAuth,
          data.email,
          data.password
        );

        alert("회원가입이 완료되었습니다.");
        router.push({ pathname: "/login" });
      } else {
        alert("이미 가입된 계정이 있습니다.");
      }
    } catch (error) {
      setErrorFromSubmit(error.message);
    }
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: data.email,
        name: data.name,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      setErrorFromSubmit(error.message);
    }
  };

  return (
    <MainHome>
      <Image
        src={Logo}
        alt="로고"
        width={200}
        height={100}
        style={{ objectFit: "cover" }}
        priority
      />
      <div>이메일로 회원가입</div>
      <StyledForm
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column" }}>
        <StyledInput placeholder="닉네임" height={40} {...register("name")} />
        {errors.name && <Error>{errors.name.message}</Error>}
        <StyledInput placeholder="이메일" height={40} {...register("email")} />
        {errors.email && <Error>{errors.email.message}</Error>}

        <StyledInput
          placeholder="비밀번호"
          type="password"
          {...register("password")}
        />
        {errors.password && <Error>{errors.password.message}</Error>}

        <StyledInput
          type="password"
          placeholder="비밀번호 확인"
          {...register("passwordConfirm")}
        />
        {errors.passwordConfirm && (
          <Error>{errors.passwordConfirm.message}</Error>
        )}
        <StyledButton type="submit">
          {/* disabled={errors || watch()} */} 가입하기
        </StyledButton>
      </StyledForm>
    </MainHome>
  );
}
