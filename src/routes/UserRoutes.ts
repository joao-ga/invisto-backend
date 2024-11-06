import { Router } from "express";
import UserController from "../controllers/UserController";
const router = Router()

// rota de registro de usuário
router.post('/registration', UserController.registration);
router.post('/addcoins', UserController.addCoin);
router.post('/adduid', UserController.addUidUser);
router.post('/validateUser', UserController.validateUser);
router.post('/getusercoins', UserController.getUserData);

export default router;