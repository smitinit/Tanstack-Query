import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import axios from "axios";

const handleFetch = (postId) => {
  return axios.get(`http://localhost:3000/posts/${postId}`);
};
const RQPostPage = () => {
  const { postId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => handleFetch(postId),
  });

  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading) return <p>loading...</p>;

  const { title, views } = data?.data || {};

  return (
    <div>
      <h1
        className="post-title"
        style={{ textAlign: "center", padding: "1rem", marginTop: "2rem" }}
      >
        Single Post Page!
      </h1>
      <div className="post-container base">
        <h1 className="post-title">{title}</h1>
        <h2 className="post-views">{views}</h2>
      </div>
    </div>
  );
};

export default RQPostPage;
