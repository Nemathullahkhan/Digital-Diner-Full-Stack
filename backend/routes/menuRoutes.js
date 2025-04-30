import { Router } from "express";
import { createMenuItem, FilteredMenuItems, getMenuItemById, getMenuItems } from "../controllers/menuItem.js";

const router = Router();

// Get all menu items 
router.get("/", getMenuItems);

//  Get a single menu item by ID
router.get("/:id",getMenuItemById);

// Create a new menu item
router.post("/", createMenuItem);


router.get("/search", FilteredMenuItems);


export default router;