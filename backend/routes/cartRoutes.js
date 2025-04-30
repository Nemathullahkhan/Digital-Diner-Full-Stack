import { Router } from "express";
import { addToCart } from "../controllers/cartController.js";

const router = Router();

router.post("/add", addToCart)  

export default router;