import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim:true
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Password should be 8 characters in length"],
        },
        username: {
            type: String,
            required: true,
            unique:true
        },
        gender: {
            type: String,
            required: true,
            enum:["male", 'female']
        },
        profilePic: {
            type: String,
            default:""
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;