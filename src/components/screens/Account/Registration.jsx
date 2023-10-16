import { Box, Divider, Typography } from "@mui/material";
import { BoldTypography } from "../../../styles/components/BoldTypography";
import { RegistrationForm } from "./RegistrationForm";
export const Registration = (props) => {
  return (
    <Box pt={2}>
      <BoldTypography size="30px" textAlign="center">
        Reinstagram
      </BoldTypography>
      <Typography
        textAlign="center"
        m="20px"
        color="#737373"
        fontSize="14px"
      >
        Sign up to see your friends' photos and videos.
      </Typography>
      <Divider sx={{ maxWidth: 300, m: "0 auto", background: "#ccc" }} />

      <RegistrationForm />
    </Box>
  );
};
