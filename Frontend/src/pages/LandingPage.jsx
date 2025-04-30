import React from "react";
import biryaniImage from "../assets/chickenBiryani.png"; // Import the image
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-[88vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full py-4">
        <div className="space-y-2">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
            <div className="flex flex-col items-center lg:items-start lg:mx-16">
              <div className="flex flex-col items-center lg:items-start justify-center mt-12 lg:mt-36 text-center lg:text-left">
                <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-tighter font-bold">
                  From Biryani to Bliss
                </h2>
                <h1 className="text-2xl sm:text-3xl md:text-4xl tracking-tighter font-bold">
                  Just a click away
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row justify-start gap-2 mt-5">
                <Link to="/auth/signup">
                  <button className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors">
                    Get Started
                  </button>
                </Link>
                <Link to="/home">
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors tracking-tight">
                    Check Menu
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end items-center">
              <img 
                src={biryaniImage} 
                alt="biryani" 
                className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;