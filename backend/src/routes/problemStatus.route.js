import express from 'express';
import {getperdayproblemsolved,markproblemStatus,getProblemstats,getproblemProgress,addOneliner,getLastSolvedProblems} from "../controllers/problemStatus.controller.js"

const router=express.Router();

router.route('/solved/:problemNo').post(markproblemStatus);
router.route('/stats').get(getProblemstats);
router.route('/progress').get(getproblemProgress);
router.route('/:problemNo/addnote').post(addOneliner);
router.route('/recentproblems').get(getLastSolvedProblems);
router.route('/solvedproblems').get(getperdayproblemsolved);


export default router;