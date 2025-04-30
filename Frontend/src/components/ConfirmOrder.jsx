import React, { useState } from "react";
import { useCart, useDispatchCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Loader } from "../utils/Loader";

export const ConfirmOrder = () => {
  const { user, isAuthenticated } = useAuthStore();
  const cartItems = useCart();
  const dispatch = useDispatchCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setIsSubmitting(true);

    try {
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const formattedItems = cartItems.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: item.image,
      }));

      const orderData = {
        userId: user.id,
        items: formattedItems,
        total: totalPrice,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        dispatch({ type: "CLEAR" });
        navigate("/order-confirmation", {
          state: { order: result.order, message: result.message },
        });
      } else {
        throw new Error(result.message || "Failed to confirm order");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("Failed to confirm order. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isAuthenticated ? (
        <button
          onClick={handleClick}
          disabled={isSubmitting || !cartItems || cartItems.length === 0}
          className={`px-6 py-2 rounded-md text-white font-medium hover:scale-105 transition-all bg-gradient-to-r from-emerald-600 to-emerald-500 text-white"
           `}
        >
          {isSubmitting ? (
            <div className="">
              <Loader />
              <span className="ml-2">Processing...</span>
            </div>
          ) : (
            "Checkout"
          )}
        </button>
      ) : (
        <div className="max-w-4xl mx-auto px-7 py-2 mb-4 rounded-xl bg-white shadow-md shadow-gray-300">
          <h1 className="text-3xl tracking-tight font-bold mb-1">Note</h1>
          <p className="text-gray-600 text-sm mb-6">
            To place your order now, log in to your existing account or sign up.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2">
            <Link to="/auth/signin">
              <div className=" bg-black text-white font-medium py-1 px-4 rounded text-center hover:scale-95 transition-all ">
                <p className="text-xs">Have an account?</p>
                <span className="text-md font-bold">LOG IN</span>
              </div>
            </Link>

            <Link to="/auth/signup">
              <div className="border-2 border-emerald-500 text-emerald-500 font-medium py-1 px-4 rounded text-center hover:bg-emerald-50 transition-colors">
                <p className="text-xs">New to DigitalDiner?</p>
                <span className="text-md font-bold">SIGN UP</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
