const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Import Routes
const authRouter = require('./routes/authRoutes');

// App Config
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/auth', authRouter); 

app.get('/', (req, res) => {
    res.send("API is Working");
});

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));