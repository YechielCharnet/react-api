import React, { useEffect, useState } from 'react';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  // בקשה לשרת לקבלת התגובות לפי postId
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => response.json())
      .then(data => setComments(data));
  }, [postId]);

  // פונקציה למחיקת תגובה לפי ה-id
  const deleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div>
      <h3>Comments for Post {postId}</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.body}</p>
            <button onClick={() => deleteComment(comment.id)}>Delete</button> {/* כפתור מחיקה */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
