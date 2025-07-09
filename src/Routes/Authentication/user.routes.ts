import { Router } from 'express';
import {signup} from '../../controllers/Authentication/user.controller';

const router = Router();

// POST /api/users/signup
router.post('/signup',signup);

export default router;
