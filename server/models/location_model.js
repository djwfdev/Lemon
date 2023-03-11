//location_model.js
import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
    streetName: {
        type: String,
        required: true,
    },
    streetNum: { //[0..1]
        type: Number,
        default: 1
    },
    suburb: {
        type: String,
        required: true,
    },
    nearestCrossroad: {
        type: String,
        required: true, 
    },
    userID: {
        type: Number, //(motorist/assistProf)
        required: true,
    },
});

const location = mongoose.model('location', locationSchema);

export default location;
