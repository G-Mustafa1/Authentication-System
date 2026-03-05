import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";

export function PasswordInput({ placeholder, value, onChange }) {
 
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
      />
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
        onClick={() => setShow(!show)}
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </div>
    </div>
  );
}