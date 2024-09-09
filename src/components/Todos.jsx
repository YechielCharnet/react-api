import React, { useEffect, useState } from 'react';

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  return (
    <div>
      <h1>Todos for User 1</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.id}
            <h3>{todo.title}</h3>
            <input type="checkbox" checked={todo.completed}  />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
