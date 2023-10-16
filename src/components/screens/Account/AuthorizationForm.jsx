import { useForm } from "react-hook-form";
import { StyledForm } from "../../../styles/components/StyledForm";
import { Input } from "../../widgets/Input";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../../../store/User/user.api";
import { useState } from "react";
import { Success } from "../../widgets/Success";
import { Error } from "../../widgets/Error";

export const AuthorizationForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isErrorFetch, setErrorFetch] = useState(false);

  const [isSuccessAuth, setSuccesAuth] = useState(false);

  const { data: users, isLoading, error } = useGetAllUsersQuery();
  if (isLoading) return;
  if (error) return <>Error</>;

  const authUser = (data) => {
    const user = users.filter(
      (user) => user.email === data.email && user.password === data.password
    );
    console.log(users)
    if (user.length <= 0) return setErrorFetch(true);
    localStorage.setItem(`userId`, JSON.stringify(user[0].id));
    setSuccesAuth(true);
  };

  return (
    <>
      <Success open={isSuccessAuth} ms={3000} to="/" />
      <Error open={isErrorFetch} setOpen={setErrorFetch} />
      <StyledForm onSubmit={handleSubmit(authUser)} autoComplete="off">
        <Stack spacing={1}>
          <Input
            error={errors}
            isfullWidth={true}
            register={register}
            placeholder="Enter email"
            pattern={{
              value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter valid email",
            }}
            name="email"
          />
          <Input
            error={errors}
            isfullWidth={true}
            register={register}
            name="password"
            placeholder="Enter password"
            type="password"
            minLength={{
              value: 10,
              message: "Login must contain at least 10 characters",
            }}
            pattern={{
              value: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
              message: "Must contain at least one letter and one digit",
            }}
          />
        </Stack>
        <Typography m="7px" fontSize={14} textAlign="center">
          Not register yet?{" "}
          <Link style={{ color: "#8d8de9" }} to="/account/registration">
            Registration
          </Link>
        </Typography>
        <Button
          type="submit"
          fullWidth
          sx={{ borderRadius: 1, border: "1px solid #8d8de9" }}
        >
          Submit
        </Button>
      </StyledForm>
    </>
  );
};
