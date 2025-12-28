const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER Logic
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Encrypt Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const newUser = new User({
            email,
            password: hashedPassword
        });
        const user = await newUser.save();

        // Create Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token, email: user.email });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// 2. LOGIN Logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token, email: user.email });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// 3. CHANGE PASSWORD Logic
const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        // Find user by the ID (which comes from the Auth Middleware)
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Check if Old Password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect old password" });
        }

        // Hash the New Password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Save new password
        user.password = hashedNewPassword;
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = { login, register, changePassword };