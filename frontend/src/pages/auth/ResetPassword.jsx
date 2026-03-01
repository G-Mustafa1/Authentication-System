import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/PasswordInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { changePassword, clearState } from "@/features/authSlice";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }

  //   if (success) {
  //     toast.success(success);
  //     navigate("/");
  //   }
  // }, [error, success]);

  useEffect(() => {
    if (!email) {
      toast.error("Session expired");
      navigate("/verify-email");
    }

    if (error) toast.error(error);

    if (success) {
      toast.success(success);
      navigate("/");
      dispatch(clearState());
    }
  }, [error, success, email, dispatch]);
  const handleReset = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (newPassword.length < 6 || confirmPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    dispatch(changePassword({ email, newPassword, confirmPassword }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleReset} className="flex flex-col gap-5">

            <div>
              <Label>New Password</Label>
              <PasswordInput
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Resetting..." : "Reset Password"}
            </Button>

          </form>
        </CardContent>

        <CardFooter className="text-center text-sm text-gray-500">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}