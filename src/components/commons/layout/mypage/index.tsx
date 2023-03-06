import styled from "@emotion/styled";
const MainHome = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
`;

const LoginPageLayout = ({ children }) => {
  return (
    <>
      <MainHome>{children}</MainHome>
    </>
  );
};
export default LoginPageLayout;
