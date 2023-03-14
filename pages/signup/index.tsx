import styled from "@emotion/styled";
import { FieldError, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { collection, addDoc, doc, serverTimestamp } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import { ButtonHTMLAttributes, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useEffect, useRef } from "react";
import Logo from "../../public/assets/images/top_logo.jpg";
import TotheBack from "../../public/assets/icons/back-arrow.png";
import { fbAuth, db } from "@/firebase.config";
import * as S from "./SignUpPage_style";

interface FormValue {
  name: string;
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  birthdate: string;
  gender: string;
}
export default function SignUpPage() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  // 탭 부분
  const [currentIndex, setCurrentIndex] = useState(0);

  // 아이디, 패스워드 정규식

  const formSchema = yup.object({
    name: yup
      .string()
      .required("이름을 입력해주세요")
      .matches(/^[가-힣]{2,5}$/, "한글로 입력해주세요.")
      .min(2, "2글자 이상 5글자 이하로 입력해주세요")
      .max(4, "2글자 이상 5글자 이하로 입력해주세요"),
    nickname: yup.string().required("닉네임을 입력해주세요"),
    phone: yup
      .string()
      .required("휴대폰번호를 입력해주세요")
      .matches(
        /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/,
        "-를 포함하여 전화번호를 입력해주세요"
      ),
    birthdate: yup
      .string()
      .required("6자리로 입력해주세요.")
      .matches(/^[0-9]{6}/, "6자리를 확인해주세요"),
    gender: yup.string().required("성별을 체크해주세요."),
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .typeError("")
      .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "이메일 형식에 맞지 않습니다."),
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
      .required("비밀번호를 다시 한번 입력해주세요.")
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
  });

  // react-hook-form 정의
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValue>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const handleNextClick = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
  };
  const handlePreviousClick = () => {
    const previousIndex = currentIndex - 1;
    if (currentIndex !== 0) {
      setCurrentIndex(previousIndex);
    } else {
      router.push("/login");
    }
  };

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phone: "",
    nickname: "",
    birthdate: "",
    gender: "",
  });
  // 모든 input 입력후 submit시 firebase에 올라감

  const onSubmit = async (data: any) => {
    console.log(inputs);
    console.log(getValues("name"));
    console.log(getValues("birthdate"));
    console.log(getValues("password"));
    console.log(getValues("passwordConfirm"));
    try {
      let userData;
      if (newAccount) {
        // create account
        userData = await createUserWithEmailAndPassword(
          fbAuth,
          getValues("email"),
          getValues("password")
        );
        const docRef = await addDoc(collection(db, "users"), {
          name: getValues("name"),
          email: getValues("email"),
          nickname: getValues("nickname"),
          phone: getValues("phone"),
          birthdate: getValues("birthdate"),
          gender: getValues("gender"),
          createdAt: serverTimestamp(),
        });
        alert("회원가입이 완료되었습니다.");
        router.push({ pathname: "/login" });
      } else {
        userData = await signInWithEmailAndPassword(
          fbAuth,
          getValues("email"),
          getValues("password")
        );
        alert("이미 가입된 계정이 있습니다.");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("이미 사용중인 이메일입니다.");
      }
      setErrorFromSubmit(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const nextInputs = {
      ...getValues(),
      [name]: value,
    };
    setInputs(nextInputs);
  };

  return (
    <>
      <S.Wrapper>
        <div>
          <Image
            src={TotheBack}
            width={30}
            height={30}
            alt="뒤로 가기"
            style={{ margin: "10px 0 0 5px" }}
            onClick={handlePreviousClick}
          />
        </div>
      </S.Wrapper>
      <S.MainHome>
        <div className="progress-bar-tabs">
          <Tabs
            onSelect={(index) => console.log(index)}
            selectedIndex={currentIndex}
            style={{ height: "100%" }}>
            <TabList style={{ display: "flex" }}>
              <Tab>1</Tab>
              <Tab>2</Tab>
              <Tab>3</Tab>
              <Tab>4</Tab>
              <Tab>5</Tab>
              <Tab>6</Tab>
              <Tab>7</Tab>
            </TabList>
            <div
              style={{
                margin: "20 auto",
                textAlign: "center",
                justifyContent: "center",
              }}>
              <Image
                src={Logo}
                alt="로고"
                width={200}
                height={100}
                style={{ objectFit: "cover" }}
                priority
              />
              <div>이메일로 회원가입</div>
            </div>
            <S.StyledForm
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex" }}>
              <TabPanel style={{ height: "100%" }}>
                <S.Label htmlFor="email">이메일</S.Label>
                <br />
                <S.StyledInput
                  placeholder="이메일"
                  height={40}
                  name="email"
                  type="text"
                  {...register("email")}
                  onChange={handleInputChange}
                />
                <br />
                {errors.email && (
                  <S.Error>이메일 양식으로 입력해주세요.</S.Error>
                )}
                <S.ButtonWrap>
                  <S.StyledButton
                    type="button"
                    onClick={handleNextClick}
                    disabled={typeof errors.email !== "undefined"}>
                    다음
                  </S.StyledButton>
                </S.ButtonWrap>
              </TabPanel>
              <TabPanel style={{ height: "100%" }}>
                <S.Label htmlFor="password">비밀번호</S.Label>
                <br />
                <S.StyledInput
                  placeholder="비밀번호"
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  {...register("password")}
                />
                {errors.password && (
                  <S.Error>{errors.password.message}</S.Error>
                )}
                <br />
                <S.Label htmlFor="passwordConfirm">비밀번호 확인</S.Label>
                <br />
                <S.StyledInput
                  type="password"
                  name="passwordConfirm"
                  onChange={handleInputChange}
                  placeholder="비밀번호 확인"
                  {...register("passwordConfirm")}
                />
                {errors.passwordConfirm && (
                  <S.Error>{errors.passwordConfirm.message}</S.Error>
                )}
                <S.ButtonWrap>
                  <S.StyledButton
                    type="button"
                    onClick={handleNextClick}
                    disabled={
                      typeof errors.password !== "undefined" ||
                      typeof errors.passwordConfirm !== "undefined"
                    }>
                    다음
                  </S.StyledButton>
                </S.ButtonWrap>
              </TabPanel>
              <TabPanel style={{ height: "100%" }}>
                <S.Label htmlFor="name">이름</S.Label>
                <br />
                <S.StyledInput
                  placeholder="이름을 입력하세요"
                  height={40}
                  name="name"
                  {...register("name")}
                  onChange={handleInputChange}
                />
                {errors.name && <S.Error>{errors.name.message}</S.Error>}
                <S.ButtonWrap>
                  <S.StyledButton
                    type="button"
                    onClick={handleNextClick}
                    disabled={typeof errors.name !== "undefined"}>
                    다음
                  </S.StyledButton>
                </S.ButtonWrap>
              </TabPanel>
              <TabPanel style={{ height: "100%" }}>
                <S.Label htmlFor="phone">휴대폰 번호</S.Label>
                <br />
                <S.StyledInput
                  placeholder="휴대폰 번호를 -빼고 입력하세요"
                  height={40}
                  name="phone"
                  {...register("phone")}
                  onChange={handleInputChange}
                />
                {errors.phone && <S.Error>{errors.phone.message}</S.Error>}
                <S.ButtonWrap>
                  <S.StyledButton
                    type="button"
                    onClick={handleNextClick}
                    disabled={typeof errors.phone !== "undefined"}>
                    다음
                  </S.StyledButton>
                </S.ButtonWrap>
              </TabPanel>
              <TabPanel style={{ height: "100%" }}>
                <S.Label htmlFor="nickname">닉네임</S.Label>
                <br />
                <S.StyledInput
                  placeholder="닉네임을 입력하세요"
                  height={40}
                  name="nickname"
                  type="text"
                  {...register("nickname")}
                  onChange={handleInputChange}
                />
                {errors.nickname && (
                  <S.Error>{errors.nickname.message}</S.Error>
                )}
                <S.ButtonWrap>
                  <S.StyledButton
                    type="button"
                    onClick={handleNextClick}
                    disabled={typeof errors.nickname !== "undefined"}>
                    다음
                  </S.StyledButton>
                </S.ButtonWrap>
              </TabPanel>
              <TabPanel style={{ height: "100%" }}>
                <S.Label htmlFor="birthdate">생년월일</S.Label>
                <br />
                <S.StyledInput
                  placeholder="생년월일을 입력하세요 ex:951102"
                  name="birthdate"
                  height={40}
                  type="text"
                  onChange={handleInputChange}
                  {...register("birthdate")}
                />
                <br />
                {errors.birthdate && <S.Error>생년월일을 확인하세요</S.Error>}
                <S.ButtonWrap>
                  <S.StyledButton
                    type="button"
                    disabled={typeof errors.birthdate !== "undefined"}
                    onClick={handleNextClick}>
                    다음
                  </S.StyledButton>
                </S.ButtonWrap>
              </TabPanel>
              <TabPanel style={{ height: "100%" }}>
                <S.Label htmlFor="gender">성별</S.Label>
                <br />
                <select
                  name="gender"
                  {...register("gender")}
                  onChange={handleInputChange}
                  className="container">
                  <option value="female">여성</option>
                  <option value="male">남성</option>
                </select>
                {errors.gender && <S.Error>성별을 체크해주세요</S.Error>}
                <S.ButtonWrap>
                  <S.StyledButton
                    type="submit"
                    disabled={
                      typeof errors.gender !== "undefined" ||
                      Object.keys(errors).length !== 0
                    }
                    onClick={onSubmit}>
                    가입하기
                  </S.StyledButton>
                </S.ButtonWrap>
              </TabPanel>
            </S.StyledForm>
          </Tabs>
        </div>
      </S.MainHome>
    </>
  );
}
