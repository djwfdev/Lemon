//motorist_model.js
import mongoose from "mongoose";

const motoristSchema = mongoose.Schema({
    motoristID: {
        type: Number, // reference to customerID or memberID
        required: true,
    },
    isMember: {
        type: Boolean,
        default: false,
    },
    vehicles: [{
        plateNumber: String,
        }],
    receipts: [{
        receiptID: Number,
    }],
});

const motorist = mongoose.model('motorist', motoristSchema);

export default motorist;
