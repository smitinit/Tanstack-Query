import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const handleFetch = (pageId) => {
  return axios.get(`http://localhost:3000/comments/?_limit=4/&_page=${pageId}`);
};
const PaginatedQueries = () => {
  const [page, setPage] = useState(1);
  // const MAX = 4;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", page], ///most impp
    queryFn: () => handleFetch(page),
    placeholderData: keepPreviousData, ///loading secrete ...no loading !! instead previous data showed till new data comes..
    staleTime: 10000,
  });

  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading) return <p>loading...</p>;

  return (
    <div className="routes noscroll">
      {data?.data.map((comment) => {
        return (
          <div key={comment.id} className="post-container">
            <h1 className="post-title">{comment.text}</h1>
          </div>
        );
      })}
      <div className="btndiv">
        <button
          disabled={page == 1 ? true : false}
          className="button-54"
          onClick={() => setPage((prev) => prev - 1)}
        >
          🔙
        </button>
        <button
          disabled={page == 5 ? true : false}
          onClick={() => setPage((prev) => prev + 1)}
          className="button-54"
        >
          ⏭️
        </button>
      </div>
    </div>
  );
};

export default PaginatedQueries;
