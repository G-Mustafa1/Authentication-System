import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { X, Menu, User, Settings, LogOut, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/features/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home",     path: "/home"     },
    { name: "About",    path: "/about"    },
    { name: "Features", path: "/features" },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logout successful");
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Logout failed");
    }
  };

  const getInitial = () => {
    if (user?.name)  return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg shadow-blue-100/50"
          : "backdrop-blur-md bg-white/90 border-b border-gray-100"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-indigo-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <CheckSquare size={16} className="text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                TaskFlow
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                onClick={() => navigate("/todos")}
                className="bg-linear-to-r from-blue-600 to-indigo-500 text-white hover:opacity-90 px-5 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                My Tasks
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50">
                    <Avatar className="w-9 h-9">
                      <AvatarFallback className="bg-linear-to-br from-blue-600 to-indigo-500 text-white font-bold text-sm">
                        {getInitial()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44 mt-2 rounded-xl shadow-xl">
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer"><User size={15} className="mr-2" /> Profile</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer"><Settings size={15} className="mr-2" /> Settings</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive" onClick={handleLogout} className="cursor-pointer">
                      <LogOut size={15} className="mr-2" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-linear-to-br from-blue-600 to-indigo-500 text-white font-bold text-xs">
                  {getInitial()}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {isOpen ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Drawer */}
      <aside
        style={{ backgroundColor: "white" }}
        className={`fixed top-0 right-0 h-full w-70 max-w-[85vw] z-50 md:hidden
          flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-blue-600 to-indigo-500 flex items-center justify-center">
              <CheckSquare size={13} className="text-white" />
            </div>
            <span className="text-lg font-extrabold bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        {/* User Card */}
        <div className="mx-4 mt-4 mb-3 rounded-2xl  p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-600/25 border-2 border-white/50 flex items-center justify-center text-blue-600 font-extrabold text-lg select-none shrink-0">
            {getInitial()}
          </div>
          <div className="min-w-0">
            <p className="text-black font-bold text-sm truncate">{user?.name  || "User"}</p>
            <p className="text-blue-900 text-xs truncate">{user?.email || "user@email.com"}</p>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-2 mt-2">Menu</p>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => { navigate("/todos"); setIsOpen(false); }}
            className="mt-3 w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-500 text-white text-sm font-bold shadow-md hover:opacity-90 transition-all active:scale-95"
          >
            ✓ My Tasks
          </button>
          {/* </div> */}
        </div>

        {/* Logout */}
        <div className="px-4 pb-6 pt-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-red-200 bg-red-50 text-red-500 text-sm font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 active:scale-95"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;