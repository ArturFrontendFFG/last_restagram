import { Box, Button, Stack } from "@mui/material";
import { StyledForm } from "../../../styles/components/StyledForm";
import { Input, cssInput } from "../../widgets/Input";
import { Input as Textarea } from "@mui/material";
import { BoldTypography } from "../../../styles/components/BoldTypography";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Images } from "./Images";
import { useState } from "react";
import { useCreatePostMutation } from "../../../store/posts/createPost.api";
import { useSelector } from "react-redux";

const StyledTextarea = styled(Textarea)`
  ${cssInput}
  .MuiInputBase-input.MuiInput-input.MuiInputBase-inputMultiline {
    padding: 0px 16px;
    &::placeholder {
      font-size: 14px;
      color: #000;
    }
  }
  border-radius: 4px;
  &::before,
  &::after {
    display: none;
  }
`;

export const CreatePost = (props) => {
  const [imageList, setImageList] = useState([]);
  const [stateSuccess, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userId = useSelector((state) => state.user.user);

  const [createPost, { isSuccess, error }] = useCreatePostMutation();

  const onSubmit = (data) => {
    if (imageList.length <= 0) return alert("You should choose image");
    const postData = {
      ...data,
      authorId: userId,
      content: imageList,
      likes: 0,
      time: Date.now(),
      comments: [],
    };
    createPost(postData);
    if(isSuccess) alert("Success")
  };

  return (
    <Box>
      <BoldTypography size="30px" textAlign="center">
        Create Post
      </BoldTypography>
      <StyledForm onSubmit={handleSubmit(onSubmit)} style={{ display: "grid" }}>
        <Stack spacing={1}>
          <Input
            register={register}
            error={errors}
            isfullWidth={true}
            placeholder="Write title"
            name="title"
          />
          <StyledTextarea
            placeholder="Enter overview"
            variant="standard"
            fullWidth={true}
            multiline
            {...register("overview", { required: false })}
          />
          <Images imageList={imageList} setImageList={setImageList} />
          <Button
            type="submit"
            fullWidth
            sx={{ borderRadius: 1, border: "1px solid #8d8de9" }}
          >
            Submit
          </Button>
        </Stack>
      </StyledForm>
    </Box>
  );
};
