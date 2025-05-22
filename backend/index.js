require('dotenv').config();
const express = require('express');
const app = express();
const UserRouter = require('./routes/UserRoutes');
const PostRouter = require('./routes/PostRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(cookieParser());

app.use('/user', UserRouter)
app.use('/post', PostRouter)






app.listen(process.env.PORT, () => {
    console.log('Server Running')
})