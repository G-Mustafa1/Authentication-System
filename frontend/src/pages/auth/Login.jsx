import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearState, loginUser } from "@/features/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, success, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (user) {
      toast.success(success || "Login successful");
      navigate("/home");
    }
  }, [error, user]); 
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Enter your email");
    if (!password.trim() || password.length < 6) return toast.error("Password must be at least 6 characters");

    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Login</CardTitle>
          <CardDescription className="text-gray-500 mt-1">
            Enter your credentials to access your account
          </CardDescription>
          <div className="mt-3 text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="relative flex flex-col">
              <Label>Email</Label>
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
              </div>
            </div>
            <div className="relative flex flex-col">
              <Label>Password</Label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <Link to="/verify-email" className="text-blue-600 hover:underline text-sm mt-2.5">
                Forgot Password?
              </Link>
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
              {loading ? "Logging In..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}