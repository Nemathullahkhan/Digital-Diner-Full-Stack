import { ShoppingCart, User, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const cartItems = useCart();
  
  // Get cart item count for display
  const cartItemCount = cartItems ? cartItems.length : 0;
  
  // Debug user information
  console.log("Auth state:", { user, isAuthenticated });

  return (
    <nav
      className={`relative top-0 w-full backdrop:blur-sm text-green-800 z-50 transition-all duration-300 py-2`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-md tracking-tight text-emerald-800">
        <div className="flex justify-between items-center">
          <Link to="/home">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-7 h-7 text-green-500" />
              <span className="text-2xl font-sans font-bold tracking-tighter">
                DigitalDiner
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/home"
              className="text-md font-medium hover:text-emerald-950 transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/checkout"
              className="text-md font-medium hover:text-emerald-950 transition-colors relative flex gap-x-1"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link
              to="/MyOrders"
              className="text-md font-medium hover:text-emerald-950 transition-colors"
            >
              My Orders
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex gap-x-1">
                  <User className="w-5 h-5" />
                <span className="text-md font-medium"> {user?.name || 'User'}</span>
                </div>
                <button 
                  onClick={logout}
            className="text-md font-medium hover:text-emerald-950 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth/signup"
                className="text-md font-medium hover:text-emerald-950 transition-colors"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
