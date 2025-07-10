import { Router } from 'express';
import {signup, login} from '../../controllers/Authentication/user.controller';
import {authenticate} from '../../middlewares/Authentication/auth.middleware';


const router = Router();

// POST /api/users/signup
router.post('/signup',signup);
router.post('/login', login);
router.get('/me', authenticate, (req,res)=>{
    return res.status(200).json({
        success: true,
        message: "Authentication Successfull",
        userId: (req as any).userId
    })

})

export default router;
