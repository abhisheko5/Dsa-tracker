import express from 'express';
import {getDSAResponse,generaterandomProblems,generateQuote} from '../controllers/ai.controller.js'

const router=express.Router();

router.route('/random').post(generaterandomProblems)
router.route('/Quote').post(generateQuote)
router.route('/response').post(getDSAResponse)

export default router;