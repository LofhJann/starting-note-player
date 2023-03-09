const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema for song and startingNote models
const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genre: String,
  startingNotes: {
    t1: String,
    t2: String,
    b1: String,
    b2: String
  }
});

// Define song and startingNote models
const Song = mongoose.model('Song', songSchema);

// Middleware
app.use(express.json());
app.use(cors());

// Endpoints
app.get('/api/songs', (req, res) => {
  Song.find()
    .then(songs => res.json(songs))
    .catch(error => console.error(error));
});

// Start server
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
