import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/features/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home",  path: "/home" },
    { name: "About",  path: "/home" },
    { name: "Features",  path: "/home" },
  ];

  // useEffect(() => {}, )

  const handleLogout = () => {
    try {
      toast.success(success || "Logout successful");
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/")}>
            MyBrand
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                // className={({ isActive }) =>
                //   `text-gray-800 hover:text-blue-600 transition ${isActive ? "font-semibold underline" : ""
                //   }`
                // }
              >
                {link.name}
              </NavLink>
            ))}
            <Button onClick={() => navigate("/todos")} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md">
              Get Started
            </Button>

            {/* Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer w-10 h-10">
                  <AvatarImage src="https://i.pravatar.cc/300" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-white z-40 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="text-lg font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/")}>
            MyBrand
          </div>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col mt-6 space-y-4 px-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              // className={({ isActive }) =>
              //   `text-gray-800 hover:text-blue-600 transition ${isActive ? "font-semibold underline" : ""
              //   }`
              // }
            >
              {link.name}
            </NavLink>
          ))}
          <Button onClick={() => { navigate("/todos"); setIsOpen(false) }} className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Get Started
          </Button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/30 z-30"></div>}
    </nav>
  );
};

export default Navbar;