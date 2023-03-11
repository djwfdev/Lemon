import express from 'express';
const router = express.Router();
import { getAPsBySearch } from '../controllers/assistance-professional_controllers.js';

router.post('/ap-search', getAPsBySearch);

export default router;