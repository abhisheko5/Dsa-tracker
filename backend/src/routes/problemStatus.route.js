import express from 'express';
import {markproblemStatus,getProblemstats,getproblemProgress,addOneliner} from "../controllers/problemStatus.controller.js"

const router=express.Router();

router.route('/solved/:problemNo').post(markproblemStatus);
router.route('/stats').get(getProblemstats);
router.route('/progress').get(getproblemProgress);
router.route('/:problemNo/addnote').post(addOneliner);


export default router;