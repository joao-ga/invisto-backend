import express, {Request, Response} from 'express';
import userRouter from './routes/UserRoutes';
import stockRouter from './routes/StockRoutes';
import cors from 'cors';
import mongoose from './database/connDB';
import quizRouter from './routes/QuizRoutes';

const app = express();

const conn = mongoose;

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5001;

app.use('/users', userRouter);
app.use('/stocks', stockRouter);
app.use('/quizzes', quizRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('INVISTO APP');
});

app.listen(PORT, () => {
    console.log(`API Rodando na porta: ${PORT}`);
});