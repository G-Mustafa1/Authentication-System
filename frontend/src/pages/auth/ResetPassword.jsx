import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/PasswordInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { changePassword } from "@/features/authSlice";
import { CheckSquare, KeyRound, ArrowRight } from "lucide-react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const email = location.state?.email;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!email) {
      navigate("/verify-email", { replace: true });
    }
  }, [email, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!newPassword.trim()) return toast.error("Enter new password");
    if (!confirmPassword.trim()) return toast.error("Confirm your password");
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");

    try {
      await dispatch(changePassword({ email, newPassword, confirmPassword })).unwrap();
      toast.success("Password reset successful");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err?.message || err || "Failed to reset password");
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
              Reset your password
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Choose a strong new password for your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleReset} className="space-y-5">

            {/* New Password */}
            <div>
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                New Password
              </Label>
              <PasswordInput
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                Confirm Password
              </Label>
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                required
                className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  Reset Password <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}