import React, { useEffect, useState } from "react";
import Comments from "./Comments";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showContent, setShowContent] = useState({});
  const [showComments, setShowComments] = useState({});
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.id.toString().includes(searchQuery) ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, posts]);

  const toggleContent = (postId) => {
    setShowContent((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const toggleComments = (postId) => {
    if (showComments === postId) {
      setShowComments(null);
    } else {
      setShowComments(postId);
    }
  };

  const addPost = () => {
    const newId = posts.length + 1;
    const newPostData = {
      id: newId,
      title: newPost.title,
      body: newPost.body,
      userId: 1,
    };

    setPosts([...posts, newPostData]);

    setNewPost({
      title: "",
      body: "",
    });
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div>
      <h1>Posts for User 1</h1>

      <input
        type="text"
        placeholder="Search by ID or Title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            {post.id}
            <h2>{post.title}</h2>
            <button onClick={() => toggleContent(post.id)}>
              {showContent[post.id] ? "Hide Content" : "Show Content"}
            </button>
            <button onClick={() => toggleComments(post.id)}>
              {showComments === post.id ? "Hide Comments" : "Show Comments"}
            </button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
            {showComments === post.id && <Comments postId={post.id} />}
            {showContent[post.id] && <p>{post.body}</p>}
          </li>
        ))}
      </ul>

      <div>
        <h3>Add New Post</h3>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <button onClick={addPost}>Add Post</button>
      </div>
    </div>
  );
};

export default PostsList;
