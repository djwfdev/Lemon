//assistance-professional_model.js
import mongoose from "mongoose";

const assistProfSchema = mongoose.Schema({
    assistProfID: { 
        type: Number, //7 digits, begins with '3'
        unique: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    avgRating: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    availableJobs: {
        type: [{
            jobID: Number, // serviceID
            serviceType: String, // service type 
            plateNumber: String, 
            distanceFromAP: Number, //distance away that the AP is from the available job
        }],
    },
});

const assistProf = mongoose.model('assistance-professional', assistProfSchema);

export default assistProf;
