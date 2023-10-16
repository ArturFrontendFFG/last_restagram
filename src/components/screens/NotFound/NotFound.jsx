import { Button } from "@mui/material";
import GlobalStyles from "../../../styles/GlobalStyles";
import { Error } from "../../../styles/components/Error";
import { useNavigate} from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const prevPage = () => navigate(-1);

  return (
    <>
      <Error color="secondary" fontSize={50}>
        404 Page not found
      </Error>
      <Button fullWidth onClick={prevPage}>
        Go prev page
      </Button>
      <GlobalStyles />
    </>
  );
};
