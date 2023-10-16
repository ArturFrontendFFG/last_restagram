import { IconButton, TextField } from "@mui/material";
import styled, { css } from "styled-components";
import { FontFamily } from "../../styles/FontFamily";
import { useState } from "react";
import { ShowChart, Visibility, VisibilityOff } from "@mui/icons-material";

export const cssInput = css`
  padding: 8px 16px;
  outline: none;
  border: 1px solid grey;
  transition: border-color 0.3s ease;
  font-size: ${({ fontSize }) => fontSize + "px"};
  border-radius: ${({ borderRadius }) => borderRadius};
  &:hover {
    border-color: blue;
  }
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  &[aria-invalid="true"] {
    border-color: red;
    &::placeholder {
      color: red;
    }
  }
`;

const StyledInput = styled.input`
  ${cssInput}
`;

const StyledHandingError = styled.p`
  color: red;
  font-family: ${FontFamily};
`;

export const Input = ({
  placeholder,
  isfullWidth,
  register,
  name,
  pattern,
  error,
  minLength,
  maxLength,
  type,
}) => {
  return (
    <>
      {type === "password" ? (
        <PasswordInput
          isfullWidth={isfullWidth}
          placeholder={placeholder}
          register={register}
          name={name}
          pattern={pattern}
          minLength={minLength}
          error={error}
        />
      ) : (
        <StyledInput
          borderRadius="4px"
          fullWidth={isfullWidth}
          placeholder={placeholder || ""}
          {...register(name, {
            required: "Input is required",
            pattern: pattern,
            minLength: minLength,
            maxLength: maxLength
          })}
          
          aria-invalid={error[name] ? true : false}
          // {...props}
        />
      )}

      <StyledHandingError>{error[name]?.message}</StyledHandingError>
    </>
  );
};

const PasswordInput = ({
  isfullWidth,
  placeholder,
  register,
  name,
  pattern,
  minLength,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const openPassword = () => setShowPassword((prev) => !prev);

  const styleButton = css`
    color: grey;
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: all;
    z-index: 9999;
  `;

  const StyledButtonVisibility = styled(Visibility)`
    ${styleButton}
  `;
  const StyledButtonOffVisibility = styled(VisibilityOff)`
    ${styleButton}
  `;

  return (
    <>
      <div style={{ position: "relative" }}>
        <StyledInput
          borderRadius="4px"
          fullWidth={isfullWidth}
          placeholder={placeholder}
          {...register(name, {
            required: "Input is required",
            pattern: pattern,
            minLength: minLength,
          })}
          // style={{pointerEvents: 'none'}}
          aria-invalid={error[name] ? true : false}
          type={showPassword ? "text" : "password"}
        />
        {!showPassword ? (
          <StyledButtonVisibility onClick={openPassword} />
        ) : (
          <StyledButtonOffVisibility onClick={openPassword} />
        )}
      </div>
    </>
  );
};
