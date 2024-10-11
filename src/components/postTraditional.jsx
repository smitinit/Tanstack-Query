import axios from "axios";
import { useEffect, useState } from "react";

function PostTraditional() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setData(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) return <p>Error</p>;
  if (loading) return <p>loading...</p>;
  if (data)
    return (
      <div className="routes">
        {data.map((post) => {
          return (
            <div key={post.id} className="post-container">
              <h1 className="post-title">{post.title}</h1>
              <h2 className="post-views">{post.views}</h2>
            </div>
          );
        })}
      </div>
    );
}

export default PostTraditional;
