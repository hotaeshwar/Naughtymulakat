"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { registerUser, loginUser } from "../lib/authService";
import { useToast } from "./ToastContext";

export default function AuthModal({ isOpen, onSuccess }) {
  const [activeTab, setActiveTab] = useState("register"); // "register" | "login"
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  // Username and Password only
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanUser = username.trim();
    if (!cleanUser || cleanUser.length < 3) {
      setErrorMessage("Username must be at least 3 characters.");
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage("Password must be at least 4 characters.");
      return;
    }

    setIsLoading(true);
    try {
      if (activeTab === "register") {
        // 1. REGISTER: Save in Firebase DB, then redirect to Sign In
        await registerUser({
          username: cleanUser,
          password: password,
        });

        toast.success(
          `Account created in Firebase DB. Please sign in with your password.`,
          5000
        );

        // Redirect to Sign In tab and keep username pre-filled
        setActiveTab("login");
        setPassword("");
        setShowPassword(false);
      } else {
        // 2. LOGIN: Validate against Firebase DB, then proceed to 18+ gate
        const res = await loginUser({
          username: cleanUser,
          password: password,
        });

        toast.success(
          `Welcome back, ${res.user.username}. Validated with Firebase DB.`,
          4500
        );
        if (onSuccess) onSuccess(res.user);
      }
    } catch (err) {
      setErrorMessage(err.message || "Authentication failed. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F1322]/85 backdrop-blur-xl overflow-y-auto"
        >
          {/* COMPACT & TINY LUXURY AUTH MODAL */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ type: "spring", damping: 25, stiffness: 340 }}
            className="w-full max-w-[340px] sm:max-w-[360px] rounded-2xl bg-white/95 p-4 sm:p-5 shadow-2xl border border-[#F4B8CD] text-left relative overflow-hidden"
          >
            {/* Top decorative pastel gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F4B8CD] via-[#DDD6FE] to-[#E887A9]" />

            {/* Compact Logo */}
            <div className="flex justify-center mb-2.5 pt-1">
              <Image
                src="/images/naughty-mulakat-infinity-logo.png"
                alt="Naughty Mulaqat"
                width={200}
                height={60}
                unoptimized
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>

            {/* Header info */}
            <div className="text-center mb-3">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FDE8EF] border border-[#F4B8CD] text-[#D8658E] font-bold text-[10px] tracking-wider uppercase mb-1">
                <Sparkles className="w-3 h-3 text-[#E887A9]" />
                VIP Member Access
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-extrabold text-[#221526] leading-tight">
                {activeTab === "register" ? "Create Account" : "Member Sign In"}
              </h2>
              <p className="text-[11px] text-[#915F6d] font-semibold mt-0.5">
                {activeTab === "register"
                  ? "Details save directly to Firebase DB"
                  : "Validated directly against Firebase DB"}
              </p>
            </div>

            {/* Compact Switch Tabs */}
            <div className="grid grid-cols-2 p-0.5 bg-[#FAF7F5] rounded-xl border border-[#F4B8CD]/50 mb-3">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("register");
                  setErrorMessage("");
                }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === "register"
                    ? "bg-white text-[#D8658E] shadow-xs border border-[#F4B8CD]/50"
                    : "text-[#915F6d] hover:text-[#221526]"
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  setErrorMessage("");
                }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === "login"
                    ? "bg-white text-[#8B5CF6] shadow-xs border border-[#DDD6FE]/60"
                    : "text-[#915F6d] hover:text-[#221526]"
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-2.5 p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold flex items-start gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-rose-500" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {/* COMPACT FORM: ONLY USERNAME AND PASSWORD */}
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-bold text-[#221526] mb-1">
                  Username *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#E887A9] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose username"
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#F4B8CD]/70 text-xs font-medium text-[#221526] bg-white focus:outline-none focus:ring-2 focus:ring-[#D8658E] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#221526] mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-[#E887A9] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete={activeTab === "register" ? "new-password" : "current-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-8 pr-9 py-2 rounded-xl border border-[#F4B8CD]/70 text-xs font-medium text-[#221526] bg-white focus:outline-none focus:ring-2 focus:ring-[#D8658E] focus:border-transparent transition-all"
                  />
                  {/* Password Mask / Unmask Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-[#915F6d] hover:text-[#D8658E] focus:outline-none transition-colors cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-1.5 py-2.5 rounded-xl bg-gradient-to-r from-[#E887A9] to-[#8B5CF6] text-white font-bold text-xs shadow-md shadow-[#E887A9]/25 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Connecting to Firebase DB...
                  </>
                ) : activeTab === "register" ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Create Account (Sign In Next)
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Sign In &amp; Enter
                  </>
                )}
              </button>
            </form>

            {/* Discreet Security Footer */}
            <div className="mt-3 pt-2.5 border-t border-[#F4B8CD]/40 text-center">
              <p className="text-[10px] text-[#915F6d] font-semibold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                100% Confidential. Validated via Firebase DB.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
