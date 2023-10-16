import { ImageList, ImageListItem, Typography } from "@mui/material";
import { CropFree, SentimentDissatisfied } from "@mui/icons-material";
import { Link, Outlet, useLocation, useNavigation } from "react-router-dom";
import styled from "styled-components";

export const Posts = ({ posts, name, fullHeight }) => {
  const location = useLocation();
  return (
    <>
      <Outlet />
      {posts.length <= 0 ? (
        <Typography sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {name} don't add any posts yet
          <SentimentDissatisfied />
        </Typography>
      ) : (
        <StyleImageList
          key={name}
          cols={3}
          rowHeight={220}
          fullHeight={fullHeight}
        >
          {posts.map((item) => {
            const to = item.authorId + "/" + item.id;
            return (
              <>
                <StyledListItem
                  key={item.id}
                  component={Link}
                  to={
                    location.pathname.includes("search")
                      ? `/people/${to}`
                      : `${item.id}`
                  }
                >
                  <StyledCropFree />
                  <img
                    srcSet={`${item.content}`}
                    src={`${item.content}`}
                    alt={item.title}
                    loading="lazy"
                  />
                </StyledListItem>
              </>
            );
          })}
        </StyleImageList>
      )}
    </>
  );
};

const StyleImageList = styled(ImageList)`
  width: 100%;
  height: ${({ fullHeight }) => (fullHeight !== undefined ? "100%" : "290px")};
`;
const StyledListItem = styled(ImageListItem)`
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    transition: 0.4s ease;
    opacity: 0;
  }
  &:hover {
    &::before {
      opacity: 1;
    }
    .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium {
      opacity: 1;
    }
  }
`;
const StyledCropFree = styled(CropFree)`
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;

  transition: 0.4s ease !important;
`;
