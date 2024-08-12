"use client";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#111a22]  flex justify-between text-white border-b border-solid border-b-[#243647] pl-16 pr-16 pb-4 pt-4 sticky"> 
      <div className="flex items-center">
        <img src="/takeuforward.png" alt="Logo" className="h-10 mr-2" /> {/* Adjust the path to your logo */}
      </div>
      <div className="flex items-center">
        <a className="text-xl font-semibold mr-4" href="/">Home </a>
        <a className="text-xl fone-semibold mr-4" href="/internaldashboard">Dashboard</a>
        <button className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;