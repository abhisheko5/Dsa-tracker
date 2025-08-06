import express from 'express';
const router= express.Router();

import {getoverallStats,getstatsbydifficulty,getstatsbyTopic} from '../controllers/analytics.controller.js'

router.route('/getstats').get(getoverallStats);
router.route('/getstatsbydiff').get(getstatsbydifficulty);
router.route('/getstatsbytopic').get(getstatsbyTopic);

export default router;