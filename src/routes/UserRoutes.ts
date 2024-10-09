import { Router } from "express";
import UserController from "../controllers/UserController";
const router = Router()

router.post('/registration', UserController.registration)

export default router;