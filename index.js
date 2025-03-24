require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start the server
const PORT = 3000;
const server = app.listen(PORT, 'localhost', (err) => {
    if (err) {
        console.error("Server Error:", err);
    } else {
        console.log(`Server running on port ${PORT}`);
        console.log(`Try accessing: http://localhost:${PORT}`);
        console.log(`Test route: http://localhost:${PORT}/`);
        console.log(`Login route: http://localhost:${PORT}/api/auth/login`);
    }
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
});
