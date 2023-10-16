import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { usePostDetailsQuery } from "../../store/api/posts.api";
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { SingleCardSlider } from "./SingleCardSlider";
import { SingleCardComments } from "../screens/Main/SingleCardComments";
import {
  BookmarkAddOutlined,
  BookmarkBorder,
  BookmarkOutlined,
  Clear,
  CommentOutlined,
  FavoriteBorder,
  FavoriteOutlined,
  MapsUgcOutlined,
  MoreHoriz,
  SendOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useGetUserProfileQuery } from "../../store/api/profile.api";
import { BoldTypography } from "../../styles/components/BoldTypography";
import { CreateComment } from "../widgets/CreateComment";
import { usePutPostMutation } from "../../store/posts/putPost.api";

export const PostDetail = () => {
  const { postId } = useParams();
  const { data, isLoading, error } = usePostDetailsQuery(postId);
  const navigate = useNavigate();
  const [isLike, setLike] = useState(false);
  const [putPost, { isSuccess, error: favoriteError }] = usePutPostMutation();

  const handleFavorite = async () => {
    if (isLike) {
      await putPost({ ...data, likes: data.likes - 1 });
      return setLike(false);
    }
    await putPost({ ...data, likes: data.likes + 1 });
    if (favoriteError) return <>Error {favoriteError.message}</>;
    setLike(true);
  };

  if (isLoading)
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  if (error) return <>Api error</>;

  return (
    <Backdrop open={true} sx={{ zIndex: 9998 }}>
      <StyledClearIcons fontSize="large" onClick={() => navigate(-1)} />
      <Stack
        onClick={(e) => e.stopPropagation()}
        direction="row"
        sx={{ width: "80%", maxHeight: 533, minHeight: 533 }}
      >
        <Box sx={{ width: "50%" }}>
          <SingleCardSlider fullImage={true} item={data} />
        </Box>

        <Box sx={{ width: "50%", background: "#fff" }}>
          <RenderAuthorOverview
            authorId={data.authorId}
            postOverview={data.overview}
          />

          <SingleCardComments
            author={{
              avatar: data.avatar,
              authorId: data.authorId,
              name: data.name,
              overview: data.overview,
            }}
            ifBox={true}
            postId={data.id}
            ifDrawer={true}
          />
          <Divider sx={{ mt: 1, mb: 1, bgcolor: "#ccc" }} />
          <Box p="8px 16px">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Stack direction="row" spacing={2}>
                <FavoriteBorder
                  sx={{ color: isLike && "red" }}
                  onClick={handleFavorite}
                />
                <MapsUgcOutlined />
                <ShareOutlined />
              </Stack>
              <BookmarkBorder />
            </Stack>
            <Divider />
            <Typography fontWeight={600} fontSize={14}>
              {data.likes} Likes
            </Typography>
            <Typography
              fontSize={10}
              color="A8A8A8"
              component="time"
              title="2 октябрь 2023 г."
            >
              {Math.floor(Math.random() * 24)} hour back
            </Typography>
          </Box>
          <CreateComment item={data} />
        </Box>
      </Stack>
    </Backdrop>
  );
};

const RenderAuthorOverview = ({ authorId }) => {
  const { data, isLoading } = useGetUserProfileQuery(authorId);
  if (isLoading) return;
  return (
    <Stack>
      <Stack
        direction="row"
        p="8px 16px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={data.avatar} />
          <BoldTypography>{data.name}</BoldTypography>
        </Stack>
        <IconButton>
          <MoreHoriz />
        </IconButton>
      </Stack>
      <Divider />
    </Stack>
  );
};

const StyledClearIcons = styled(Clear)`
  cursor: pointer;
  color: #fff;
  position: absolute;
  right: 15px;
  top: 15px;
`;
