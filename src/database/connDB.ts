import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();
const password = process.env.DATABASE_PASSWORD;

const uri = `mongodb+srv://invisto:${password}@cluster0.2a39u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const clientOptions: ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectToMongoDB(): Promise<void> {
    try {
        await mongoose.connect(uri, clientOptions);
        console.log("Conectado com sucesso no: mongo INVISTO-APP!");
    } catch (err) {
        console.error("Connection failed:", err);
        process.exit(1);
    }
}

connectToMongoDB();

export default mongoose;