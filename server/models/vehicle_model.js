//vehicle_model.js
import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema({
    plateNumber: {
        type: String,
        required: true,
        unique: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    body_type: {
        type: String,
        required: true,
    },
    colour: {
        type: String,
        required: true,
    },
});

const vehicle = mongoose.model('vehicle', vehicleSchema);

export default vehicle;