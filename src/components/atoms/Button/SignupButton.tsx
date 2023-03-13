import styled from "@emotion/styled";

const ButtonWrap = styled.div`
  max-width: 500px !important;
  margin: auto;
  width: 100%;
  right: 0;
  bottom: 0;
  left: 0;
`;
const Button = styled.button`
  width: 100%;
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

  .disabled {
    opacity: 1 !important;
    background-color: #ddd;
  }
`;

export default function SignUpButton() {
  return <Button>다음</Button>;
}
