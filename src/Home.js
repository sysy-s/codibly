import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import ColorTable from "./ColorTable";

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page"));
  const queryParam = parseInt(searchParams.get("id"));

  const [data, setData] = useState([]);
  const [page, setPage] = useState(pageParam ? pageParam : 1);
  const [maxPages, setMaxPages] = useState(1);
  const [query, setQuery] = useState(queryParam ? queryParam : "");
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
    

    axios.get(url).then((res) => {
      console.log(url);
      console.log(res.data.data);
      setData(() => res.data.data);
      setMaxPages(() => res.data.total_pages);
      navigate({ pathname: "/", search: queryString });
    });
  }

  function preventNonNumeric(e) {
    console.log(e.key);
    if (isNaN(e.key) && e.key !== "Backspace" && e.key !== "Enter") {
      e.preventDefault();
    }
  }

  // submit search
  function submitId(e) {
    e.preventDefault();
    setQuery(queryRef.current.value);
  }

  // fetch data each time the query or page changes
  useEffect(() => {
    getData();
  }, [query, page]);

  return (
    <div style={{ width: "fit-content" }}>
      <form onSubmit={(e) => submitId(e)}>
        <input type="number" onKeyDown={e => preventNonNumeric(e)} ref={queryRef} placeholder="ID..." />
      </form>
      <ColorTable data={data} />
      {Array.isArray(data) ? <Pagination page={page} setPage={setPage} maxPages={maxPages} path="/" /> :
      <button onClick={() => setQuery(() => "")}>Go back</button>
      }
    </div>
  );
}
