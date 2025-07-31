import express from 'express';
import {todayRevisionSchedule,markRevisiondone} from "../controllers/revision.controller.js"


const router=express.Router();

router.route('/:problemNo/revisiondone').post(markRevisiondone);
router.route('/revision-schedule').get(todayRevisionSchedule);


export default router;