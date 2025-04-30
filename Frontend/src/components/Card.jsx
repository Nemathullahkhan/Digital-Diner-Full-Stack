"use client";

import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { useCart, useDispatchCart } from "../context/CartContext";

const MenuItemCard = ({
  _id,
  name,
  description,
  price,
  image,
  ingredients,
  isVeg,
  isGlutenFree,
}) => {
  const dispatch = useDispatchCart();
  const cartItems = useCart();

  // Initialize quantity and cart status
  const cartItem = cartItems.find((item) => item.id === _id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);
  const [isInCart, setIsInCart] = useState(!!cartItem);

  // Sync quantity and isInCart with cartItems
  useEffect(() => {
    const existingItem = cartItems.find((item) => item.id === _id);
    if (existingItem) {
      setQuantity(existingItem.quantity);
      setIsInCart(true);
    } else {
      setQuantity(0);
      setIsInCart(false);
    }
  }, [cartItems, _id]);

  const addToCart = () => {
    if (quantity === 0) {
      const newQuantity = 1;
      dispatch({
        type: "ADD",
        id: _id,
        name,
        price,
        quantity: newQuantity,
        image,
      });
      setQuantity(newQuantity);
      setIsInCart(true);
      console.log("Added to cart:", {
        id: _id,
        name,
        price,
        quantity: newQuantity,
        image,
      });
    }
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (isInCart) {
      dispatch({
        type: "UPDATE",
        id: _id,
        quantity: newQuantity,
        price,
      });
      console.log("Updated cart:", {
        id: _id,
        name,
        price,
        quantity: newQuantity,
      });
    } else {
      dispatch({
        type: "ADD",
        id: _id,
        name,
        price,
        quantity: newQuantity,
        image,
      });
      setIsInCart(true);
      console.log("Added to cart:", {
        id: _id,
        name,
        price,
        quantity: newQuantity,
        image,
      });
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (newQuantity === 0) {
        const index = cartItems.findIndex((item) => item.id === _id);
        dispatch({
          type: "REMOVE",
          index,
        });
        setIsInCart(false);
        console.log("Removed from cart:", { id: _id, name });
      } else {
        dispatch({
          type: "UPDATE",
          id: _id,
          quantity: newQuantity,
          price,
        });
        console.log("Updated cart:", {
          id: _id,
          name,
          price,
          quantity: newQuantity,
        });
      }
    }
  };

  const VegIcon = () => (
    <svg width="22" height="25" viewBox="0 0 100 100" >
      <rect x="5" y="5" width="90" height="90" stroke="#00A651" fill="none" strokeWidth="5" />
      <circle cx="50" cy="50" r="30" fill="#00A651" />
    </svg>
  );

  const NonVegIcon = () => (
    <svg width="22" height="25" viewBox="0 0 100 100" >
      <rect x="5" y="5" width="90" height="90" stroke="#944A28" fill="none" strokeWidth="5" />
      <circle cx="50" cy="50" r="30" fill="#944A28" />
    </svg>
  );
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full border border-gray-100 text-zinc-900">
      <div className="p-2">
        <div className="grid grid-cols-[60%_40%] gap-12">
          <div className="flex flex-col justify-start pl-4">
            <div className="flex items-center gap-1">
              {isVeg ? (
                <span className="py-0.5">
                  <VegIcon/>
                </span>
              ):(
                <span className="py-0.5">
                  <NonVegIcon/>
                </span>
              )}
              {isGlutenFree && (
                <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
                  Gluten-Free
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold tracking-tight">{name}</h1>
            <h2 className="text-xl font-semibold  text-green-500 tracking-tighter">
              ₹{price.toFixed(2)}
            </h2>
            <div className="">
              <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
              {ingredients && ingredients.length > 0 && (
                <div className="mb-2 mt-2">
                  <h4 className="text-xs font-semibold text-gray-700 mb-1">Ingredients:</h4>
                  <div className="flex flex-wrap gap-1">
                    {ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-full hover:bg-gray-300"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="w-40 h-36">
              <img
                src={image || "/api/placeholder/150/150"}
                alt={name}
                className="object-cover w-full h-full  rounded-2xl"
              />
            </div>
            {isInCart ? (
              <div className="-mt-6 flex mx-4  w-32 bg-white text-black border-gray-300 border-2 rounded-xl">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1.5 font-bold text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>

                <span className="flex-1 text-center px-2  text-xl font-semibold tracking-tight  text-gray-900">
                  {quantity}
                </span>

                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <div className="-mt-6 flex mx-4 ">
                <button
                  onClick={addToCart}
                  className="px-2 py-1 bg-black  text-white text-md font-bold rounded-md hover:bg-white hover:text-black hover:border-2 hover:border-gray-300 transition-colors flex justify-center items-center  w-32"
                >
                  ADD
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
