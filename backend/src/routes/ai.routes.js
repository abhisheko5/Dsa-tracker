import express from 'express';
import {getDSAResponse,generaterandomProblems,generateQuote} from '../controllers/ai.controller.js'
import {authMiddleware} from "../middlewares/authMiddleware.js"

const router=express.Router();

router.route('/random').post(generaterandomProblems)//Get random 5 dsa problems
router.route('/Quote').post(generateQuote)//creates a motivational quote displayed on dashboard
router.route('/response').post(authMiddleware,getDSAResponse)//Ai chatbot response

export default router;