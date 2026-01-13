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

const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.0.102:5173',
  'https://www.fitfintech.com',
  'https://fitfintech.com'      
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json({ limit: '100mb' })); 
app.use(express.urlencoded({ limit: '100mb', extended: true }));


app.use('/api/auth', authRouter); 
app.use('/api/blogs', blogRouter);

app.get('/', (req, res) => {
    res.send("API is Working");
});

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));