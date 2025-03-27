const express = require("express");
const router = express.Router();

// Login Endpoint
router.post("/login", (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }
    res.cookie("username", username, { httpOnly: true }); // Setting cookie
    res.json({ message: "Login successful", username });
});

// Logout Endpoint
router.post("/logout", (req, res) => {
    res.clearCookie("username"); // Removing cookie
    res.json({ message: "Logout successful" });
});

module.exports = router;
