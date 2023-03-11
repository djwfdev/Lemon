import ReceiptData from '../models/receipt_model.js';
import AssistanceProfessionalData from '../models/assistance-professional_model.js';
import ServiceData from '../models/service_model.js';
import SubscribedMemberData from '../models/subscribed-member_model.js';

var receipt_length = 0;

// Gets all receipts from the database using port 5000 
export const getReceipts = async (req, res)=> {
    try {
        const allReceipts = await ReceiptData.find();
        res.status(200).json(allReceipts);
    } catch(error){
        res.status(404).json({ message: error.message });
    }
}

// When called, it creates a receiptID and returns that value
export const createReceiptID = async (req, res) => {
    var newReceiptID = req.body;
    ReceiptData.find(req.body.receiptID, function (err, doc){
        receipt_length = doc.length;
        newReceiptID = 4000000 + receipt_length + 1;
        res.json({ result: "success", newReceiptID, message: "NewReceiptID created successfully" });
    });
}

// Gets the receipts from the database using a subscribed member's ID value
export const getReceiptsSM = async (req, res)=> {
    try {
        const allReceipts = await ReceiptData.find(req.params.id);
        res.json({ result: "success", allReceipts, message: "Receipts retrieved successfully"});
    } catch(error){
        res.json({ result: "error", message: error.message });
    }
}

// Creates a new receipt and adds it to the database
export const createReceipt = async (req, res) => {
    const { receiptID, motoristID, assistProfID, assistProfRating, amountPaid, paymentDate, servicePurchased } = req.body;
    const newReceipt = new ReceiptData({
        receiptID,
        motoristID,
        assistProfID,
        assistProfRating,
        amountPaid,
        paymentDate,
        servicePurchased    
    });
    
    try {
        await newReceipt.save();
        //Updates the average rating
        updateAverageRatingOfAP(newReceipt);
        //Deletes The service
        findAndDeleteService(newReceipt);

        // update the member's receipts
        var receiptSingle = { 
            receiptID: newReceipt.receiptID, 
            amountPaid: newReceipt.amountPaid, 
            paymentDate: newReceipt.paymentDate, 
            servicePurchased: newReceipt.servicePurchased 
        };
        
        SubscribedMemberData.findOneAndUpdate({memberID: newReceipt.motoristID}, {$push: 
        { 
            receipts: receiptSingle, 
        }}, 
        { new: true }, 
        function (err, doc){
            if (err) {
                res.json({ result: "error", message: err.message });
            } else {
                res.json({ result: "success", doc, message: "Receipt successfully submitted" });
            }
        });
    } catch(error){
        res.status(409).json({ message: error.message });
    }
}

async function updateMemberReceipts(receipt) {
    
    var receiptSingle = { 
        receiptID: receipt.receiptID, 
        amountPaid: receipt.amountPaid, 
        paymentDate: receipt.paymentDate, 
        servicePurchased: receipt.servicePurchased 
    };
    
    SubscribedMemberData.findOneAndUpdate({memberID: receipt.motoristID}, {$push: 
    { 
        receipts: receiptSingle, 
    }}, 
    { new: true }, 
    function (err, subMember){
        if (err) {
            res.json({ result: "error", message: err.message });
        } else {
            return subMember; 
        }
    });
}

//Update assistant professional average rating
async function updateAverageRatingOfAP (receipt){
    try {
        //Get all ratings
        const averageRating = ReceiptData.find({assistProfID : receipt.assistProfID}, 'assistProfRating').lean().exec((err, ratings) => {
            if(err){
            } else {
                //Calculate the new average rating
                var averageRating = 0;
                var numberOfRatings = 1;
                //Add each rating
                for (var i = 0; i < ratings.length; i++){
                    averageRating = averageRating + ratings[i].assistProfRating;
                    numberOfRatings = numberOfRatings + 1;
                }
                var averageRating = Math.round((averageRating/numberOfRatings) * 10) / 10;
                updateAP(receipt,averageRating);
            }
        });
    } catch(error){
        console.error(error);
    }
}

// Updates the assistance professional with an updated average rating
async function updateAP(receipt,newRating){
    try {
        //Update the AP
        const newAP = await AssistanceProfessionalData.findOneAndUpdate({assistProfID:receipt.assistProfID},{avgRating:newRating},{new:true});
        await newAP.save();
    } catch(error){
        console.log(error);
    }
}

// Deletes the service once the receipt is created
export const findAndDeleteService = async (receipt)=> {
    try {
        //Find the service and delete it based of AP ID
        await ServiceData.find({ assistProfID: receipt.assistProfID}).remove().exec();
    } catch(error){
        console.log(error);
    }
}

