import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Target, Clock, TrendingUp, Users, Shield, Zap,
  Bell, Tag, Filter, Repeat, Moon, Download,
  CheckCircle2, ArrowRight
} from "lucide-react";

const mainFeatures = [
  {
    icon: Target,
    title: "Smart Goal Tracking",
    desc: "Break big goals into small actionable tasks and track your progress visually.",
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
    points: [
      "Daily / Weekly / Monthly goals",
      "Progress tracking",
      "Milestone achievements",
      "Goal reminders",
    ],
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    desc: "Never miss deadlines with flexible and powerful reminders.",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
    points: [
      "Custom reminders",
      "Recurring alerts",
      "Push notifications",
      "Snooze option",
    ],
  },
  {
    icon: Tag,
    title: "Tags & Categories",
    desc: "Organize tasks efficiently with categories and color-coded tags.",
    color: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50",
    points: [
      "Custom categories",
      "Color tags",
      "Quick filtering",
      "Bulk actions",
    ],
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Work together with your team in real-time.",
    color: "from-sky-500 to-blue-500",
    bg: "bg-sky-50",
    points: [
      "Assign tasks",
      "Comments",
      "File sharing",
      "Team updates",
    ],
  },
  {
    icon: TrendingUp,
    title: "Analytics & Reports",
    desc: "Understand your productivity with clear insights and reports.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    points: [
      "Weekly analytics",
      "Category insights",
      "Completion rate",
      "Export data",
    ],
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    desc: "Your data is fully secure with modern protection systems.",
    color: "from-rose-500 to-red-500",
    bg: "bg-rose-50",
    points: [
      "End-to-end encryption",
      "Secure backup",
      "2FA support",
      "Data control",
    ],
  },
];

const quickFeatures = [
  { icon: Zap, title: "Fast Performance", desc: "Instant task creation" },
  { icon: Filter, title: "Advanced Filters", desc: "Smart filtering options" },
  { icon: Repeat, title: "Recurring Tasks", desc: "Auto-repeat tasks" },
  { icon: Moon, title: "Dark Mode", desc: "Comfortable night UI" },
  { icon: Download, title: "Offline Mode", desc: "Works without internet" },
  { icon: Clock, title: "Time Tracking", desc: "Track task time" },
];

export default function Features() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  return (
    <div className="bg-white">

      <section className="pt-28 pb-20 text-center relative">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-indigo-50 -z-10" />

        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Powerful Features for Better{" "}
          <span className="bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Productivity
          </span>
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto mb-8 text-lg">
          Everything you need to manage tasks, stay organized, and achieve your goals.
        </p>

        <button
          onClick={() => navigate("/todos")}
          className="px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-500 text-white rounded-2xl font-bold shadow-lg hover:scale-105 transition"
        >
          Get Started <ArrowRight size={16} />
        </button>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
        
        <div className="space-y-3">
          {mainFeatures.map((f, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-full text-left p-4 rounded-xl transition ${
                active === i
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {f.title}
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 bg-gray-50 p-8 rounded-2xl">
          {(() => {
            const f = mainFeatures[active];
            const Icon = f.icon;

            return (
              <>
                <Icon className="text-blue-600 mb-4" size={30} />
                <h2 className="text-2xl font-bold mb-3">{f.title}</h2>
                <p className="text-gray-500 mb-6">{f.desc}</p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {f.points.map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <CheckCircle2 className="text-blue-500" size={16} />
                      <span className="text-sm">{p}</span>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {quickFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <Icon className="text-blue-600 mb-3" />
                <h4 className="font-bold">{f.title}</h4>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-linear-to-r from-blue-600 to-indigo-600 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">
          Start Managing Tasks Today
        </h2>

        <p className="mb-6 text-blue-100">
          No credit card required. Start in seconds.
        </p>

        <button
          onClick={() => navigate("/todos")}
          className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:scale-105 transition"
        >
          Get Started
        </button>
      </section>

    </div>
  );
}