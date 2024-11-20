import { Request, Response } from "express";
const axios = require ('axios');
import Stock from "../models/Stock";

class StockController {
    static async getLastPrice(req: Request, res: Response): Promise<void> {
        const tickers = req.body.code;
        const TIINGO_API_TOKEN = '8bacea9e47b9acc8eeda429a88e2edaba0cf0fad';

        const url = `https://api.tiingo.com/iex/?tickers=${tickers}&token=${TIINGO_API_TOKEN}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            res.json(response.data);
        } catch (error) {
            console.error('Erro ao fazer requisição:', error);
            res.status(500).json({ error: 'Erro ao buscar dados da API.' });
        }
    }
}

export default StockController