import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-200 animate-pulse">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-semibold text-slate-800">
            Authenticating...
          </h3>
          <p className="text-sm text-slate-500">
            Please wait a moment
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;