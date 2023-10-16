import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { FontFamily } from "../../styles/FontFamily";

const map = new Map([
  ["/people", "People"],
  ["/account/auth", "Authorization"],
  ["/account/registration", "Registration"],
  ["/search", "Search"],
  ["/create", "Create Post"]
]);

const breadcrumbNameMap = (exam, name) => {
  let result;
  if (name !== undefined && name.length > 0)
  return (result = name.join("").split("-").slice(1).join("-"));

  return (result = map.get(exam));
};

const NavigateLink = (props) => {
  return <Link {...props} component={RouterLink} />;
};

export const BreadCrumbs = (props) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumbs">
      <NavigateLink
        underline="hover"
        sx={{ cursor: "pointer", fontFamily: FontFamily }}
        color="inherit"
      >
        Home
      </NavigateLink>
      {pathnames.map((el, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap(to, to.split("/").splice(2))}
          </Typography>
        ) : (
          <NavigateLink underline="hover" color="inherit" key={to}>
            {breadcrumbNameMap(to, undefined)}
          </NavigateLink>
        );
      })}
    </Breadcrumbs>
  );
};
