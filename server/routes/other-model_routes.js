import express from 'express';
import { getCustomers, getMotorists, getVehicles, getLocations } from '../controllers/other-model_controllers.js';

const router = express.Router();

router.get('/customers', getCustomers);
router.get('/motorists', getMotorists);
router.get('/vehicles', getVehicles);
router.get('/locations', getLocations);

export default router;