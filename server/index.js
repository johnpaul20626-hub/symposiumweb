console.log("App starting...");

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded screenshots
app.use('/assets', express.static('assets'));   // Serve event images

// Minimum test route for Railway
app.get("/", (req, res) => {
    res.send("Backend is LIVE 🚀");
});

// Routes
app.use('/api/events', require('./routes/events'));
app.use('/api/payment', require('./routes/payment'));

const PORT = process.env.PORT || 5001;

// Crucial: Bind to 0.0.0.0 so Railway's proxy can route traffic correctly
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
