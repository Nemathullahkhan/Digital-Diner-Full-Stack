import React, { useEffect } from "react";
import { useCart, useDispatchCart } from "../context/CartContext";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { ConfirmOrder } from "../components/ConfirmOrder";
import { Link } from "react-router-dom";

const Checkout = () => {
  const cartItems = useCart();
  const dispatch = useDispatchCart();

  // Log cart items for debugging
  useEffect(() => {
    console.log("Checkout cartItems:", cartItems);
  }, [cartItems]);

  // Handle quantity increment
  const incrementQuantity = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch({
      type: "UPDATE",
      id: item.id,
      quantity: newQuantity,
      price: item.price,
    });
    console.log("Updated cart in Checkout:", {
      id: item.id,
      name: item.name,
      quantity: newQuantity,
    });
  };

  // Handle quantity decrement
  const decrementQuantity = (item, index) => {
    if (item.quantity > 0) {
      const newQuantity = item.quantity - 1;
      if (newQuantity === 0) {
        dispatch({
          type: "REMOVE",
          index,
        });
        console.log("Removed from cart in Checkout:", {
          id: item.id,
          name: item.name,
        });
      } else {
        dispatch({
          type: "UPDATE",
          id: item.id,
          quantity: newQuantity,
          price: item.price,
        });
        console.log("Updated cart in Checkout:", {
          id: item.id,
          name: item.name,
          quantity: newQuantity,
        });
      }
    }
  };

  // Handle item removal
  const removeItem = (index) => {
    dispatch({
      type: "REMOVE",
      index,
    });
    console.log("Removed from cart in Checkout:", { index });
  };

  // Calculate total price (price * quantity for each item)
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle empty cart
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center mt-12 bg-gray-100 p-4">
        <div className="text-center max-w-md bg-white rounded-lg shadow-md p-8 tracking-tight">
          <div className="flex justify-center">
            <ShoppingCart className="w-16 h-16 text-emerald-900" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mt-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 text-md ">
            Add some items to your cart and come back!
          </p>
          <Link to="/home">
            <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-semibold">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 min-h-screen bg-gray-100">
      <div className="flex justify-center">
        <div className="max-w-7xl w-full flex items-center gap-x-2">
          <ShoppingCart className="w-8 h-8 text-emerald-900" />
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Your Cart
          </h1>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 font-semibold">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S No
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 flex items-center gap-4 whitespace-nowrap text-md tracking-tight text-gray-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center bg-white border border-gray-300 rounded-md w-32">
                      <button
                        onClick={() => decrementQuantity(item, index)}
                        className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1.5 text-md font-medium text-green-600">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementQuantity(item)}
                        className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-600"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-right max-w-4xl mx-auto mt-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Total: ₹{totalPrice.toFixed(2)}
          </h2>
        </div>
        <div className="">
        <ConfirmOrder />
      </div>
      </div>
    </div>
  );
};

export default Checkout;
