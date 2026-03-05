import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckSquare, Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const links = {
    Product: [
      { label: "Home", path: "/home" },
      { label: "About", path: "/about" },
      { label: "Features", path: "/features" },
      { label: "My Tasks", path: "/todos" },
    ],
    Company: [
      { label: "About Us", path: "/about" },
      { label: "Blog", path: "#" },
      { label: "Careers", path: "#" },
      { label: "Contact", path: "#" },
    ],
    Support: [
      { label: "Help Center", path: "#" },
      { label: "Privacy Policy", path: "#" },
      { label: "Terms of Use", path: "#" },
      { label: "Status", path: "#" },
    ],
  };

  const socials = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Top wave */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 text-gray-100 fill-current">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <CheckSquare size={18} className="text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">TaskFlow</span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Organize your work, track deadlines, and take your productivity to the next level.
              With TaskFlow, managing tasks becomes simple and efficient.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white text-gray-400 transition-all duration-200 hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map(({ label, path }) => (
                  <li key={label}>
                    <button
                      onClick={() => path !== "#" && navigate(path)}
                      className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200 text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h4 className="text-white font-bold text-base">Subscribe to Our Newsletter</h4>
            <p className="text-gray-400 text-sm mt-1">
              Get the latest updates and productivity tips directly in your inbox.
            </p>
          </div>

          <div className="flex w-full sm:w-auto gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 sm:w-56 px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button className="px-5 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-indigo-500 text-white text-sm font-semibold hover:opacity-90 transition whitespace-nowrap shadow-md">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            © {new Date().getFullYear()} TaskFlow. Made with <Heart size={13} className="text-red-500 fill-red-500" /> by Ghulam Mustafa
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;