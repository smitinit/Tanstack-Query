import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const fetchPost = () => {
  return axios.get("http://localhost:3000/posts");
};
const postPost = (post) => {
  return axios.post("http://localhost:3000/posts", post);
};

function PostRQ() {
  const [title, setTitle] = useState("");
  const [views, setViews] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["posts-rq"], // unique key for all queries
    queryFn: fetchPost,
    // staleTime: 10000, // caches
    // enabled: false, //disable auto fetch and control onclick
    // refetchInterval: 1000, // fetches every second
    // refetchIntervalInBackground: true, // fetched on background (tab switch)
  });

  const { mutate } = useMutation({
    mutationFn: postPost,
    // onSuccess: (newData) => {
    //   // queryClient.invalidateQueries("posts-rq");

    //   queryClient.setQueriesData(["posts-rq"], (oldQueryData) => {
    //     ///optimising fetch only post new data and get data from caches by adding to it
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, newData.data],
    //     };
    //   });
    // },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts-rq"]);
      const previousPostData = queryClient.getQueriesData(["posts-rq"]);
      queryClient.setQueriesData(["posts-rq"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { ...newPost, id: oldQueryData?.data.length + 1 },
          ],
        };
      });
      return {
        previousPostData,
      };
    },
    onError: (_error, _post, context) => {
      queryClient.setQueryData(["posts-rq"], context.previousPostData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts-rq"]);
    },
  });

  // console.log(isLoading, isFetching);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ title, views });
    if (title !== "") {
      const post = { title, views };
      mutate(post);
      setTitle("");
      setViews("");
    }
  };

  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading) return <p>loading...</p>;

  return (
    <>
      <div className="routes">
        <div className=" formpost">
          <form onSubmit={handleSubmit}>
            <div className="inpdiv">
              <div>
                <label className="required">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="required">Description</label>
                <input
                  type="text"
                  name="views"
                  placeholder="views.."
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                />
              </div>
            </div>
            <div className="btndiv">
              <button type="submit" className="btnsub">
                Post
              </button>
              <button onClick={refetch} className="btnsub" disabled>
                Click to Fetch
              </button>
            </div>
          </form>
        </div>
        {data?.data.map((post) => {
          return (
            <div key={post.id} className="post-container">
              <Link to={`/posts-rq/${post.id}`}>
                <h1 className="post-title">{post.title}</h1>
                <h2 className="post-views"> {post.views}</h2>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PostRQ;
