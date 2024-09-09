import React, { useEffect, useState } from 'react';

const Photos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => setPhotos(data));
  }, []);

  return (
    <div>
      <h1>Photos</h1>
      <ul>
        {photos.map(photos => (
          <li key={photos.id}>
            <h2>{photos.title}</h2>
            <p>{photos.url}</p>
            <p>{photos.thumbnailUrl}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photos;
