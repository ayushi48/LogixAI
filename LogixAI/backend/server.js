// // require('dotenv').config();

// // const express = require('express');
// // const cookieParser = require('cookie-parser');
// // const connectDB = require('./config/db');
// // const authMiddleware = require('./middleware/authmiddleware');
// // const { login, refresh, logout, getMe } = require('./controllers/authController');

// // const app = express();
// // connectDB();

// // app.use(express.json());
// // app.use(cookieParser());

// // // Routes
// // app.post('/login', login);
// // app.post('/refresh', refresh);
// // app.post('/logout', logout);
// // app.get('/me', authMiddleware, getMe);

// // app.listen(5000, () => console.log('🚀 Server running on port 5000'));



// require('dotenv').config(); // Load env variables first

// const express = require('express');
// const cookieParser = require('cookie-parser');
// const connectDB = require('./config/db');
// const authMiddleware = require('./middleware/authmiddleware');
// const { login, refresh, logout, getMe } = require('./controllers/authController');
// const chatRoutes = require('./routes/chatRoutes'); // <-- ADD THIS

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());

// // Auth routes
// app.post('/login', login);
// app.post('/refresh', refresh);
// app.post('/logout', logout);
// app.get('/me', authMiddleware, getMe);

// // Chat routes (protected)
// app.use('/chat', chatRoutes); // <-- ADD THIS

// // Start server
// app.listen(5000, () => console.log('🚀 Server running on port 5000'));


require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // <-- ADD THIS
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/authmiddleware');
const { login, refresh, logout, getMe } = require('./controllers/authController');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// CORS Middleware (allow frontend to talk to backend)
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true // allow cookies if using JWT refresh in cookies
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Auth routes
app.post('/login', login);
app.post('/refresh', refresh);
app.post('/logout', logout);
app.get('/me', authMiddleware, getMe);

// Chat routes (protected)
app.use('/chat', chatRoutes);

// Start server
app.listen(5000, () => console.log('🚀 Server running on port 5000'));
