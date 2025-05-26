require('dotenv').config();
const express = require('express');
const app = express();
const UserRouter = require('./routes/UserRoutes');
const PostRouter = require('./routes/PostRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials: true
}));
app.use(cookieParser());

// 🔐 Access-Control Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URI);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Routes
app.use('/user', UserRouter);
app.use('/post', PostRouter);

// Health Check (optional)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
