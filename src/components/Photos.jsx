import React, { useEffect, useState } from 'react';

const Photos = ({ albumId }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then(response => response.json())
      .then(data => setPhotos(data));
  }, [albumId]);

  const deletePhoto = (photoId) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };

  return (
    <div>
      <h3>Photos for Album {albumId}</h3>
      <ul>
        {photos.map(photo => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
            <button onClick={() => deletePhoto(photo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photos;
