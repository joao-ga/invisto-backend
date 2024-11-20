import { Router } from "express";
import StockController from "../controllers/StockController";
const router = Router()

router.post('/getLastPrice', StockController.getLastPrice)

export default router;