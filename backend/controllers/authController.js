import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import generateTokenAndSendCookie from "../utils/generateToken.js";

export const signupUser = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords don't match" });
            return;
        }

        const userExists = await User.findOne({ username });
        if (userExists) {
            res.status(400).json({ error: "Username already exists" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const user = await User.create({
            fullname,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        
        generateTokenAndSendCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });
    
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const checkPassword = await bcrypt.compare(password, user?.password || "");

        if (!user || !checkPassword) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        generateTokenAndSendCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(201).json({ message: "Logged out Successfully!" });
    } catch (error) {
        console.log("Error in logout controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}