import { Router } from "express";
import LessonController from "../controllers/LessonController";
const router = Router();

router.post('/lesson', LessonController.getLesson);
router.post('/createLesson', LessonController.registerLesson);
router.get('/lessons', LessonController.getAllLesson);

export default router;