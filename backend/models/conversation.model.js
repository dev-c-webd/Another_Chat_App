import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        conversation: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
                default: []
            }
        ]
    },
    { timestamps: true }
);

const Consversation = mongoose.model("Conversation", conversationSchema);

export default Consversation;