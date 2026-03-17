import { useState } from "react";
import Logo from "./Logo";

export default function LoginBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("login");

  const isLogin = view === "login";

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          setView("login");
        }}
        className="figma-btn figma-btn--primary"
      >
        Log in
      </button>

      {isOpen && (
        <div className="login-modal-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="w-[400px] bg-white rounded-xl shadow-2xl border border-gray-200 p-8 flex flex-col items-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer"
            >
              ✕
            </button>

            <div className="mb-6 w-15 h-15 rounded-lg flex items-center justify-center">
              <Logo />
            </div>

            {/* 2. Dynamic Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
              {isLogin ? "Log in to Meridian" : "Create an account"}
            </h1>
            <p className="text-gray-500 mb-8 text-center text-sm">
              {isLogin
                ? "Use your work or personal account"
                : "Use features like file upload and saved chats"}
            </p>

            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-lg font-medium hover:bg-gray-50 mb-4 text-sm">
              Continue with Google
            </button>

            <div className="flex items-center w-full my-4">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <span className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                or
              </span>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg p-2.5 mb-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="relative w-full mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <button className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-zinc-800 text-sm">
              {isLogin ? "Log in" : "Create account"}
            </button>

            <p className="mt-6 text-xs text-gray-500">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                onClick={() => setView(isLogin ? "signup" : "login")} // Swaps the view
                className="text-blue-600 cursor-pointer hover:underline font-medium"
              >
                {isLogin ? "Create one" : "Log in"}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
