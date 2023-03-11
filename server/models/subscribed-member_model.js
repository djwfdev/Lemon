//subscribed-member_model.js
import mongoose from "mongoose";
const dateNow = new Date(Date.now());

const subMemberSchema = mongoose.Schema({
    memberID:{
        type: Number,
        required: true,
        unique: true,
    },
    expirationDate:{
        type: Date,
        default: dateNow.setFullYear(dateNow.getFullYear() + 1),
    },
    annualFeeAmount: {
        type: Number,
        required: true,
        default: 49.99,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true,
    },
    gender:{
        type: String,
        required: true,
    },
    dob:{
        type: Date,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    receipts: {
        type: [{
            receiptID: Number, // receiptID
            amountPaid: Number, // amount paid
            paymentDate: String, // service type 
            servicePurchased: String, 
        }],
    },
});

// The following name for the subMember below will become
// all lowercase, and end with an 's' in MongoDB Atlas.
const subMember = mongoose.model('subscribed-member', subMemberSchema);

export default subMember;
