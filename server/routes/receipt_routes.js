import express from 'express';
import { getReceipts, createReceipt, getReceiptsSM, createReceiptID } from '../controllers/receipt_controllers.js';

const router = express.Router();

router.get('/receipts', getReceipts);
router.get('/receipts/:id', getReceiptsSM);

router.post('/generate-receiptID', createReceiptID);
router.post('/motorist-receipt', createReceipt);

export default router;