import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearState, verifyOTP } from "@/features/authSlice";

export default function OTPInput() {
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOTP] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!email) return ; 
  //   if (error) toast.error(error);
  //   if (success) {
  //     toast.success(success);
  //     navigate("/forgot-password", { state: { email } }); 
  //   }
  // }, [error, success]);

  useEffect(() => {
    if (!email) return;

    if (error) toast.error(error);

    if (success) {
      toast.success(success);
      navigate("/forgot-password", { state: { email } });
      dispatch(clearState());
    }
  }, [error, success, email, dispatch]);
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

  const handleVerify = (e) => {
    e.preventDefault();
    const otpCode = otp.join("").trim();

    if (otpCode.length !== 6) {
      return toast.error("Enter complete 6-digit OTP");
    }

    dispatch(verifyOTP({ email, otp: otpCode }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
          <CardDescription>Enter the 6-digit OTP</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleVerify} className="flex flex-col gap-5 items-center">

            <div className="flex gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleBackspace(e, idx)}
                  className="w-12 h-12 text-center border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 mt-4 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

          </form>
        </CardContent>

        <CardFooter className="flex justify-between text-sm text-gray-500">
          <span>Didn't receive OTP?</span>
          <Link to="/verify-email">
            <Button variant="link" className="text-blue-600 p-0">
              Resend
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}