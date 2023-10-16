import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Success = ({ open, ms, to }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (to === null) return;
    let timeoutId;

    if (open) {
      timeoutId = setTimeout(() => {
        navigate(to);
      }, ms);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [open, navigate, ms, to]);
  return (
    <Snackbar
      security="succes"
      open={open}
      sx={{ width: "30%" }}
      autoHideDuration={6000}
    >
      <Alert
        icon={<CircularProgress size={22} />}
        severity="success"
        sx={{ width: "100%", justifyContent: "space-between", pr: 4 }}
      >
        Success
      </Alert>
    </Snackbar>
  );
};
