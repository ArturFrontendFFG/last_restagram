import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../widgets/Input";
import { Link, useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../../../store/User/user.api";
import { Error } from "../../widgets/Error";
import { Success } from "../../widgets/Success";
import { StyledForm } from "../../../styles/components/StyledForm";
import styled from "styled-components";
export const RegistrationForm = (props) => {
  const [isErrorFetch, setErrorFetch] = useState(false);
  const [isSuccessSnackbar, setSuccessSnackbar] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addUser, { isLoading, isSuccess, error }] = useAddUserMutation();

  useEffect(() => {
    setErrorFetch(Object.keys(error || {}).length <= 0 ? false : true);
  }, [error]);

  useEffect(() => {
    if (isSuccess) setSuccessSnackbar(true);
  }, [isSuccess]);

  const onSubmit = async (data) => {
    addUser({
      ...data,
      age: null,
      about: "",
      private: false,
      posts: [],
      avatar: "",
    });
  };

  return (
    <>
      <Success open={isSuccessSnackbar} ms={3000} to={"/account/auth"} />
      <Error open={isErrorFetch} setOpen={setErrorFetch} />
      <StyledForm onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack spacing={1}>
          <Input
            isfullWidth={true}
            placeholder="Enter email"
            pattern={{
              value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter valid email",
            }}
            name="email"
            error={errors}
            register={register}
          />

          <Input
            isfullWidth={true}
            placeholder="Name and Surname"
            name="name"
            // pattern={{ value: /^[a-z]+[A-Z]*$/, message: "Only letters" }}
            maxLength={{ value: 15, message: "Max 15 symbols" }}
            error={errors}
            register={register}
          />
          <Input
            isfullWidth={true}
            placeholder="Login"
            minLength={{
              value: 5,
              message: "Login must contain at least 5 characters",
            }}
            name={"login"}
            error={errors}
            register={register}
          />
          <Input
            isfullWidth={true}
            placeholder="Password"
            name="password"
            minLength={{
              value: 10,
              message: "Login must contain at least 10 characters",
            }}
            pattern={{
              value: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
              message: "Must contain at least one letter and one digit",
            }}
            error={errors}
            register={register}
            type="password"
          />
        </Stack>
        <Typography mt="20px" color="#737373" fontSize={10} textAlign="center">
          People who use our service may have uploaded your contact information
          to Restagram
        </Typography>
        <Typography m="7px" fontSize={14} textAlign="center">
          Already registered ?{" "}
          <Link style={{ color: "#8d8de9" }} to="/account/auth">
            Log in
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
