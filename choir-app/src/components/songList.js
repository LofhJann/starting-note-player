import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SongList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/songs')
      .then(response => setSongs(response.data))
      .catch(error => console.error(error));
  }, []);

const getNoteDistanceFromC0 = note => {
	// Notes in an octave
	const noteNumberMap = { "C": 1, "C#": 2, "D♭": 2, "D": 3, "D#": 4, "E♭": 4, "E": 5, "F": 6, "F#": 7, "G♭": 7, "G": 8, "G#": 9, "A♭": 9, "A": 10, "A#": 11, "B♭": 11, "B": 12 };
	
	const getOctaveNum = note => note.charAt(note.length - 1);
	return noteNumberMap[note.slice(0, -1)] - 1 + (getOctaveNum(note) * 12);
};
/*
** Formula based from — http://www.techlib.com/reference/musical_note_frequencies.htm
** 440Hz is the frequency of A4, which is 57 notes away from C0
*/
const getFrequencyOfNoteInHz = note => 440 * Math.pow(2, (getNoteDistanceFromC0(note) - 57) / 12);

const playSong = (song) => {
  const { startingNotes } = song;
  const notes = [getFrequencyOfNoteInHz(startingNotes.t1), getFrequencyOfNoteInHz(startingNotes.t2), getFrequencyOfNoteInHz(startingNotes.b1), getFrequencyOfNoteInHz(startingNotes.b2)];
  console.log(`Playing song ${song.title}: ${notes}`);

  // Initialize the AudioContext
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContext();

  // Create a gain node to control the volume
  const gainNode = context.createGain();
  gainNode.gain.value = 0.5;
  gainNode.connect(context.destination);

  // Create an oscillator for each note
  const oscillators = notes.map(note => {
    const oscillator = context.createOscillator();
    oscillator.connect(gainNode);
    oscillator.type = 'sine';
    oscillator.frequency.value = note;
    return oscillator;
  });

  // Start the oscillators in sequence
  oscillators.forEach((oscillator, index) => {
	oscillator.start(index);
    oscillator.stop(index+1);
  });
};

  return (
    <div>
      <h2>Song List</h2>
      <ul>
        {songs.map(song => (
          <li key={song._id} onClick={() => playSong(song)}>
            <strong>{song.title}</strong> by {song.artist} - {song.startingNotes.t1}, {song.startingNotes.t2}, {song.startingNotes.b1}, {song.startingNotes.b2}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
