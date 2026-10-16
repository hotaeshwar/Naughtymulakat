"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Star,
  Sparkles,
  Phone,
  MessageCircle,
  ShieldCheck,
  Check,
  Heart,
  Clock,
  Globe,
} from "lucide-react";

export default function ModelDetailModal({ profile, onClose }) {
  if (!profile) return null;

  const getMaskedNumber = (phone) => {
    if (!phone) return "+91 98••• •••••";
    const parts = phone.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[1]} ••••••`;
    }
    return "+91 98450 ••••••";
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1322]/85 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border-2 border-[#F4B8CD] overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Column: Photo (Body 100% visible, face blurred for privacy) */}
              <div className="relative aspect-[3/4] md:aspect-auto md:h-full min-h-[380px] bg-neutral-900 overflow-hidden">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 400px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Verified badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600/95 text-white text-xs font-bold shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Companion
                  </span>
                </div>
              </div>

              {/* Right Column: Information & Booking */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 rounded-full bg-[#FDE8EF] border border-[#F4B8CD] text-[#D8658E] text-xs font-bold">
                      {profile.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      {profile.rating} ({profile.reviewsCount || 35} reviews)
                    </div>
                  </div>

                  {/* Name & Basic details */}
                  <h2 className="font-serif text-3xl font-extrabold text-[#221526]">
                    {profile.name}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-[#5E4B5E] mt-1 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#E887A9]" />
                    <span>
                      {profile.location}, {profile.cityName}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-[#D8658E]">{profile.age} Years Old</span>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-[#915F6d] font-semibold leading-relaxed mb-5">
                    {profile.bio}
                  </p>

                  {/* Physical attributes & languages */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#F4B8CD]/40 text-xs mb-5">
                    <div>
                      <span className="text-[#915F6d] block">Height</span>
                      <strong className="text-[#221526]">{profile.height || "5'6\""}</strong>
                    </div>
                    <div>
                      <span className="text-[#915F6d] block">Body Type</span>
                      <strong className="text-[#221526]">{profile.bodyType || "Curvy & Fit"}</strong>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-[#F4B8CD]/20 flex items-center gap-1.5 text-[#915F6d]">
                      <Globe className="w-3.5 h-3.5 text-[#A78BFA]" />
                      <span>Languages: {profile.languages?.join(", ") || "English, Hindi"}</span>
                    </div>
                  </div>

                  {/* Rates */}
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-[#221526] uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D8658E]" />
                      Tariff &amp; Rates
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2.5 rounded-xl bg-white border border-[#F4B8CD]/60 shadow-xs">
                        <span className="text-[10px] text-[#915F6d] block">1 Hour</span>
                        <strong className="text-sm text-[#D8658E] font-bold">
                          {profile.rates?.oneHour || "₹7,000"}
                        </strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#F4B8CD]/60 shadow-xs">
                        <span className="text-[10px] text-[#915F6d] block">2 Hours</span>
                        <strong className="text-sm text-[#D8658E] font-bold">
                          {profile.rates?.twoHours || "₹12,000"}
                        </strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-gradient-to-b from-[#FDE8EF] to-white border border-[#E887A9] shadow-xs">
                        <span className="text-[10px] text-[#915F6d] block">Overnight</span>
                        <strong className="text-sm text-[#D8658E] font-bold">
                          {profile.rates?.overnight || "₹25,000"}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <h4 className="text-xs font-bold text-[#221526] uppercase tracking-wider mb-2">
                      Services Included
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.services?.map((service, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FDE8EF]/60 border border-[#F4B8CD]/50 text-[#915F6d] text-xs font-medium"
                        >
                          <Check className="w-3 h-3 text-[#E887A9]" />
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking & Call Actions with Blurred Number by Default */}
                <div className="pt-4 border-t border-[#F4B8CD]/30 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F5] border border-[#DDD6FE]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#FDE8EF] flex items-center justify-center text-[#D8658E]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#915F6d] font-bold uppercase tracking-wider">
                          Direct Contact
                        </div>
                        <div className="text-sm font-mono font-bold text-[#221526]">
                          <span className="text-[#915F6d] tracking-widest font-semibold">
                            {getMaskedNumber(profile.phone)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#FDE8EF] text-[#D8658E] border border-[#F4B8CD]/50">
                      Protected
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gray-100 text-gray-400 font-bold text-sm border border-gray-200 cursor-not-allowed opacity-60 shadow-none"
                    title="WhatsApp temporarily disabled"
                  >
                    <MessageCircle className="w-4 h-4 text-gray-400" />
                    WhatsApp (Disabled)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
