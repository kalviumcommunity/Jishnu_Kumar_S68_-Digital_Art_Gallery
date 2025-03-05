const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/digital_art_gallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ArtPiece model
const ArtPiece = mongoose.model('ArtPiece', new mongoose.Schema({
  title: String,
  artist: String,
  imageUrl: String,
  description: String,
}));

// Endpoint to fetch art pieces
app.get('/api/artpieces', async (req, res) => {
  try {
    const artPieces = await ArtPiece.find();
    res.json(artPieces);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
