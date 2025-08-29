import express from 'express';
import {getDSAResponse,generaterandomProblems} from '../controllers/ai.controller.js'

const router=express.Router();

router.route('/random').post(generaterandomProblems)

export default router;