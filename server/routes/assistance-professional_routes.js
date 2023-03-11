import express from 'express';
import { getAssistProfs, assistProfSignup, assistProfLogin, assistProfEdit, assignAPToService, denyAPtoService } from '../controllers/assistance-professional_controllers.js';

const router = express.Router();

router.get('/assistance-professionals', getAssistProfs);

router.post('/signup/assistance-professional', assistProfSignup);
router.post('/login/assistance-professional', assistProfLogin);

router.put('/assign/assistance-professional/:id', assignAPToService); 
router.put('/deny/assistance-professional/:id', denyAPtoService); 
router.put('/edit/ap/:id', assistProfEdit); 

export default router; 