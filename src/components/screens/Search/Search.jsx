import {
  Backdrop,
  Box,
  Card,
  CardMedia,
  ImageList,
  ImageListItem,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import { Posts } from "../../ui/Posts";
import { useGetPostsQuery } from "../../../store/api/api";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Close, SearchOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { SingleCardSlider } from "../../ui/SingleCardSlider";
const StyledSearchOutlined = styled(SearchOutlined)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const Search = (props) => {
  const { isLoading, error, data } = useGetPostsQuery();

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("title") || "");
  const [isBackdrop, setBackdrop] = useState(false);
  const [searchList, setSearchList] = useState([]);

  const inputElement = useRef(null);

  useEffect(() => {
    const handlePressEnter = (e) => {
      if (e.key === "Enter") return handleSubmit();
    };
    document.addEventListener(`keypress`, handlePressEnter);
    return () => {
      document.removeEventListener(`keypress`, handlePressEnter);
    };
  });

  const handleSubmit = () => {
    if (query.length <= 0) return inputElement.current.children[0].focus();
    setSearchParams({ title: query });
    setSearchList(() =>
      data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
    setBackdrop(true);
  };

  return (
    <Stack sx={{ userSelect: "none" }} spacing={2}>
      <Backdrop
        open={isBackdrop}
        sx={{ zIndex: 9999, p: "130px 0", alignItems: "start" }}
      >
        <Close
          fontSize={"large"}
          onClick={() => setBackdrop(false)}
          sx={{
            color: "#fff",
            cursor: "pointer",
            position: "absolute",
            right: "15px",
            top: "15px",
          }}
        />
        <ImageList
          sx={{ width: 500, p: "0 15px" }}
          gap={5}
          cols={3}
          rowHeight={250}
        >
          {searchList.length <= 0 ? (
            <Typography color="white">Posts not found</Typography>
          ) : (
            <>
              {searchList.map((card) => (
                <Link key={card.id} to={`/people/${card.authorId}/${card.id}`}>
                  <ImageListItem>
                    <img
                      src={card.content[0]}
                      alt=""
                      style={{ height: "100%" }}
                    />
                  </ImageListItem>
                </Link>
              ))}
            </>
          )}
        </ImageList>
      </Backdrop>
      <Stack>
        <Box sx={{ position: "relative" }}>
          <Input
            ref={inputElement}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth={true}
            placeholder="Search"
            sx={{
              border: "1px solid green",
              borderRadius: 1,
              "&::before,&::after": { display: "none" },
              input: {
                paddingLeft: "10px",
              },
            }}
          />
          <StyledSearchOutlined onClick={handleSubmit} />
        </Box>
      </Stack>
      <Box sx={{ borderRadius: 1, overflow: "hidden" }}>
        {isLoading ? (
          <>Loading...</>
        ) : error ? (
          <>Error: {error.message}</>
        ) : data.length <= 0 ? (
          <>Not found</>
        ) : (
          <Posts posts={data} fullHeight={true} />
        )}
      </Box>
    </Stack>
  );
};
