import styled from "@emotion/styled";
import { ButtonHTMLAttributes } from "react";
import Select from "react-select";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  // other props as needed
}

export const Label = styled.label`
  font-size: 14px;
  margin: 10px 0 -5px 0 !important;
`;
export const Error = styled.div`
  color: red;
  font-size: 13px;
  margin: 5px 0 5px 0px;
`;
export const MainHome = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 500px !important;
  height: 100% !important;
`;

export const StyledForm = styled.form`
  backgrousnd-color: white;
  max-width: 500px;
  width: 500px;
  height: 100% !important;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
`;
export const StyledInput = styled.input`
  border: 0.5px solid rgb(219, 219, 219);
  padding: 10px;
  width: 300px;
  margin-top: 10px;
`;
export const StyledButton = styled.button<ButtonProps>`
  width: 100% !important;
  height: 60px;
  background-color: #9ad3fe;
  border-radius: 0;
  border: none;
  font-size: 15px;
  font-weight: 700;
  line-height: normal;
  color: #fff;
  font-style: normal;
  letter-spacing: normal;
  font-stretch: normal;
  background-color: ${({ disabled }) => (!disabled ? "#9ad3fe;" : "gray")};
`;
export const ButtonWrap = styled.div`
  max-width: 500px !important;
  width: 100%;
  position: fixed;
  right: 0;
  bottom: 0 !important;
  left: 0;
`;
