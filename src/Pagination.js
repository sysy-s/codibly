import { useNavigate } from "react-router";
import { Button } from "@mui/material";

export default function Pagination({ page, setPage, maxPages, path }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        paddingTop: "1rem"
      }}
    >
      <div>
        {page > 1 && (
          <Button
            variant="contained"
            onClick={() => {
              setPage((curr) => curr - 1);
              navigate({ pathname: path, search: `?page=${page - 1}` });
            }}
          >
            &larr;
          </Button>
        )}
      </div>
      <div>
        {page < maxPages && (
          <Button
            variant="contained"
            onClick={() => {
              setPage((curr) => curr + 1);
              navigate({ pathname: path, search: `?page=${page + 1}` });
            }}
          >
            &rarr;
          </Button>
        )}
      </div>
    </div>
  );
}
