import React, { useEffect, useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments?_start=0&_limit=50')
      .then(response => response.json())
      .then(data => setComments(data));
  }, []);

  return (
    <div>
      <h1>Comments for User 1</h1>
      <ul>
        {comments.map(comments => (
          <li key={comments.id}>
            <h2>{comments.title}</h2>
            <p>{comments.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
