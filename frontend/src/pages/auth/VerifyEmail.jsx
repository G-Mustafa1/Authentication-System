import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendOTP } from "@/features/authSlice";
import { Mail, CheckSquare, ArrowRight, KeyRound, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Enter your email");
    }

    try {
      await dispatch(sendOTP(email)).unwrap();
      toast.success("OTP sent to your email 📩");
      navigate("/verify", { state: { email } });
    } catch (err) {
      toast.error(err?.message || err || "Failed to send OTP");
    }
  };

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
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10">

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
            <KeyRound size={24} className="text-blue-600" />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1.5">
              Forgot your password?
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              No worries — enter the email address linked to your account
              and we'll send you a one-time code to reset it.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  Send OTP <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          {/* Back to login */}
          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 font-medium mt-6 transition-colors"
          >
            <ArrowLeft size={15} /> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}