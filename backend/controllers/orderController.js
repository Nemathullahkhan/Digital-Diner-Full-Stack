import prisma from "../prisma/client.js";

import { MenuItem } from '../models/menuModel.js'; 

export const createOrder = async (req, res) => {
  try {
    const { userId, items, total } = req.body;
    if (!userId || !items || total == null) {
      return res.status(400).json({ message: 'Please provide all the fields' });
    }

    // Validate user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate items and menuItemId
    for (const item of items) {
      if (!item.menuItemId || !item.name || !item.price || !item.quantity) {
        return res.status(400).json({
          message: 'Each item must have menuItemId, name, price, and quantity',
        });
      }
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) {
        return res.status(404).json({
          message: `Menu item with ID ${item.menuItemId} not found`,
        });
      }
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId,
        items: items, // Store items as JSON (array of { menuItemId, quantity, name, price, image })
        total,
      },
    });

    return res.status(200).json({
      message: 'Ordered Confirmed',
      order,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating order' });
  } finally {
    await prisma.$disconnect();
  }
};
export const getOrdersByUser = async (req,res)=>{
    try{
        const {userId} = req.body;
        if(!userId){
            return res.status(400).json({message: "Please provide all the fields"});
        }
        const user = await prisma.User.findUnique({where: {id: userId}});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const orders = await prisma.Order.findMany({
            where:{
                userId: userId
            },
            orderBy:{
                createdAt: "desc"
            }
        });
        return res.status(200).json({message: "Orders fetched successfully", orders});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Error fetching orders"});
    }
}
export const getAllOrders = async(req,res)=>{
    try{
        const orders = await prisma.Order.findMany();
        return res.status(200).json({message: "Orders fetched successfully", orders});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Error fetching orders"});
    }
}