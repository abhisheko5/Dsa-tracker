import express from 'express';
import Problem from "../models/problem.model.js";
import {authMiddleware} from "../middlewares/authMiddleware.js"

import {addProblem,updateProblem,deleteProblem,getallProblems,getsingleProblem
} from "../controllers/problem.controller.js"
import {getDSAResponse} from '../controllers/ai.controller.js'

const router=express.Router();

router.route('/add').post(authMiddleware,addProblem);//to add a problem
router.route('/update/:problemNo').put(authMiddleware,updateProblem);//Update a Problem
router.route('/delete/:problemNo').delete(authMiddleware,deleteProblem);//Delete a Problem
router.route('/all-problems').get(authMiddleware,getallProblems);//Get all the problems list
router.route('/single-problem').get(authMiddleware,getsingleProblem);//get a single problem
router.route('/hint').post(authMiddleware,getDSAResponse);//Ai chatbot response

export default  router;