import express from 'express';
import Problem from "../models/problem.model.js";
import {addProblem,updateProblem,deleteProblem,getallProblems,getsingleProblem,
  getproblemProgress
} from "../controllers/problem.controller.js"
import {markproblemStatus} from "../controllers/problemStatus.controller.js"

const router=express.Router();

router.route('/add').post(addProblem);
router.route('/update/:problemNo').put(updateProblem);
router.route('/delete/:problemNo').delete(deleteProblem);
router.route('/all-problems').get(getallProblems);
router.route('/single-problem').get(getsingleProblem);
router.route('/solved/:problemNo').post(markproblemStatus);
router.route('/progress').get(getproblemProgress);


export default  router;