import { Router } from "express";
import { createOrder, getAllOrders, getOrdersByUser } from "../controllers/orderController.js";

const router = Router();

// API endpoint to create a new order
router.post("/", createOrder);

// API endpoint to get all orders
router.post("/get", getOrdersByUser);

// API endpoint to get all orders (admin only)
router.get("/getAll", getAllOrders);


export default router;