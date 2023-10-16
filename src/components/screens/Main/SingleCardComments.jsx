import { usePostDetailsQuery } from "../../../store/api/posts.api";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { FontFamily } from "../../../styles/FontFamily";
import { SentimentDissatisfied } from "@mui/icons-material";
import { useGetUserProfileQuery } from "../../../store/api/profile.api";
import { createRef, forwardRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const SingleCardComments = ({
  isDrawer,
  setDrawer,
  postId,
  ifBox,
  author,
}) => {
  const { isLoading, error, data } = usePostDetailsQuery(postId, {
    selectFromResult: ({ data }) => ({ data: data?.comments }),
  });
  const ref = createRef();

  const list = () => (
    <Box sx={{ fontFamily: FontFamily }} role="presentation">
      <List
        data-visiblescroll
        sx={{
          pb: 6,
          overflow: "hidden",
          overflowY: "auto",
          height: !ifBox ? "505px" : "305px",
        }}
      >
        <Box p="8px 16px">
          <SingleRenderComment comment={author} overview={author?.overview} />
        </Box>
        {isLoading ? (
          <>Loading...</>
        ) : error ? (
          <>Error: {error.message}</>
        ) : data?.length > 0 ? (
          data.map((post, i) => {
            return <Comment key={post.id + i} comment={post} ref={ref} />;
          })
        ) : (
          <ListItem>
            No comments yet &nbsp;
            <SentimentDissatisfied />
          </ListItem>
        )}
      </List>
    </Box>
  );

  const Comment = forwardRef(({ comment }, ref) => {
    const [isOpen, setOpen] = useState(false);

    return (
      <Stack sx={{ p: "8px 16px", overflow: "hidden" }} spacing={0.3}>
        <SingleRenderComment comment={comment} type={true} />
        <Stack direction="column" spacing={2} pl={2}>
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <Divider sx={{ width: "30px", borderBottomWidth: "revert" }} />
            <Typography
              fontSize={11}
              fontWeight={600}
              sx={{ cursor: "pointer", userSelect: "none" }}
              onClick={() => {
                if (isOpen) return setOpen(false);
                setOpen(true);
              }}
            >
              {comment?.answers.length > 0
                ? !isOpen
                  ? "Looking"
                  : "Hidden"
                : "Haven't"}{" "}
              answers ({comment?.answers.length})
            </Typography>
          </Stack>
          <Stack
            ref={ref}
            pl={2}
            spacing={1}
            sx={{
              transition: "height .4s ease",
              overflow: "hidden",
              overflowY: "auto",
              height: !isOpen ? 0 : `${ref.current?.scrollHeight}px`,
            }}
          >
            {comment?.answers.map((answer, i) => (
              <SingleRenderComment
                ref={ref}
                key={answer.id + i}
                comment={answer}
                type={false}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    );
  });

  return (
    <>
      {ifBox === undefined ? (
        <Drawer
          anchor="bottom"
          sx={{
            "& .MuiDrawer-paper": {
              maxWidth: 500,
              margin: "0 auto",
              borderRadius: 3,
            },
          }}
          onClose={() => setDrawer(false)}
          open={isDrawer}
        >
          {list("bottom")}
        </Drawer>
      ) : (
        <Box sx={{ background: "#fff" }}>{list("bottom")}</Box>
      )}
    </>
  );
};

const SingleRenderComment = ({ comment, type, overview }) => {
  const { data, isLoading } = useGetUserProfileQuery(comment?.authorId);
  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : data ? (
        <Stack name="CardComment" spacing={0.3}>
          <Stack direction="row" spacing={2}>
            <Link to={`/people/${data.id}-${data.name.split(" ").join("-")}`}>
              <Avatar src={data.avatar} sx={{ cursor: "pointer" }} />
            </Link>
            <Box>
              <Typography fontWeight={600}>
                {data.name} <wbr />
                <Typography sx={{ cursor: "default" }} component="span">
                  {comment.content || overview}
                  {overview !== undefined && <Divider />}
                </Typography>
              </Typography>
            </Box>
          </Stack>
          {!overview && (
            <Stack direction="row" spacing={2}>
              <Typography component="time" fontSize={12}>
                {Math.floor(Math.random() * 24)}h.
              </Typography>
              <Typography component="span" fontSize={12}>
                Likes: {comment.likes}
              </Typography>
              {type ? (
                <Typography component="button" fontSize={12}>
                  Answer
                </Typography>
              ) : (
                <></>
              )}
            </Stack>
          )}
        </Stack>
      ) : (
        ""
      )}
    </>
  );
};
