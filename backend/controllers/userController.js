import User from "../models/auth.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(users);

    } catch (error) {
        console.log("Error in getUserForSidebar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}