import React, { useState } from 'react';
import axios from 'axios';

function AddSongForm() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [startingNotes, setStartingNotes] = useState({
    t1: '',
    t2: '',
    b1: '',
    b2: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/songs`, { title, artist, startingNotes })
      .then(response => {
        console.log(response.data);
        setTitle('');
        setArtist('');
        setStartingNotes({
          t1: '',
          t2: '',
          b1: '',
          b2: ''
        });
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
      </label>
      <br />
      <label>
        Artist:
        <input type="text" value={artist} onChange={event => setArtist(event.target.value)} />
      </label>
      <br />
	 <label>
        T1 Starting Note:
        <input type="text" value={startingNotes.t1} onChange={event => setStartingNotes({ ...startingNotes, t1: event.target.value })} />
      </label>
      <br />
      <label>
        T2 Starting Note:
        <input type="text" value={startingNotes.t2} onChange={event => setStartingNotes({ ...startingNotes, t2: event.target.value })} />
      </label>
      <br />
      <label>
        B1 Starting Note:
        <input type="text" value={startingNotes.b1} onChange={event => setStartingNotes({ ...startingNotes, b1: event.target.value })} />
      </label>
      <br />
      <label>
        B2 Starting Note:
        <input type="text" value={startingNotes.b2} onChange={event => setStartingNotes({ ...startingNotes, b2: event.target.value })} />
      </label>
      <br />
      <button type="submit">Add Song</button>
    </form>
  );
}

export default AddSongForm;
