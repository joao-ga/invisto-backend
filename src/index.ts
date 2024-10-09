import express, {Request, Response} from 'express';
import router from './routes/UserRoutes';
import cors from 'cors';
import mongoose from './database/connDB';

const app = express();

const conn = mongoose;

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5001;

const userRouter = router;
app.use('/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('INVISTO APP');
});

app.listen(PORT, () => {
    console.log(`API Rodando na porta: ${PORT}`);
});