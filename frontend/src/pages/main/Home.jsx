import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, Globe, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 via-blue-50 to-white text-gray-900 min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-20 relative overflow-hidden pt-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeInDown">
          Build Your Modern Website
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-3xl animate-fadeIn delay-200">
          Professional UI, clean layout, and modern design for your business.
        </p>
        <div className="space-x-4 animate-fadeIn delay-400">
          <Button onClick={() => navigate("/todos")} className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold">
            Get Started
          </Button>
          <Button className="bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 text-gray-800 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center text-center">
            <Users className="w-12 h-12 mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-4">User Friendly</h3>
            <p>Clean UI with intuitive navigation for your visitors.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center text-center">
            <Globe className="w-12 h-12 mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-4">Global Reach</h3>
            <p>Optimized for speed and accessibility worldwide.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center text-center">
            <Shield className="w-12 h-12 mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-4">Secure & Reliable</h3>
            <p>High reliability and strong security practices.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;