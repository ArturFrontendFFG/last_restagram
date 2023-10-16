import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { FontFamily } from "../FontFamily";

export const BoldTypography = styled(Typography)`
  font-size: ${({ size }) => size || "16px"};
  font-weight: ${({weight}) => weight || '600'};
  font-family: ${({family}) => family || FontFamily}
`;
