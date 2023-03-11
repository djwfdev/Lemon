import express from 'express';
const router = express.Router();
import { getMembersBySearch } from '../controllers/subscribed-member_controllers.js';

router.post("/service-request/member/search", getMembersBySearch);

export default router;
