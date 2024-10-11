import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import PostRQ from "./components/PostRQ";
import PostTraditional from "./components/postTraditional";
import RQPostPage from "./components/RQPostPage";
import PaginatedQueries from "./components/PaginatedQueries";
import InfiniteQueries from "./components/InfiniteQueries";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/posts-rq">Posts RQ</Link>
            </li>
            <li>
              <Link to="/posts-rq-pq">Paginated Queries</Link>
            </li>
            <li>
              <Link to="/posts-rq-if">Infinite Queries</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/posts" element={<PostTraditional />} />
          <Route exact path="/posts-rq" element={<PostRQ />} />
          <Route path="/posts-rq/:postId" element={<RQPostPage />} />
          <Route path="/posts-rq-pq" element={<PaginatedQueries />} />
          <Route path="/posts-rq-if" element={<InfiniteQueries />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
