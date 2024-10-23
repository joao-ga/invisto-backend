import { Request, Response } from "express";
import Lesson from "../models/Lesson";
import { error } from "console";

class LessonController {
    static async registerLesson(req: Request, res: Response): Promise<void> {
        const lesson_data = req.body;

        try {
            const lesson = new Lesson({
                ...lesson_data
            });

            await lesson.save()
            res.status(201).json({aula: lesson });

        } catch (e) {
            console.log(e)
        }
    }

    static async getLesson(req: Request, res: Response): Promise<void> {
        const subject = req.body.subject;

        try {
            const lesson = await Lesson.findOne({subject: subject});

            if(!lesson) {
                res.status(400).send({error: 'Aula não disponível'});
                return;
            }

            res.status(200).send({lesson: lesson});

        } catch(e) {
            console.log(e)
        }
    }
}

export default LessonController;