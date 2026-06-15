import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, CheckSquare, ArrowLeft } from "lucide-react";

export default function CheckEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-200">
            <CheckSquare size={19} className="text-white" />
          </div>
          <span className="text-xl font-extrabold text-slate-900">TaskFlow</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10 text-center">

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
            <Mail size={28} className="text-blue-600" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
            Check your email
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed mb-1">
            We've sent a verification link to
          </p>

          <p className="font-bold text-blue-600 mb-6 break-all">
            {email || "your email address"}
          </p>

          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            Open your inbox and click the verification link to activate
            your account. If you don't see it, check your spam folder.
          </p>

          <Button
            onClick={() => navigate("/")}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} /> Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
}