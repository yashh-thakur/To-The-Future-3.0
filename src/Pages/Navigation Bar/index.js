// Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItem/NavItem";

const NavigationBar = () => {
  const navigate = useNavigate();

 

  return (
    <nav className="bg-[#010A42] p-5">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          {/* <img src="logo.png" alt="Logo" className="h-10" /> */}
          <span className="text-white text-xl font-bold">
            To<span className="text-blue-500">The</span>Future
          </span>
        </div>

        {/* Links Section */}
        <div className="hidden md:flex space-x-8">
          <NavItem text="Home" />
          <NavItem text="Company" />
          <NavItem text="Portfolio" onClick={() => navigate("/portfolio")} />
          <NavItem text="Services" />
          <NavItem text="Pages" />
          <NavItem text="Contact" />
        </div>

        {/* Call to Action Button */}
        <div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
            GET STARTED <span className="ml-2">↗</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
