import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User, CheckSquare, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "@/features/authSlice";
import toast from "react-hot-toast";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useSelector((state) => state.auth);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) return toast.error("Enter your name");
    if (!email.trim()) return toast.error("Enter your email");
    if (!password.trim() || password.length < 6)
      return toast.error("Password must be at least 6 characters");

    try {
      await dispatch(signupUser({ fullName, email, password })).unwrap();
      toast.success("Check your email 📩");
      navigate("/check-email", { state: { email } });
    } catch (err) {
      toast.error(err?.message || err || "Signup failed");
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

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1.5">
              Create your account
            </h2>
            <p className="text-slate-500 text-sm">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
                Log in
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">

            {/* Name */}
            <div>
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <Input
                  required
                  type="text"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <Input
                  required
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                Password
              </Label>
              <PasswordInput
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
              />
              <p className="text-xs text-slate-400 mt-1.5">Use at least 6 characters.</p>
            </div>

            {/* Submit */}
            <Button
              disabled={loading}
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Terms note */}
        <p className="text-xs text-slate-400 text-center mt-6 leading-relaxed">
          By signing up, you agree to TaskFlow's{" "}
          <a href="#" className="text-slate-600 font-medium hover:text-blue-600 hover:underline">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="text-slate-600 font-medium hover:text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}