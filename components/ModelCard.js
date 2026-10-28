"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Star,
  Phone,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Info,
  Clock,
} from "lucide-react";
import { useToast } from "./ToastContext";

export default function ModelCard({ profile, onSelectProfile, index = 0 }) {
  const getMaskedNumber = (phone) => {
    if (!phone) return "+91 98••• •••••";
    const parts = phone.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[1]} ••••••`;
    }
    return "+91 98450 ••••••";
  };

  const delayClasses = ["delay-0", "delay-75", "delay-150", "delay-225"];
  const delayClass = delayClasses[index % 4] || "delay-0";

  return (
    <div
      className={`animate-card-enter ${delayClass} rounded-3xl p-3.5 sm:p-4 md:p-5 flex flex-col justify-between h-full bg-white/95 backdrop-blur-md border-2 border-[#F4B8CD]/60 shadow-[0_4px_25px_-5px_rgba(232,135,169,0.25)] hover:shadow-[0_0_35px_rgba(232,135,169,0.45)] hover:border-[#E887A9] hover:-translate-y-1.5 transition-all duration-300 group`}
    >
      <div>
        {/* PHOTO CONTAINER: FULL BODY 100% CLEAR, ONLY FACE BLURRED FOR PRIVACY */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 mb-4 shadow-inner">
          <Image
            src={profile.image}
            alt={`${profile.name} - ${profile.category} in ${profile.cityName}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-extrabold text-[#D8658E] shadow-sm border border-[#F4B8CD]">
              <Sparkles className="w-3 h-3 text-[#E887A9]" />
              {profile.category}
            </span>

            {profile.isVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold shadow-sm">
                <ShieldCheck className="w-3 h-3 text-white" />
                Verified
              </span>
            )}
          </div>
        </div>

        {/* ALL TEXT & DETAILS POSITIONED OUTSIDE / BELOW THE IMAGE */}
        <div className="space-y-3">
          {/* Row 1: Name and Age */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#221526] tracking-tight group-hover:text-[#D8658E] transition-colors truncate">
              {profile.name}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FDE8EF] border border-[#F4B8CD] text-[#D8658E] font-bold text-xs flex-shrink-0">
              {profile.age} yrs
            </span>
          </div>

          {/* Row 2: Location and Rating */}
          <div className="flex items-center justify-between text-xs text-[#915F6d]">
            <span className="flex items-center gap-1.5 font-medium truncate">
              <MapPin className="w-3.5 h-3.5 text-[#E887A9] flex-shrink-0" />
              <span className="truncate">{profile.location}, {profile.cityName}</span>
            </span>
            <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60 flex-shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {profile.rating}
            </span>
          </div>

          {/* Row 3: Bio description */}
          <p className="text-xs sm:text-sm text-[#915F6d] font-semibold leading-relaxed line-clamp-2">
            {profile.bio}
          </p>

          {/* Row 4: Tariff banner */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-[#FDE8EF]/80 to-[#FAF7F5] border border-[#F4B8CD]/50 text-xs">
            <span className="text-[#915F6d] font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#E887A9]" />
              Tariff
            </span>
            <span className="text-[#D8658E] font-extrabold">
              {profile.rates?.oneHour || "₹7,000"} / hr
            </span>
          </div>

          {/* Row 5: Services tags */}
          <div className="flex flex-wrap gap-1.5">
            {profile.services?.slice(0, 3).map((service, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-lg bg-[#FAF7F5] border border-[#DDD6FE]/70 text-[#915F6d] text-[11px] font-semibold"
              >
                {service}
              </span>
            ))}
            {profile.services?.length > 3 && (
              <span className="px-2 py-0.5 rounded-lg bg-[#FAF7F5] text-[11px] text-[#915F6d] font-medium">
                +{profile.services.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS: Direct Contact & Action Buttons */}
      <div className="pt-4 mt-4 border-t border-[#F4B8CD]/40 space-y-2.5">
        {/* Direct Contact Number / Click to Call */}
        <a
          href={`tel:${(profile.phone || "").replace(/[^0-9+]/g, "")}`}
          className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FAF7F5] hover:bg-[#FDE8EF]/60 border border-[#F4B8CD]/50 shadow-inner transition-colors group/call cursor-pointer"
          title="Click to Call"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#FDE8EF] group-hover/call:bg-[#E887A9] group-hover/call:text-white flex items-center justify-center text-[#D8658E] shadow-xs transition-colors">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] text-[#915F6d] font-bold uppercase tracking-wider">
                Direct Contact
              </div>
              <div className="text-xs font-mono font-bold text-[#221526]">
                <span className="text-[#221526] font-bold tracking-wide">
                  {profile.phone}
                </span>
              </div>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-[#FDE8EF] group-hover/call:bg-[#E887A9] text-[#D8658E] group-hover/call:text-white border border-[#F4B8CD]/50 transition-colors shadow-xs">
            Call
          </span>
        </a>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`https://wa.me/${(profile.whatsapp || profile.phone || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi, I saw ${profile.name} on Naughty Mulaqat`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-xs shadow-sm hover:shadow-md hover:shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => onSelectProfile(profile)}
            className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-white hover:bg-[#FDE8EF] text-[#221526] hover:text-[#D8658E] font-bold text-xs border border-[#F4B8CD] shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-[#E887A9]" />
            Full Profile
          </button>
        </div>
      </div>
    </div>
  );
}
