import { useNavigate, useParams } from "react-router-dom";
import { useGetUserProfileQuery } from "../../../store/api/profile.api";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";
import { FontFamily } from "../../../styles/FontFamily";
import { BoldTypography } from "../../../styles/components/BoldTypography";
import { Posts } from "../../ui/Posts";
import { useSelector } from "react-redux";

export const Account = (props) => {
  const navigate = useNavigate();

  const { id: userParams } = useParams();
  const userId = userParams.split("-")[0];
  const isUser = useSelector((state) => state.user.user)?.toString();

  const { isLoading, error, data } = useGetUserProfileQuery(userId);
  if (isLoading) return <>Loading....</>;
  if (error) return <>Api error</>;

  return (
    <Box p="0 11px">
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={"6px"}
      >
        {data.private === true && <Lock fontSize="13" />}
        <BoldTypography>{data.name}</BoldTypography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Avatar sx={{ width: 86, height: 86 }} src={data.avatar || null} />
        <Stack direction="row" gap="30px">
          <Stack alignItems={"center"} name="card">
            <BoldTypography fontWeight={900}>
              {data?.posts.length}
            </BoldTypography>
            <Typography fontSize={13} fontFamily={FontFamily}>
              Posts
            </Typography>
          </Stack>
          <Stack alignItems={"center"} name="card">
            <BoldTypography fontWeight={900}>
              {data?.followers?.length || 0}
            </BoldTypography>
            <Typography fontSize={13} fontFamily={FontFamily}>
              Followers
            </Typography>
          </Stack>
          <Stack alignItems={"center"} name="card">
            <BoldTypography fontWeight={900}>
              {data.following?.length || 0}
            </BoldTypography>
            <Typography fontSize={13} fontFamily={FontFamily}>
              Following
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Box mt="17px">
        <BoldTypography>{data.name}</BoldTypography>
        <BoldTypography weight={500} component="pre">
          {data?.about}
        </BoldTypography>
      </Box>
      {isUser === userId && (
        <>
          <Button
            fullWidth
            sx={{
              border: "1px solid rgba(60, 60, 67, 0.18)",
              borderRadius: "6px",
              p: "6px 0",
              marginTop: "15px",
            }}
          >
            <BoldTypography
              size={"13px"}
              weight={900}
              sx={{
                color: "black",
                lineHeight: "18px",
              }}
            >
              Edit profile
            </BoldTypography>
          </Button>
          <Button
            fullWidth
            onClick={() =>
              localStorage.removeItem(`userId`) && navigate("/account/auth")
            }
            sx={{
              backgroundColor: "#e83131",
              "&:hover": {
                backgroundColor: "#e83131",
              },
              border: "1px solid rgba(60, 60, 67, 0.18)",
              borderRadius: "6px",
              p: "6px 0",
              marginTop: "15px",
              marginBottom: "22px",
            }}
          >
            <BoldTypography
              size={"13px"}
              weight={900}
              sx={{
                color: "white",
                lineHeight: "18px",
              }}
            >
              Log out
            </BoldTypography>
          </Button>
        </>
      )}
      <Divider sx={{ m: "5px 0" }} />
      <Posts posts={data?.posts} name={data.name} />
      {/* <Posts user={data}/> */}
    </Box>
  );
};
