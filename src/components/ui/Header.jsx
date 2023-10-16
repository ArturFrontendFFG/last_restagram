import { Stack } from "@mui/material";
import styled from "styled-components";
import { BreadCrumbs } from "./BreadCrumbs";
import { useLocation } from "react-router-dom";
const StyledHeader = styled.header`
  width: 100%;
  text-align: center;
  padding: 10px 0;
`;

export const Header = (props) => {
  const location = useLocation();
  if(location.pathname.includes('account')) return <></>
  return (
    <>
      <StyledHeader>
        <Stack justifyContent="center" direction="row">
          <BreadCrumbs />
        </Stack>
      </StyledHeader>
    </>
  );
};
