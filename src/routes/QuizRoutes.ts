import { Router } from "express";
import QuizController from "../controllers/QuizController";
const router = Router()

router.post('/quiz', QuizController.getQuiz);
router.post('/createQuiz', QuizController.createQuiz);

export default router;