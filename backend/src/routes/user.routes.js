import express from 'express';
import {authMiddleware} from "../middlewares/authMiddleware.js"
import {registerUser,loginUser,logoutUser} from '../controllers/user.controller.js'


const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(authMiddleware,logoutUser);

export default router;
