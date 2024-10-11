import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const handleFetch = ({ pageParam }) => {
  return axios.get(
    `http://localhost:3000/comments-if/?_limit=4/&_page=${pageParam}`
  );
};
const InfiniteQueries = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments-if"], ///most impp
    queryFn: handleFetch,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      // 40 items         ||  40 items
      // 8 each on 5pages ||  5 each on 8 pages
      if (allPages.length < 10) return allPages.length + 1;
      return undefined;
    },
    // placeholderData: keepPreviousData,  //idk it works or not!
  });

  // console.log(data?.pages?.length);

  const { ref, inView } = useInView();
  // console.log(inView);
  useEffect(() => {
    if (inView) fetchNextPage(), [];
  });

  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading) return <p>loading...</p>;

  return (
    <div className="routes">
      {data?.pages?.map((page) =>
        page?.data?.map((comment) => (
          <div key={comment.id} className="post-container">
            <h1 className="post-title">{comment.text}</h1>
          </div>
        ))
      )}
      {/* <div className="btndiv">
        <button
          // disabled={data?.pages?.length >= 10 ? true : false}
          disabled={!hasNextPage} //query provides this shit!
          className="button-54"
          onClick={fetchNextPage}
        >
          Load More...
        </button> 
         </div> */}

      <div ref={ref} style={{ marginBottom: "2rem" }}>
        {isFetchingNextPage ? "Loading.. " : ""}
      </div>
    </div>
  );
};

export default InfiniteQueries;
