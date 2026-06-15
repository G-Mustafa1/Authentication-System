import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { verifyOTP } from "@/features/authSlice";
import { CheckSquare, ShieldCheck, ArrowRight, RotateCcw } from "lucide-react";

export default function OTPInput() {
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOTP] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!email) {
      navigate("/verify-email", { replace: true });
    }
  }, [email, navigate]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/^[0-9]?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOTP(newOtp);
      if (val && index < 5) inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasteData)) return;
    const newOtp = pasteData.split("");
    setOTP(newOtp);
    inputsRef.current[5]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("").trim();
    if (otpCode.length !== 6) return toast.error("Enter complete 6-digit OTP");

    try {
      await dispatch(verifyOTP({ email, otp: otpCode })).unwrap();
      toast.success("OTP verified");
      navigate("/forgot-password", { state: { email } });
    } catch (err) {
      toast.error(err?.message || err || "Invalid OTP");
    }
  };

  const isComplete = otp.every((d) => d !== "");

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
            <ShieldCheck size={24} className="text-blue-600" />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1.5">
              Verify your email
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We sent a 6-digit OTP to{" "}
              <span className="font-semibold text-slate-700">{email || "your email"}</span>.
              Enter it below to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleVerify} className="space-y-6">

            {/* OTP Boxes */}
            <div className="flex justify-between gap-2 sm:gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleBackspace(e, idx)}
                  onPaste={handlePaste}
                  className={`w-full aspect-square max-w-[52px] text-center text-xl font-bold rounded-xl border-2 transition-all duration-200 outline-none
                    bg-slate-50 text-slate-900 caret-blue-500
                    ${digit
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-slate-200 focus:border-blue-400 focus:bg-white"
                    }`}
                />
              ))}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading || !isComplete}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify OTP <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          {/* Resend */}
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-slate-500">
            <span>Didn't receive it?</span>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
            >
              <RotateCcw size={13} /> Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}