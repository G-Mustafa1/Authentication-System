import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearState, signupUser } from "@/features/authSlice";
import toast from "react-hot-toast";

export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [fullName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, error, success } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (error) {
            toast.error(error);
        }

        if (success) {
            toast.success("Check your email 📩");
            navigate("/check-email", { state: { email } });
        }

        dispatch(clearState());
    }, [error, success, dispatch]);
    const handleSignup = (e) => {
        e.preventDefault();
        console.log('hy');

        if (!fullName.trim()) return toast.error("Enter your name");
        if (!email.trim()) return toast.error("Enter your email");
        if (!password || password.length < 6)
            return toast.error("Password must be at least 6 characters");
        dispatch(signupUser({ fullName, email, password }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-lg rounded-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">
                        Sign Up
                    </CardTitle>
                    <CardDescription>
                        Create your account
                    </CardDescription>

                    <p className="text-sm mt-2">
                        Already have an account?{" "}
                        <Link to="/" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSignup} className="flex flex-col gap-5">

                        {/* Name */}
                        <div>
                            <Label>Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    required
                                    type="text"
                                    placeholder="Your Name"
                                    value={fullName}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <Label>Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    required
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <Label>Password</Label>
                            <PasswordInput
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                            />
                        </div>

                        {/* Button with Loader */}
                        <Button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                        >
                            {loading && (
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            )}
                            {loading ? "Signing Up..." : "Sign Up"}
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}