import express from 'express';
import Problem from "../models/problem.model.js";
import {addProblem,updateProblem,deleteProblem,getallProblems,getsingleProblem
} from "../controllers/problem.controller.js"
import {getDSAResponse} from '../controllers/ai.controller.js'

const router=express.Router();

router.route('/add').post(addProblem);
router.route('/update/:problemNo').put(updateProblem);
router.route('/delete/:problemNo').delete(deleteProblem);
router.route('/all-problems').get(getallProblems);
router.route('/single-problem').get(getsingleProblem);
router.route('/hint').post(getDSAResponse);

export default  router;