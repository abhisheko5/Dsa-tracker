import express from 'express';
import Problem from "../models/problem.model.js";
import {authMiddleware} from "../middlewares/authMiddleware.js"

import {addProblem,updateProblem,deleteProblem,getallProblems,getsingleProblem
} from "../controllers/problem.controller.js"
import {getDSAResponse} from '../controllers/ai.controller.js'

const router=express.Router();

router.route('/add').post(authMiddleware,addProblem);
router.route('/update/:problemNo').put(authMiddleware,updateProblem);
router.route('/delete/:problemNo').delete(authMiddleware,deleteProblem);
router.route('/all-problems').get(authMiddleware,getallProblems);
router.route('/single-problem').get(authMiddleware,getsingleProblem);
router.route('/hint').post(authMiddleware,getDSAResponse);

export default  router;