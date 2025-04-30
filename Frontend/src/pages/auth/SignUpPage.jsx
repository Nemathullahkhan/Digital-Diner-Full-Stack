// import React, { useState } from "react";
// import { useAuthStore } from "../../store/authStore";
// import { Link, useNavigate } from "react-router-dom";
// import { Loader, Mail, User } from "lucide-react";

// export const SignUpPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");

//   const navigate = useNavigate();

//   const { signup, error, isLoading } = useAuthStore();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       await signup(email, password, name, phone);
//       navigate("/checkout");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="">
//       <div className="p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
//           Create Account
//         </h2>

//         <form onSubmit={handleSignUp}>
//           <input
//             icon={User}
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             icon={Mail}
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             icon={Lock}
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <input
//             icon={Lock}
//             type="phone"
//             placeholder="7123798123"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//           {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

//           <button
//             className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
// 						font-bold rounded-lg shadow-lg hover:from-green-600
// 						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
// 						 focus:ring-offset-gray-900 transition duration-200"
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <Loader className=" animate-spin mx-auto" size={24} />
//             ) : (
//               "Sign Up"
//             )}
//           </button>
//         </form>
//       </div>

//       <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
//         <p className="text-sm text-gray-400">
//           Already have an account?{" "}
//           <Link to={"/login"} className="text-green-400 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };


import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Loader, Phone } from "lucide-react";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name, phone);
      navigate("/checkout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[88vh] flex items-center justify-center bg-gradient-to-b from-zinc-100/90 to-zinc-200">
      <div className="bg-zinc-50 rounded-lg shadow-xl px-4 py-2 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-3 text-center text-zinc-800 tracking-tighter">
          Create Account
        </h2>

        <form onSubmit={handleSignUp}>
          <div className="mb-4 relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-200 text-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
              disabled={isLoading}
            />
          </div>

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

          <div className="mb-4 relative">
            <Phone
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5"
            />
            <input
              type="tel" // Changed to tel for phone input
              placeholder="Phone (e.g., 7123798123)"
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
              "Sign Up"
            )}
          </button>
        </form>

        <div className="px-8 py-4 bg-zinc-100 flex justify-center mt-4">
          <p className="text-sm text-zinc-600">
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-zinc-800 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;