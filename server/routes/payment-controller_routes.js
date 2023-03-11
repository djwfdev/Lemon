import express from 'express';
import { createPayController } from '../controllers/payment-controller_controllers.js';

const router = express.Router();

router.post('/new-payment-controller', createPayController);

export default router;