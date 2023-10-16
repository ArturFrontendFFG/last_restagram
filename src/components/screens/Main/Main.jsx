import styled from "styled-components";
import { useGetPostsQuery } from "../../../store/api/api";
import { CircularProgress, Skeleton, Stack, Typography } from "@mui/material";
import { Flex } from "../../../styles/components/Flex";
import { Error } from "../../../styles/components/Error";
import { ErrorOutline } from "@mui/icons-material";
import { SingleCard } from "./SingleCard";
export const Main = (props) => {
  const { data, isLoading, error } = useGetPostsQuery();
  return (
    <StyledMain>
      {isLoading ? (
        <Stack spacing={2}>
          {[1, 2, 3].map((el) => (
            <Skeleton
              key={el}
              variant="rectangular"
              sx={{ bgcolor: "grey.500" }}
              height={620}
            ></Skeleton>
          ))}
        </Stack>
      ) : error ? (
        <Flex align="center" justify="center">
          <Error color="error" variant="h4">
            Api Error
            <ErrorOutline sx={{ ml: 2 }} color="error"></ErrorOutline>
          </Error>
        </Flex>
      ) : data.length ? (
        <Stack spacing={2}>
          {Array.from(data)
            .reverse()
            .map((item) => (
              <SingleCard key={item.id} item={item}></SingleCard>
            ))}
        </Stack>
      ) : (
        <Error color="error" variant="h4">
          Posts not found
        </Error>
      )}
    </StyledMain>
  );
};
const StyledMain = styled.main``;
