import express from 'express';
import { getServices, deleteService, getUpdatedServices } from '../controllers/service_controllers.js';

const router = express.Router();

router.get('/services', getServices);

router.post('/service/resubmission', getUpdatedServices);

router.delete('/services/:id', deleteService);



export default router;