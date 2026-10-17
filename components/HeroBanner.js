"use client";

import Image from "next/image";
import { Sparkles, ShieldCheck } from "lucide-react";
import TypewriterText from "./TypewriterText";

export default function HeroBanner({ selectedCity, onSelectCity }) {
  return (
    <div className="w-full mb-6 sm:mb-8 md:mb-10 flex flex-col space-y-5 sm:space-y-6">
      {/* 1. TEXT SECTION: Responsive on Mobile, iPad Mini, iPad Air, iPad Pro, iPad Max & Desktop */}
      <div className="animate-card-enter w-full text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 p-4 sm:p-6 md:p-7 lg:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-[#F4B8CD]/60 shadow-[0_10px_30px_-10px_rgba(232,135,169,0.25)]">
        <div className="max-w-2xl space-y-2.5 sm:space-y-3">
          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 rounded-full bg-[#FDE8EF] border border-[#F4B8CD] text-[11px] sm:text-xs font-bold text-[#D8658E] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E887A9]" />
              Exclusive 18+ VIP Directory
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] sm:text-xs font-bold text-emerald-700 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Genuine &amp; Verified Profiles
            </span>
          </div>

          {/* Main Headline outside image with Typewriter effect without layout shifting */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#221526] leading-tight">
            {selectedCity === "bangalore" ? (
              <TypewriterText
                key="bangalore"
                text="Bangalore Elite Escorts & High-Class Models"
                highlights={[{ word: "Elite Escorts", className: "text-[#D8658E]" }]}
                cursorColor="text-[#D8658E]"
              />
            ) : selectedCity === "pune" ? (
              <TypewriterText
                key="pune"
                text="Pune VIP Escorts & Exclusive Companions"
                highlights={[{ word: "VIP Escorts", className: "text-[#8B5CF6]" }]}
                cursorColor="text-[#8B5CF6]"
              />
            ) : selectedCity === "goa" ? (
              <TypewriterText
                key="goa"
                text="Goa VIP Escorts & Beachside Luxury Companions"
                highlights={[{ word: "VIP Escorts", className: "text-[#059669]" }]}
                cursorColor="text-[#059669]"
              />
            ) : (
              <TypewriterText
                key="default"
                text="Luxury Adult Companionship in Bangalore, Pune & Goa"
                highlights={[
                  { word: "Bangalore", className: "text-[#D8658E]" },
                  { word: "Pune", className: "text-[#8B5CF6]" },
                  { word: "Goa", className: "text-[#059669]" },
                ]}
                cursorColor="text-[#D8658E]"
              />
            )}
          </h1>

          {/* Subheading: Responsive text sizing */}
          <p className="text-xs sm:text-sm md:text-base text-[#915F6d] leading-relaxed font-semibold max-w-3xl">
            Discover exquisite independent adult models, college beauties, air hostesses, and high-profile VIP escorts.
            Discreet, confidential, and tailor-made for unforgettable evenings in premier 5-star hotels and luxury suites.
          </p>
        </div>
      </div>

      {/* 2. BANNER IMAGE: Responsive on Mobile, iPad Air, iPad Pro, and Desktop */}
      <div className="animate-card-enter delay-150 relative w-full rounded-3xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(232,135,169,0.3)] border-2 border-[#F4B8CD]/60 bg-[#1D1121] group">
        <div className="relative w-full h-[200px] sm:h-[280px] md:h-[340px] lg:h-[400px] xl:h-[440px]">
          <Image
            src="/images/nightlife-banner.png"
            alt="Neon Nightlife Street Scene - Naughty Mulaqat"
            fill
            priority
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 90vw, (max-width: 1280px) 85vw, 1280px"
          />

          {/* Soft atmospheric ambient edge vignette to frame the artwork */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
