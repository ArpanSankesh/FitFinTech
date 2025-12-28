const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER (Modified: One Admin Only)
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ CHECK: Block if an admin already exists
        const userCount = await User.countDocuments();
        if (userCount > 0) {
            return res.json({ success: false, message: "Admin account already exists. Registration disabled." });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword
        });
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token, email: user.email });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// 2. LOGIN (Unchanged)
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

// 3. CHANGE PASSWORD (Logged In - Unchanged)
const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const user = await User.findById(userId); // Matches import name 'User'
        
        if (!user) return res.json({ success: false, message: "User not found" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.json({ success: false, message: "Incorrect old password" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// 4. ✅ FORGOT PASSWORD (Reset using Master Key)
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, secretKey } = req.body;

        // Verify Master Key from .env
        if (secretKey !== process.env.ADMIN_SECRET_KEY) {
            return res.json({ success: false, message: "Invalid Secret Key" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User email not found" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ success: true, message: "Password has been reset successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = { register, login, changePassword, resetPassword };