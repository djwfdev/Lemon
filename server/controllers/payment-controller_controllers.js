import PaymentControllerData from '../models/payment-controller_model.js';

// When called, it creates a new payment controller which is then stored in the database
export const createPayController = async (req, res)=> {
    const { motoristID, assistProfID, paymentType, amountDue, paidToAP, commissionFee } = req.body;

    const newPayController = new PaymentControllerData({
        motoristID,
        assistProfID,
        paymentType,
        amountDue,
        paidToAP,
        commissionFee
    });

    try {
        await newPayController.save();
        res.status(201).json(newPayController);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}