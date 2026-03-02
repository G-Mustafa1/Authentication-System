import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2, ArrowRight, Star, Users, Zap,
  Clock, Target, TrendingUp, Shield, Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Smart Goal Tracking",
    desc: "Set your goals and TaskFlow automatically tracks your progress. Stay motivated with every milestone.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Clock,
    title: "Deadline Reminders",
    desc: "Never miss a deadline again. Smart notifications remind you at the perfect time.",
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: TrendingUp,
    title: "Productivity Analytics",
    desc: "Track your performance with weekly and monthly reports and improve where it matters.",
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Work with your team efficiently. Assign tasks, leave comments, and sync in real-time.",
    color: "from-sky-500 to-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your data is fully secure with end-to-end encryption and complete privacy protection.",
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Add, edit, and complete tasks instantly with zero delays. Built for speed.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
  },
];

const testimonials = [
  {
    name: "Ahmed Raza",
    role: "Product Manager",
    text: "TaskFlow completely changed my life. I used to forget everything, now everything is organized.",
    avatar: "AR",
    stars: 5,
  },
  {
    name: "Sana Khan",
    role: "Freelance Designer",
    text: "I never miss client deadlines anymore. Best task management app I've ever used!",
    avatar: "SK",
    stars: 5,
  },
  {
    name: "Bilal Hussain",
    role: "Software Engineer",
    text: "Simple yet powerful. Exactly what I needed to manage my daily development tasks.",
    avatar: "BH",
    stars: 5,
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans">
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6 border border-blue-200">
              <Sparkles size={13} /> #1 Task Management App 2025
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Manage Your Tasks the{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                Smart Way
              </span>
            </h1>

            <p className="text-lg text-gray-500 mb-8">
              TaskFlow is a powerful task management platform designed to boost your productivity.
              Set goals, track progress, and complete tasks on time — all in one place.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/todos")}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2"
              >
                Get Started <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate("/features")}
                className="px-6 py-3 border rounded-xl"
              >
                Explore Features
              </button>
            </div>
          </div>
      <div className="relative hidden lg:block">
        <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-100 border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Today's Tasks</h3>
            <span className="text-xs bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full">5 remaining</span>
          </div>
          {[
            { text: "Complete UI design review", done: true },
            { text: "Send proposal to client", done: true },
            { text: "Write team meeting notes", done: false },
            { text: "Test backend API integration", done: false },
            { text: "Submit weekly report", done: false },
          ].map((task, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-xl mb-2 transition-colors ${task.done ? "bg-gray-50" : "bg-white border border-gray-100"
                }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${task.done ? "bg-blue-500 border-blue-500" : "border-gray-300"
                }`}>
                {task.done && <CheckCircle2 size={12} className="text-white" />}
              </div>
              <span className={`flex-1 text-sm ${task.done ? "line-through text-gray-400" : "text-gray-700 font-medium"}`}>
                {task.text}
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${task.tagColor}`}>{task.tag}</span>
            </div>
          ))}
          {/* progress bar */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Progress</span><span className="font-bold text-blue-600">40%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-2/5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* floating badge */}
        <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
            <TrendingUp size={14} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">Productivity</p>
            <p className="text-xs text-green-600 font-bold">+47% this week</p>
          </div>
        </div>
      </div>
        </div>
      </section>
      

      

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 border rounded-xl">
              <Icon className="mb-3" />
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, text, avatar, stars }) => (
            <div key={name} className="bg-white p-6 rounded-xl shadow">
              <div className="flex mb-3">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-4">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                  {avatar}
                </div>
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;