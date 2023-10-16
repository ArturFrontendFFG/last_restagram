import { useSelector } from "react-redux";
import GlobalStyles from "../styles/GlobalStyles";
import { Footer } from "./ui/Footer";
import { Header } from "./ui/Header";
import styled from "@emotion/styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useActions } from "../hook/useActions";
import { useEffect } from "react";
export const App = (props) => {
  const { isLoading, error, user } = useSelector((state) => state.user);
  if (isLoading) return <>Loading...</>;
  if (error) return <>{error}</>;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && !location.pathname.includes("account"))
      return navigate("/account/registration");
  }, []);

  return (
    <Wrapper>
      <Header />

      <Outlet />

      <GlobalStyles />

      <Footer />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 20px auto;
  min-height: 90vh;
  width: 500px;
  padding: 0 15px 15px 15px;
  border: 1px solid black;
  @media (max-width: 375px) {
    padding: 0;
    margin: 0;
    width: auto;
    border: none;
  }
`;
