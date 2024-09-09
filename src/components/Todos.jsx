import React, { useEffect, useState } from 'react';

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // להוסיף ?userId=1 לשאילתא כדי לקבל רק את ה-todos של userId 1
    fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  return (
    <div>
      <h1>Todos for User 1</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
