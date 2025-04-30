import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader, Phone } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const SignInPage = () => {
  const [activeTab, setActiveTab] = useState("phone"); // Track active form
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, signinEmail, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handlePhoneSignIn = async (e) => {
    e.preventDefault();
    try {
      await login(phone);
      navigate("/checkout");
    } catch (err) {
      console.error("Phone sign-in failed:", err);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signinEmail(email, password);
      navigate("/home");
    } catch (err) {
      console.error("Email sign-in failed:", err);
    }
  };

  return (
    <div className="h-[88vh] flex items-center justify-center bg-gradient-to-b from-zinc-100/90 to-zinc-200">
      <div className="bg-zinc-50 rounded-lg shadow-xl px-4 py-2  max-w-md w-full">
        <h2 className="text-3xl font-bold mb-3 text-center text-zinc-800 tracking-tighter">
          Welcome Back
        </h2>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-500">
          <button
            className={`flex-1 py-2 text-center text-sm font-medium ${
              activeTab === "phone"
                ? "border-b-2 border-zinc-800 text-zinc-800"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
            onClick={() => setActiveTab("phone")}
          >
            Sign in with Phone
          </button>
          <button
            className={`flex-1 py-2 text-center text-sm font-medium ${
              activeTab === "email"
                ? "border-b-2 border-zinc-800 text-zinc-800"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
            onClick={() => setActiveTab("email")}
          >
            Sign in with Email
          </button>
        </div>

        {/* Phone Sign-In Form */}
        {activeTab === "phone" && (
          <form onSubmit={handlePhoneSignIn}>
            <div className="mb-4 relative">
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5"
              />
              <input
                type="text"
                placeholder="Phone (e.g., 147871)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-200 text-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                disabled={isLoading}
              />
            </div>

            {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

            <button
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-bold rounded-lg shadow-lg hover:from-zinc-800 hover:to-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        )}

        {/* Email Sign-In Form */}
        {activeTab === "email" && (
          <form onSubmit={handleEmailSignIn}>
            <div className="mb-4 relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-200 text-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                disabled={isLoading}
              />
            </div>

            <div className="mb-4 relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-200 text-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-end mb-6">
              <p
                className="text-sm text-zinc-600 hover:text-zinc-800 hover:underline"
              >
                Forgot password?
              </p>
            </div>

            {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

            <button
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-bold rounded-lg shadow-lg hover:from-zinc-800 hover:to-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        )}

        {/* Sign Up Link */}
        <div className="px-8 py-4 bg-zinc-100 flex justify-center mt-4">
          <p className="text-sm text-zinc-600">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-zinc-800 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;