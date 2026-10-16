"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, CheckCircle2, XCircle, UserCheck } from "lucide-react";

export default function AgeVerificationModal({
  isOpen: controlledIsOpen,
  onConfirm: controlledOnConfirm,
  user = null,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (controlledIsOpen === undefined) {
      const verified = localStorage.getItem("naughty_mulaqat_age_verified");
      if (!verified) {
        setInternalIsOpen(true);
      }
    }
  }, [controlledIsOpen]);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleAgree = () => {
    try {
      localStorage.setItem("naughty_mulaqat_age_verified", "true");
    } catch {
      // ignore localstorage error
    }
    if (controlledOnConfirm) {
      controlledOnConfirm();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1322]/85 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-lg rounded-3xl bg-white/95 p-6 sm:p-8 shadow-2xl border border-[#F4B8CD] text-center relative overflow-hidden"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#F4B8CD] via-[#DDD6FE] to-[#E887A9]" />

            {/* Logo */}
            <div className="flex justify-center mb-4">
              <Image
                src="/images/naughty-mulakat-infinity-logo.png"
                alt="Naughty Mulaqat"
                width={280}
                height={90}
                unoptimized
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>

            {/* User status badge if authenticated */}
            {(user?.username || user?.name) && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-3">
                <UserCheck className="w-3.5 h-3.5" />
                Verified User: {user.username || user.name}
              </div>
            )}

            {/* 18+ Warning Badge */}
            <div className="flex justify-center mb-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDE8EF] border border-[#F4B8CD] text-[#D8658E] font-semibold text-xs tracking-wider uppercase">
                <ShieldAlert className="w-4 h-4 text-[#D8658E]" />
                Strictly 18+ Adult Content Warning
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#221526] mb-3">
              Age Verification Required
            </h3>

            <p className="text-sm text-[#915F6d] font-semibold leading-relaxed mb-6">
              This website is an adult companionship directory containing visual material, verified escort services,
              and VIP profiles intended exclusively for consenting adults aged <strong className="text-[#D8658E]">18 and older</strong>.
              By confirming, you certify under penalty of perjury that you are of legal age in your jurisdiction (Bangalore, Pune, India)
              and consent to view adult escort content.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                id="btn-confirm-age"
                onClick={handleAgree}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#E887A9] to-[#8B5CF6] text-white font-bold text-sm shadow-lg shadow-[#E887A9]/30 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                I am 18 or Older — Enter
              </button>

              <button
                id="btn-exit-age"
                onClick={handleExit}
                className="sm:w-32 inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-2xl bg-[#FAF7F5] border border-[#F4B8CD]/50 text-[#915F6d] hover:bg-[#FDE8EF]/40 font-semibold text-sm transition-all cursor-pointer"
              >
                <XCircle className="w-4 h-4 text-gray-400" />
                Exit Site
              </button>
            </div>

            <p className="text-[11px] text-[#915F6d] font-semibold mt-6">
              Respect personal privacy, safety, and local regulations. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
