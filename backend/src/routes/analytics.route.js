import express from 'express';
const router= express.Router();
import {authMiddleware} from "../middlewares/authMiddleware.js"


import {getoverallStats,getstatsbydifficulty,getstatsbyTopic} from '../controllers/analytics.controller.js'

router.route('/getstats').get(authMiddleware,getoverallStats);
router.route('/getstatsbydiff').get(authMiddleware,getstatsbydifficulty);
router.route('/getstatsbytopic').get(authMiddleware,getstatsbyTopic);

export default router;