const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Added cookie parser

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/digital_art_gallery", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ArtPiece model
const ArtPiece = mongoose.model(
  "ArtPiece",
  new mongoose.Schema({
    title: String,
    artist: String,
    imageUrl: String,
    description: String,
  })
);

// Endpoint to fetch art pieces
app.get("/api/artpieces", async (req, res) => {
  try {
    const artPieces = await ArtPiece.find();
    res.json(artPieces);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Endpoint to fetch a single art piece
app.get("/api/artpieces/:id", async (req, res) => {
  try {
    const artPiece = await ArtPiece.findById(req.params.id);
    res.json(artPiece);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Endpoint to update an art piece
app.put("/api/artpieces/:id", async (req, res) => {
  try {
    const artPiece = await ArtPiece.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(artPiece);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Endpoint to delete an art piece
app.delete("/api/artpieces/:id", async (req, res) => {
  try {
    await ArtPiece.findByIdAndDelete(req.params.id);
    res.send("Art piece deleted");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

/* ---------------------- AUTHENTICATION ROUTES ---------------------- */

// Login Endpoint - Sets username in cookie
app.post("/auth/login", (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  res.cookie("username", username, { httpOnly: true }); // Secure cookie
  res.json({ message: "Login successful", username });
});

// Logout Endpoint - Removes the cookie
app.post("/auth/logout", (req, res) => {
  res.clearCookie("username");
  res.json({ message: "Logout successful" });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
