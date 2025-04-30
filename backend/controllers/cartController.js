import { MenuItem } from "../models/menuModel.js";

export const addToCart = async(req, res) => {    
    try{
        const {userId,menuItemId,quantity} = req.body;

        if(!userId || !menuItemId || !quantity){
            return res.status(400).json({message: "Please provide all the fields"});
        }

        const user = await prisma.User.findUnique({where: {id: userId}});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const menuItem = await MenuItem.findById(menuItemId);
        if(!menuItem){
            return res.status(404).json({message: "Menu item not found"});
        }
        const existingCart = await prisma.Cart.findFirst({
            where: {
                userId: userId,
                menuItemId: menuItemId
            }
        });
        if (existingCart) {
            // If item exists, update quantity
            const updatedCartItem = await prisma.cart.update({
              where: { id: existingCartItem.id },
              data: {
                quantity: existingCartItem.quantity + quantity,
                updatedAt: new Date(),
              },
            });
            return res.status(200).json({ message: 'Item quantity updated in cart', cartItem: updatedCartItem });
          } else {
            // If item doesn't exist, create a new cart item
            const newCartItem = await prisma.cart.create({
              data: {
                userId: userId,
                menuItemId: menuItemId,
                quantity: quantity,
              },
            });
            return res.status(200).json({ message: 'Item added to cart', cartItem: newCartItem });
          }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error adding item to cart"});
    }
}