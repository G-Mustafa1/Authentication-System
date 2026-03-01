import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CheckEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          📩 Check Your Email
        </h2>

        <p className="text-gray-600 mb-4">
          We’ve sent a verification link to:
        </p>

        <p className="font-semibold text-blue-600 mb-6">
          {email || "your email"}
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Please open your email and click on the verification link to activate your account.
        </p>

        {/* <Button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Go to Login
        </Button> */}
      </div>
    </div>
  );
}