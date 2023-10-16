import { Avatar, Card, CardContent, Divider, Typography } from "@mui/material";
import { Stack, IconButton } from "@mui/material";
import { Box } from "../../../styles/components/Box";
import { Bookmark, Favorite, MapsUgc, Send } from "@mui/icons-material";
import { usePutPostMutation } from "../../../store/posts/putPost.api";
import { useGetUserProfileQuery } from "../../../store/api/profile.api";
import { useState } from "react";
import { SingleCardSlider } from "../../ui/SingleCardSlider";
import { Flex } from "../../../styles/components/Flex";
import { FontFamily } from "../../../styles/FontFamily";
import { SingleCardComments } from "./SingleCardComments";
import { useNavigate } from "react-router-dom";
import { BoldTypography } from "../../../styles/components/BoldTypography";
export const SingleCard = ({ item }) => {
  const { data, isLoading, error } = useGetUserProfileQuery(item.authorId);

  const cardDate = new Date(item.time);

  return (
    <Card
      data-id={item.id}
      sx={{
        border: "1px solid black",
        p: "30px",
        "@media(max-width: 375px)": {
          p: 0,
        },
      }}
    >
      <Profile userId={item.authorId} />

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          p: 1,
          boxShadow: "0px 0px 3px rgba(0,0,0,.2)",
          borderRadius: 1,
          ivervflow: "hidden",
        }}
      >
        {" "}
        <BoldTypography
          sx={{
            p: "5px",
            "&:first-letter": { textTransform: "uppercase" },
          }}
        >
          {item?.title}
        </BoldTypography>
        <Typography fontSize={14} sx={{ maxWidth: 170 }}>
          The post was created in {cardDate.getFullYear()} year at{" "}
          {cardDate.getHours()} o'clock
        </Typography>
      </Stack>

      <SingleCardSlider item={item} />
      <CardContent sx={{ p: "0 10px" }}>
        <SocialLink item={item} postId={item.id} />
        <Divider />
        <Typography m={1}>Likes: {item.likes}</Typography>
        <Stack direction="row" spacing={0.6}>
          {!isLoading && (
            <>
              <Typography component="p" variant="body2">
                <Typography component="span" fontWeight={600}>
                  {" "}
                  {data?.name}:
                </Typography>
                &nbsp;{item.overview}
              </Typography>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

const SocialLink = ({ postId, item }) => {
  const [isDrawer, setDrawer] = useState(false);
  const [isLike, setLike] = useState(false);
  const [putPost, { isSuccess, error }] = usePutPostMutation();

  const handleFavorite = async () => {
    if (isLike) {
      await putPost({ ...item, likes: item.likes - 1 });
      return setLike(false);
    }
    await putPost({ ...item, likes: item.likes + 1 });
    if (error) return <>Error {error.message}</>;
    setLike(true);
  };

  return (
    <Flex justify="space-between" align="center">
      <Stack direction="row" p="13.5px 0" spacing={1}>
        <IconButton>
          <Favorite sx={{ color: isLike && "red" }} onClick={handleFavorite} />
        </IconButton>

        <IconButton onClick={() => setDrawer(true)}>
          <MapsUgc />
        </IconButton>

        <IconButton>
          <Send />
        </IconButton>
      </Stack>
      <IconButton>
        <Bookmark />
      </IconButton>

      <SingleCardComments
        isDrawer={isDrawer}
        setDrawer={setDrawer}
        postId={postId}
      />
    </Flex>
  );
};

const Profile = ({ userId }) => {
  const { data, isLoading, error } = useGetUserProfileQuery(userId);
  const navigate = useNavigate();

  const redirect = (e) => {
    e.preventDefault();
    navigate(`/people/${data.id}-${data.name.split(" ").join("-")}`);
  };

  return (
    <>
      {!isLoading && !error ? (
        <Stack
          direction="row"
          sx={{
            boxShadow: "0 0 2px rgba(0,0,0,.4)",
            borderRadius: "5px 5px 0 0",
          }}
          p={"11px 10px"}
        >
          <Stack
            onClick={redirect}
            sx={{ cursor: "pointer", p: 1 }}
            direction="row"
            spacing="10px"
          >
            <Avatar src={data.avatar} />
            <Box>
              <Typography fontWeight={600} fontFamily={FontFamily}>
                {data.name || <></>}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
};
