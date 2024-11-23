import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "In Process", "Done"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
})

export const List = mongoose.model("List", listSchema)