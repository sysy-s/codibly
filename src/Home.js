import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import ColorTable from "./ColorTable";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page"));
  const queryParam = parseInt(searchParams.get("id"));

  const [data, setData] = useState([]);
  const [page, setPage] = useState(pageParam ? pageParam : 1);
  const [maxPages, setMaxPages] = useState(1);
  const [query, setQuery] = useState(queryParam ? queryParam : "");
  const [notFound, setNotFound] = useState(false);

  const queryRef = useRef();

  // constructs search params ex ?page=2 or ?id=1
  function constructQueryString() {
    let queryString = "";
    if (query === "") {
      queryString = queryString.concat(`page=${page}`);
    } else {
      queryString = queryString.concat(`id=${query}`);
    }

    return queryString;
  }

  // fetch all colors ands sets data as well as max pages that is gets from the reqeuest
  function getData() {
    const queryString = constructQueryString(); // used to create search params
    const url = `https://reqres.in/api/products?${queryString}&per_page=5`;

    axios
      .get(url)
      .then((res) => {
        setData(() => res.data.data);
        setMaxPages(() => res.data.total_pages);
        navigate({ pathname: "/", search: queryString });

        if (res.data.data.length === 0) {
          setNotFound(() => true);
        }
      })
      .catch((err) => {
        setNotFound(() => true);
        navigate({ pathname: "/", search: queryString });
      });
  }

  function preventNonNumeric(e) {
    if (isNaN(e.key) && e.key !== "Backspace" && e.key !== "Enter") {
      e.preventDefault();
    }
  }

  // submit search
  function submitId(e) {
    e.preventDefault();
    console.log(queryRef.current.value);
    setQuery(queryRef.current.value);
  }

  // fetch data each time the query or page changes
  useEffect(() => {
    getData();
  }, [query, page]);

  return (
    <div style={{ width: "fit-content", margin: "1.5rem" }}>
      <form onSubmit={(e) => submitId(e)}>
        <TextField
          id="outlined-basic"
          label="ID"
          variant="outlined"
          type="number"
          onKeyDown={(e) => preventNonNumeric(e)}
          inputRef={queryRef}
        />
      </form>
      {!notFound ? (
        <ColorTable data={data} />
      ) : (
        <Card>
          <h1 style={{ textAlign: "center" }}>Not Found</h1>
        </Card>
      )}
      {!notFound && Array.isArray(data) ? (
        <Pagination
          page={page}
          setPage={setPage}
          maxPages={maxPages}
          path="/"
        />
      ) : (
        <div style={{width: "100%", display: "flex", justifyContent: "center", paddingTop: "1.5rem"}}>
          <Button
            variant="outlined"
            onClick={() => {
              setQuery("");
              setPage(1);
              setNotFound(false);
            }}
          >
            Go back
          </Button>
        </div>
      )}
    </div>
  );
}
