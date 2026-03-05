import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Heart, Lightbulb, Rocket, Shield, Users, Target } from "lucide-react";


const values = [
  {
    icon: Heart,
    title: "User First",
    desc: "We prioritize our users in every decision we make.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We are passionate about discovering new ideas and creative solutions.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    desc: "User data privacy and security are our highest priorities.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Rocket,
    title: "Speed & Growth",
    desc: "We learn fast, iterate quickly, and continuously grow.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
];



const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-indigo-50 -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-block text-blue-600 font-bold text-sm uppercase tracking-widest mb-4 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            About Us
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Our Mission:{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Simplifying Productivity
            </span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            TaskFlow is a startup that believes every individual has unlimited potential — they just need the right tools. We build those tools.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            {[
              { icon: Users, label: "50,000+ Users" },
              { icon: Target, label: "Global Users" },
              { icon: Rocket, label: "Founded 2021" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border">
                <Icon size={16} className="text-blue-500" />
                <span className="font-semibold text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="bg-linear-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
            <p className="text-blue-200 text-sm mb-3">Our Story</p>
            <blockquote className="text-2xl font-bold mb-6">
              "We were a small team looking for a better todo app. When we couldn't find one, we built our own."
            </blockquote>
            <p className="font-bold">Ali Hassan</p>
            <p className="text-blue-200 text-sm">CEO & Founder</p>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold mb-6">Our Journey</h2>
            <p className="text-gray-500 mb-4">
              In 2021, a small team noticed that existing task management apps were either too complex or not user-friendly.
            </p>
            <p className="text-gray-500 mb-4">
              So we created TaskFlow — simple, intuitive, and built for everyone.
            </p>
            <p className="text-gray-500 mb-6">
              Today, TaskFlow is used by thousands of professionals worldwide.
            </p>

            {[
              "User-friendly interface",
              "Multi-language support",
              "Offline mode available",
              "Free plan forever",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-blue-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-10">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-xl">
                <Icon className="mb-3 mx-auto" />
                <h3 className="font-bold">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center bg-blue-600 text-white">
        <h2 className="text-4xl font-extrabold mb-4">Join Us Today</h2>
        <p className="mb-6">Start managing your tasks smarter — completely free.</p>
        <button
          onClick={() => navigate("/todos")}
          className="bg-white text-blue-600 px-6 py-3 rounded-xl"
        >
          Get Started <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
};

export default About;