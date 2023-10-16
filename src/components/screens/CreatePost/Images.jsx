import { Button, Stack } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { SingleCardSlider } from "../../ui/SingleCardSlider";
export const Images = ({ imageList, setImageList }) => {
  // const [imageList, setImageList] = useState([]);

  const handleChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImageList((prev) => [...prev, url]);
  };

  return (
    <>
      <Stack>
        <Button LinkComponent={"label"}>
          <label htmlFor="images">Upload</label>
        </Button>
        <input
          multiple
          type="file"
          accept="image/*"
          id="images"
          onChange={handleChange}
          style={{ display: "none" }}
        />
        {imageList.length > 0 && (
          <SingleCardSlider isWidth={true} item={{ content: imageList }} />
        )}
      </Stack>
    </>
  );
};

const StyledImg = styled.img`
  max-width: 100%;
`;
