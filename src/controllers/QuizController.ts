import { Request, Response } from "express";
import Quiz from "../models/Quiz";

class QuizController {

    static async createQuiz(req: Request, res: Response): Promise<void> {
        const quiz_data = req.body;

        try {

            const quiz = new Quiz({
                ...quiz_data
            })

            await quiz.save()
            res.status(201).json(quiz)
            
        } catch (e) {
            console.log(e)
        }
    }

    static async getQuiz(req: Request, res: Response): Promise<void> {
        const subject = req.body.subject;

        try {
            const quiz = await Quiz.findOne({subject: subject});

            if(!quiz) {
            res.status(400).send({ error: 'Quiz não disponível!' });
            return 
            }

            res.status(200).send({quiz: quiz});
            
        } catch(e) {
            console.log(e)
        }
    
    }
}

export default QuizController;