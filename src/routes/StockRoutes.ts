import { Router } from "express";
import StockController from "../controllers/StockController";
const router = Router()

router.get('/getLastPrice', StockController.getLastPrice)

export default router;