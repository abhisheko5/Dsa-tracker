import express from 'express';
import {getperdayproblemsolved,markproblemStatus,getProblemstats,getproblemProgress,addOneliner,getLastSolvedProblems} from "../controllers/problemStatus.controller.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"

const router=express.Router();

router.route('/solved/:problemNo').post(authMiddleware,markproblemStatus);
router.route('/stats').get(authMiddleware,getProblemstats);
router.route('/progress').get(authMiddleware,getproblemProgress);
router.route('/:problemNo/addnote').post(authMiddleware,addOneliner);
router.route('/recentproblems').get(authMiddleware,getLastSolvedProblems);
router.route('/solvedproblems').get(authMiddleware,getperdayproblemsolved);


export default router;