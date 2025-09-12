import express from 'express';
import {todayRevisionSchedule,markRevisiondone} from "../controllers/revision.controller.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"


const router=express.Router();

router.route('/:problemNo/revisiondone').post(authMiddleware,markRevisiondone);
router.route('/revision-schedule').get(authMiddleware,todayRevisionSchedule);


export default router;