const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const connectCloudinary = require('./config/cloudinary');

// Import Routes
const authRouter = require('./routes/authRoutes');
const blogRouter = require('./routes/blogRoutes');

// App Config
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/auth', authRouter); 
app.use('/api/blogs', blogRouter);

app.get('/', (req, res) => {
    res.send("API is Working");
});

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));