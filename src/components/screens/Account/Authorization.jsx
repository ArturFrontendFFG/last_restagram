import { Box, Divider, Typography } from "@mui/material";
import { BoldTypography } from "../../../styles/components/BoldTypography";
import { AuthorizationForm } from "./AuthorizationForm";

export const Authorization = (props) => {
  return (
    <Box pt={2}>
      <BoldTypography size="30px" textAlign="center">
        Reinstagram
      </BoldTypography>
      <Typography textAlign="center" m="10px" color="#737373" fontSize="14px">
        Authorization
      </Typography>
      <AuthorizationForm />
    </Box>
  );
};
