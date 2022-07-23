import mongoose from "mongoose";
const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

const locationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    location: {
        type: pointSchema,
        required: true,
        index: '2dsphere'
    },
}, { timestamps: true });

export default mongoose.model("UserLocation", locationSchema);