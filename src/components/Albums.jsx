import React, { useEffect, useState } from 'react';
import Photos from './Photos'; // ודא שהנתיב נכון לקומפוננטה שלך

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [showContent, setShowContent] = useState({});

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums?userId=1')
      .then(response => response.json())
      .then(data => setAlbums(data));
  }, []);

  useEffect(() => {
    setFilteredAlbums(
      albums.filter(
        (album) =>
          album.id.toString().includes(searchQuery) ||
          album.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, albums]);

  const toggleContent = (albumId) => {
    setShowContent((prevState) => ({
      ...prevState,
      [albumId]: !prevState[albumId],
    }));
  };

  return (
    <div>
      <h1>Albums for User 1</h1>
      <input
        type="text"
        placeholder="Search by ID or Title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredAlbums.map((album) => (
          <li key={album.id}>
            <h2>{album.title}</h2>
            <button onClick={() => toggleContent(album.id)}>
              {showContent[album.id] ? "Hide Content" : "Show Content"}
            </button>
            {showContent[album.id] && <Photos albumId={album.id} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
