import React, { useEffect, useState } from 'react';

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/Albums')
      .then(response => response.json())
      .then(data => setAlbums(data));
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {albums.map(albums => (
          <li key={albums.id}>
            <h2>{albums.title}</h2>
            <p>{albums.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
