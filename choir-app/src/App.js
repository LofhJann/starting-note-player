import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SongList from './components/songList.js';

function App() {
  const [songs, setSongs] = useState([]);
  const [startingNotes, setStartingNotes] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/songs`)
      .then(response => setSongs(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSongClick = (songId) => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/starting-notes/${songId}`)
      .then(response => setStartingNotes(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Choir App</h1>
	<SongList />
    </div>
  );
}

export default App;
