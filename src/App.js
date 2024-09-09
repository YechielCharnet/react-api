import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsList from "./components/PostsList";
import Albums from "./components/Albums";
import Comments from "./components/Comments";
import Photos from "./components/Photos";
import Todos from "./components/Todos";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="posts" element={<PostsList />} />
            <Route path="comments" element={<Comments />} />
            <Route path="photos" element={<Photos />} />
            <Route path="todos" element={<Todos />} />
            <Route path="albums" element={<Albums />} />
            <Route path="*" element={<h2>Page not found</h2>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;