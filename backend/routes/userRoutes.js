import { Router } from "express";
import { checkAuth, createUser, loginByEmail, loginByPhone, logout } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.post("/",createUser);

router.post("/signinByPhone", loginByPhone);

router.post("/signinEmail", loginByEmail);

router.post("/signout", logout);

router.get("/check-auth",verifyToken,checkAuth);


export default router;