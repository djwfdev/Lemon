//receipt_model.js
import mongoose from "mongoose";
const dateNow = new Date(Date.now());

const receiptSchema = mongoose.Schema({
    receiptID: {
        type: Number,  //7 digits, begins with '4'
        required: true,
    },
    motoristID: { 
        type: Number,
        required: true,
    },
    assistProfID: {
        type: Number,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: String,
        default: dateNow.toTimeString(),
    },
    servicePurchased: {
        type: String,
    },
    assistProfRating: {
        type: Number,
        default: 0,
    },
});

const receipt = mongoose.model('receipt', receiptSchema);

export default receipt;
