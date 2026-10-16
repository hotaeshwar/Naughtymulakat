"use client";

import { useState, useEffect } from "react";
import { User, LogOut, ShieldCheck, Sparkles, ChevronDown } from "lucide-react";
import { getCurrentUser, logoutUser } from "../lib/authService";
import { useToast } from "./ToastContext";

export default function HeaderUserBadge() {
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  const syncUser = () => {
    setUser(getCurrentUser());
  };

  useEffect(() => {
    setIsMounted(true);
    syncUser();

    const interval = setInterval(syncUser, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    toast.info("Logged out successfully. Reopening authentication modal...");
    // Trigger reset event for GatekeeperAuthFlow
    window.dispatchEvent(new CustomEvent("nm_auth_reset"));
  };

  const handleOpenAuth = () => {
    window.dispatchEvent(new CustomEvent("nm_auth_reset"));
  };

  if (!isMounted) return null;

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <div className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#F4B8CD]/70 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E887A9] to-[#8B5CF6] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-[#221526] leading-none flex items-center gap-1">
              {user.username || user.name}
              <ShieldCheck className="w-3 h-3 text-emerald-500 fill-emerald-100" />
            </span>
            <span className="text-[10px] text-[#D8658E] font-semibold capitalize mt-0.5">
              Verified Member
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Log Out / Test Auth Flow"
            className="ml-1 p-1.5 rounded-xl text-[#915F6d] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleOpenAuth}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-[#E887A9] to-[#8B5CF6] text-white font-bold text-xs shadow-md shadow-[#E887A9]/25 hover:opacity-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          VIP Sign In
        </button>
      )}
    </div>
  );
}
