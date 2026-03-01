import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { clearState, sendOTP } from "@/features/authSlice";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, otpSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (otpSuccess) {
      toast.success(otpSuccess || "OTP sent to your email 📩");
      navigate("/verify", { state: { email } });
      dispatch(clearState());
    }
  }, [error, otpSuccess, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Enter your email");
    }

    dispatch(sendOTP(email));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Forgot Password</h2>
        <p className="text-gray-500 text-sm text-center">Enter your email to receive OTP</p>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 h-10 border-gray-300 focus:ring-blue-500 rounded-md"
          />
        </div >

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-10 bg-blue-600 text-white flex  hover:bg-blue-700 items-center justify-center gap-2 rounded-md"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Sending..." : "Send OTP"}
        </Button>
      </form>
    </div>
  );
}