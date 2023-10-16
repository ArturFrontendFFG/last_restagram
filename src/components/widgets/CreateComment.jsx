import { TagFaces } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Emoji } from "../../store/dataEmoji";
import { useState } from "react";
import { useSelector } from "react-redux";
import { usePutPostMutation } from "../../store/posts/putPost.api";
export const CreateComment = ({ item }) => {
  const [commentValue, setCommentValue] = useState("");

  const [isOpenBoxEmoji, setOpenBoxEmoji] = useState(false);

  const userId = useSelector((state) => state.user.user);

  const [createPost, { isSuccess, error }] = usePutPostMutation();

  const handleChange = (e) => setCommentValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({
      ...item,
      comments: [
        ...item.comments,
        { authorId: userId, content: commentValue, likes: 0, answers: [] },
      ],
    });
    console.log(commentValue);
  };
  return (
    <Stack
      onSubmit={handleSubmit}
      sx={{ userSelect: "none", position: "relative" }}
      p="8px 16px"
      alignItems="center"
      direction="row"
      component="form"
      spacing={2}
    >
      <EmojiBox isOpen={isOpenBoxEmoji} setCommentValue={setCommentValue} />
      <IconButton sx={{}}>
        <TagFaces
          onClick={() => setOpenBoxEmoji((isOpenBoxEmoji) => !isOpenBoxEmoji)}
        />
      </IconButton>

      <TextField
        value={commentValue}
        onChange={handleChange}
        size="small"
        multiline
        sx={{
          overflow: "hidden",
          overflowY: "auto",
          height: "30px",
        }}
        name="comment"
        required
        placeholder="Add comment"
        variant="standard"
      />
      <Button
        type="submit"
        disabled={commentValue.length ? false : true}
        color="secondary"
      >
        Publich
      </Button>
    </Stack>
  );
};

const EmojiBox = ({ isOpen, setCommentValue }) => {
  const pasteEmoji = (e) => {
    setCommentValue((prev) => prev + e.target.innerText);
  };

  return (
    <>
      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 9999,
            transform: "translateY(-100%)",
            top: "0",
            borderRadius: 1,
            p: 1,
            background: "#ccc",
          }}
        >
          {Emoji.map((el) => (
            <Typography
              title={el}
              onClick={pasteEmoji}
              component={"span"}
              sx={{ cursor: "pointer" }}
              key={el}
              fontSize={25}
            >
              {el}
            </Typography>
          ))}
        </Box>
      )}
    </>
  );
};
