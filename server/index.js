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

// Routes
app.use('/api/events', require('./routes/events'));
app.use('/api/payment', require('./routes/payment'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
