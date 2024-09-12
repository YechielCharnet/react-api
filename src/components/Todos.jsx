import React, { useState, useEffect } from 'react';
import './todos.css';

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const [sortCriterion, setSortCriterion] = useState('id');

  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriterion, setSearchCriterion] = useState('id');

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);


  const sortTodos = (criterion) => {
    let sortedTodos = [...todos];
    switch (criterion) {
      case 'id':
        sortedTodos.sort((a, b) => a.id - b.id);
        break;
      case 'completed':
        sortedTodos.sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? -1 : 1);
        break;
      case 'alphabetical':
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'random':
        sortedTodos.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    setTodos(sortedTodos);
  };

  useEffect(() => {
    sortTodos(sortCriterion);
  }, [sortCriterion]);


  const filteredTodos = todos.filter(todo => {
    switch (searchCriterion) {
      case 'id':
        return todo.id.toString().includes(searchTerm);
      case 'title':
        return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
      case 'completed':
        return todo.completed.toString().toLowerCase().includes(searchTerm.toLowerCase());
      default:
        return true;
    }
  });


  const addTodo = () => {
    if (newTodoTitle.trim() !== '') {
      const newTodo = {
        id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
        title: newTodoTitle,
        completed: false,
        userId: 1
      };
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
    }
  };


  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };


  const updateTodoContent = (id, newTitle) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, title: newTitle } : todo
    ));
  };

  const toggleTodoStatus = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };


  return (
    <div className="container">
      <h1>Todos for User 1</h1>
      <div id='filters' className='selects' >
        <h3>סינון משימה</h3>
        <select value={sortCriterion} onChange={(e) => setSortCriterion(e.target.value)}>
          <option value="id">סדרתי</option>
          <option value="completed">לפי ביצוע</option>
          <option value="alphabetical">אלפביתי</option>
          <option value="random">אקראי</option>
        </select>
      </div>
      <div id='search' className='selects'>
        <h3>חיפוש משימה</h3>
        <input 
          type="text" 
          placeholder="חיפוש..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={searchCriterion} onChange={(e) => setSearchCriterion(e.target.value)}>
          <option value="id">מספר סידורי</option>
          <option value="title">כותרת</option>
          <option value="completed">מצב ביצוע</option>
        </select>
      </div>
      <div id='new-todo'>
        <h3>הוספת משימה חדשה</h3>
        <input 
          type="text" 
          placeholder="הוסף משימה חדשה..." 
          value={newTodoTitle} 
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <button onClick={addTodo}>הוסף</button>
      </div>
      <div id='todo'>
        <ul>
          {filteredTodos.map(todo => (
            <div className='todo' key={todo.id}>

                <li>
                  {todo.id}
                  <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onChange={() => toggleTodoStatus(todo.id)} 
                  />
                  <h3 onDoubleClick={() => setEditingTodo(todo.id)}>{todo.title}</h3>
                  {editingTodo === todo.id && (
                <input 
                  type="text" 
                  value={todo.title} 
                  onChange={(e) => updateTodoContent(todo.id, e.target.value)}
                  onBlur={() => setEditingTodo(null)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingTodo(null)}
                />
              )}
                  <button onClick={() => setEditingTodo(todo.id)}>ערוך</button>
                  <button onClick={() => deleteTodo(todo.id)}>מחק</button>
                </li>
        
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todos;