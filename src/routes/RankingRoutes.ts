import { Router } from "express";
import RankingController from "../controllers/RankingController";

const router = Router()

router.post('/createranking', RankingController.createRanking);
router.post('/enterranking', RankingController.enterRanking);
router.post('/getranking', RankingController.getRanking);

export default router;