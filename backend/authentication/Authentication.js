const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
          return  res.status(401).json({ error: "UnAuthorized" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
        let user = await User.findOne({ email: decoded.email, _id: decoded._id }).select("-password");
        req.user = user
        next();
    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { isLoggedIn }