import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { CardMedia, Backdrop } from "@mui/material";
import styled from "styled-components";
import "swiper/css";

import "swiper/css/pagination";
import { FontFamily } from "../../styles/FontFamily";

export const SingleCardSlider = ({ item, fullImage, isWidth }) => {
  const swiper = useRef();
  const [slideCount, setSlideCount] = useState(0);

  const [backdrop, setBackdrop] = useState({
    open: false,
    img: null,
  });
  const handleSwiperChahge = () => {
    swiper.current &&
      setSlideCount(parseInt(swiper.current.swiper.realIndex + 1));
  };

  useEffect(() => {
    handleSwiperChahge();
  }, []);

  const examinationFunc = (e) => {
    return setBackdrop({
      ...backdrop,
      img: String(
        e.target.style.backgroundImage.slice(
          5,
          e.target.style.backgroundImage.length - 2
        )
      ),
      open: true,
    });
  };

  return (
    <>
      {backdrop.open === false ? (
        <Swiper
          ref={swiper}
          spaceBetween={1}
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          onSlideChange={handleSwiperChahge}
          grabCursor={true}
          modules={[Pagination]}
          style={{ height: "100%", width: !isWidth ? "auto" : "300px" }}
        >
          {item.content?.map((el, idx) => (
            <SwiperSlide key={idx + 1}>
              <CardMedia
                component="div"
                sx={{ height: fullImage !== undefined ? "100%" : 420 }}
                image={el}
                title={item.title}
                onDoubleClick={examinationFunc}
              ></CardMedia>
            </SwiperSlide>
          ))}

          <Counter>
            {slideCount}/{item.content?.length}
          </Counter>
        </Swiper>
      ) : (
        <Backdrop
          open={backdrop.open}
          sx={{
            color: "#fff",
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,.8)",
          }}
          onClick={() => setBackdrop({ ...backdrop, open: false })}
        >
          <Image onClick={(e) => e.stopPropagation()} src={backdrop.img} />
        </Backdrop>
      )}
    </>
  );
};
const Image = styled.img`
  max-height: 400px;
  min-height: 500px;
  position: relative;
  z-index: 9999;
`;
const Counter = styled.span`
  position: absolute;
  right: 30px;
  top: 30px;
  z-index: 9999;
  font-family: ${FontFamily};
  padding: 3px 9px;
  color: #fff;
  border-radius: 7px;
  background: rgba(0, 0, 0, 0.7);
`;
