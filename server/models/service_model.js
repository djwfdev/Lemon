//service_model.js
import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    serviceID: {
        type: Number,  //7 digits, begins with '5'
        required: true,
    },
    motoristID: {
        type: Number,
        required: true,
    },
    assistProfID: {
        type: Number,
        default: null,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    vehicleForServicing: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        default: "Unknown",
    },
    serviceTypePrice: {
        type: Number,
        default: null,
    },
    callOutFee: {
        type: Number,
        default: 25,
    },
});

const service = mongoose.model('service', serviceSchema);

export default service;
