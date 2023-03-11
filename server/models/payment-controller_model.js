//payment-controller_model.js
import mongoose from "mongoose";

const paymentControllerSchema = mongoose.Schema({
    motoristID: {
        type: Number, // reference to customerID or memberID
        required: true,
    },
    assistProfID: {
        type: Number, //7 digits, begins with '3'
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    amountDue: {
        type: Number,
        required: true,
    },
    paidToAP: {
        type: Number,
        required: true,
    },
    commissionFee: {
        type: Number,
        required: true,
    },
});

const paymentController = mongoose.model('payment-controller', paymentControllerSchema);

export default paymentController;