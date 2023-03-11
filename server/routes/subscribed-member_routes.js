import express from 'express';
import { subMemberSignup, subMemberLogin, getMembersBySearch, subMemberEdit } from '../controllers/subscribed-member_controllers.js';

const router = express.Router();

router.get('/search', getMembersBySearch);

router.post('/signup/member', subMemberSignup);
router.post('/login/member', subMemberLogin);

router.put('/edit/member/:id', subMemberEdit); 

export default router;