import express from 'express';
const router= express.Router();
import {authMiddleware} from "../middlewares/authMiddleware.js"


import {getoverallStats,getstatsbydifficulty,getstatsbyTopic} from '../controllers/analytics.controller.js'

router.route('/getstats').get(authMiddleware,getoverallStats);//get overal statistics of the solved and unsolved problems
router.route('/getstatsbydiff').get(authMiddleware,getstatsbydifficulty);//get statistics by difficulty of the problem
router.route('/getstatsbytopic').get(authMiddleware,getstatsbyTopic);//get statistics of problems by topic

export default router;