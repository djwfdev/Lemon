import express from 'express';
import { createCustomerForm, createMemberForm } from '../controllers/motorist-form_controllers.js';

const router = express.Router();

router.post('/service-request/customer', createCustomerForm);
router.post('/service-request/member', createMemberForm);

export default router;