import { Router } from "express";
import UserController from "../controllers/UserController";
const router = Router()

// rota de registro de usuário
router.post('/registration', UserController.registration)

export default router;