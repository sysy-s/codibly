import { useNavigate } from "react-router";

export default function Pagination({ page, setPage, maxPages, path }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      {page > 1 && (
        <button
          onClick={() => {
            setPage((curr) => curr - 1);
            navigate({ pathname: path, search: `?page=${page - 1}` });
          }}
        >
          &larr;
        </button>
      )}
      {page < maxPages && (
        <button
          onClick={() => {
            setPage((curr) => curr + 1);
            navigate({pathname: path, search: `?page=${page + 1}`});
          }}
        >
          &rarr;
        </button>
      )}
    </div>
  );
}
