import {
  Alert,
  Collapse,
  Button,
  IconButton,
  Snackbar,
  Box,
} from "@mui/material";
import React from "react";
import { Close } from "@mui/icons-material";
export const Error = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      security="error"
      open={open}
      action={action}
      sx={{ width: "30%" }}
      autoHideDuration={6000}
    >
      <Alert
        onClose={handleClose}
        icon={false}
        severity="error"
        sx={{ width: "100%", background: "#D84646", color: "#fff" }}
      >
        Un Success
      </Alert>
    </Snackbar>
  );
};
