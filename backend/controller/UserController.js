const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');


const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ error: "User Already Exist" })
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        const token = jwt.sign({ email: user.email, _id: user.id, role: user.role }, process.env.JWT_SECRET_KEY, { expireIn: '15m' });
        res.cookie('token', token);
        res.status(201).json({ message: "USer Created Successfully" });
    }
    catch {
        res.status(500).json({ error: "Internal Error" })
    }
}


// For Login User 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not Available" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect Password' });
        }

        const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' })
        res.cookie('token', token)
        return res.status(200).json({ message: "Login Successfully", user: { email: user.email, role: user.role } })
    }
    catch {
        res.status(500).json({ error: "Internal Error" })

    }
}






// for Logout User
const logoutUser = async (req, res) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Error' });
    }
  };
  




module.exports = {
    createUser,
    loginUser,
    logoutUser,
}