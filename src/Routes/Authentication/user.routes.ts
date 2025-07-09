import { Router } from 'express';
import {signup, login} from '../../controllers/Authentication/user.controller';

const router = Router();

// POST /api/users/signup
router.post('/signup',signup);
router.post('/login', login);

export default router;
