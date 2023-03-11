//customer_model.js
import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    customerID: { 
        type: Number,  //7 digits, begins with '1'
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
});

const customer = mongoose.model('customer', customerSchema);

export default customer;