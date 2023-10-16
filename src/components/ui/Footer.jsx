import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Home,
  Search,
  Add,
  FavoriteBorder,
  Person,
  Title,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const Footer = () => {
  const [state, setState] = useState("active");

  const userId = useSelector((state) => state.user.user);
  useEffect(() => {
    document.addEventListener(
      `scroll`,
      () => {
        const bottomOffset = 50;
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - bottomOffset
        ) {
          setState("active");
        } else {
          setState(null);
        }
      },
      []
    );
  });

  const navigate = useNavigate();

  const handleRedirect = (to) => {
    setTimeout(() => {
      navigate(to);
    }, 100);
  };

  return (
    <>
      <BottomNavigation
        showLabels={false}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          zIndex: 9999,
          right: 0,
          transition: "transform .4s ease",
          boxShadow: "0 0 4px rgba(0,0,0,.4)",
          transform: `translateY(${state ? 100 : 0}px)`,
          overflow: "hidden",
          p: state ? "1.4, 0,6" : 0,
        }}
      >
        <Divider />
        <Tooltip title="Main page">
          <BottomNavigationAction
            onClick={() => handleRedirect("/")}
            label="house"
            fontSize="medium"
            sx={{ padding: 0 }}
            icon={<Home />}
          />
        </Tooltip>
        <Tooltip title="Search">
          <BottomNavigationAction
            label="search"
            fontSize="medium"
            sx={{ padding: 0 }}
            onClick={() => handleRedirect("/search")}
            icon={<Search />}
          />
        </Tooltip>
        <Tooltip title="Create post">
          <BottomNavigationAction
            onClick={() => handleRedirect("/create")}
            label="add"
            fontSize="medium"
            sx={{
              padding: 0,
              "svg ": {
                border: "1px solid #ccc",
                padding: "5px",
                boxSizing: "content-box",
                borderRadius: 15,
              },
            }}
            icon={<Add />}
          />
        </Tooltip>
        <Tooltip title="Favorite">
          <BottomNavigationAction
            label="favorite"
            fontSize="medium"
            sx={{ padding: 0 }}
            icon={<FavoriteBorder />}
          />
        </Tooltip>
        <Tooltip title="Profile">
          <BottomNavigationAction
            onClick={() => handleRedirect(`/people/${userId}`)}
            fontSize="medium"
            label="person"
            sx={{ padding: 0 }}
            icon={<Person />}
          />
        </Tooltip>
      </BottomNavigation>
    </>
  );
};
