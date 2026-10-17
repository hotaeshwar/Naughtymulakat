"use client";

import { MapPin, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import TypewriterText from "./TypewriterText";

export default function CitySelectorPrompt({ onSelectCity }) {
  return (
    <div className="w-full py-6 sm:py-8 md:py-10 text-center">
      {/* Title & Badge */}
      <div className="animate-card-enter max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#FDE8EF] border border-[#F4B8CD] text-[11px] sm:text-xs font-semibold text-[#D8658E] tracking-wider uppercase mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#E887A9]" />
          Choose Your Location
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-[#221526] tracking-tight mb-2.5 sm:mb-3">
          <TypewriterText
            text="Select Your City to View Verified Models"
            highlights={[
              { word: "Verified Models", className: "text-[#D8658E]" },
            ]}
          />
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#915F6d] font-semibold leading-relaxed max-w-xl mx-auto">
          In strict accordance with privacy and localized companionship services, models and adult listings
          are displayed exclusively after choosing your preferred city.
        </p>
      </div>

      {/* Three City Cards: Media responsive for Mobile, Tablet & Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-2 sm:px-4">
        {/* Bangalore Card - First staggered arrival */}
        <div
          onClick={() => onSelectCity("bangalore")}
          className="animate-card-enter delay-150 glass-card rounded-3xl p-5 sm:p-7 cursor-pointer relative overflow-hidden text-left group border border-[#F4B8CD]/60 bg-gradient-to-br from-white/95 to-[#FDE8EF]/40 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-[#E887A9] transition-all duration-300 flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-28 sm:w-32 h-28 sm:h-32 bg-[#F4B8CD]/30 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125" />

          <div>
            <div className="flex items-center justify-between mb-3.5 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E887A9]/15 text-[#D8658E] font-bold text-[11px] sm:text-xs tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-[#E887A9]" />
                Karnataka
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-[#E887A9] bg-white px-2.5 py-1 rounded-full shadow-xs border border-[#F4B8CD]/40">
                17 Profiles Available
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-[#221526] group-hover:text-[#D8658E] transition-colors mb-2">
              Bangalore Escorts
            </h3>

            <p className="text-xs sm:text-sm text-[#915F6d] font-semibold leading-relaxed mb-4">
              Indiranagar, Koramangala, Whitefield, MG Road, HSR Layout, JP Nagar &amp; Electronic City.
              Verified high-profile companions, IT executives&apos; favorites, and elite college models.
            </p>
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-[#F4B8CD]/30">
            <span className="text-[11px] sm:text-xs font-semibold text-[#915F6d] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              100% Discretion
            </span>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8658E] group-hover:translate-x-1.5 transition-transform duration-300">
              Explore Bangalore
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Pune Card - Second staggered arrival */}
        <div
          onClick={() => onSelectCity("pune")}
          className="animate-card-enter delay-300 glass-card rounded-3xl p-5 sm:p-7 cursor-pointer relative overflow-hidden text-left group border border-[#DDD6FE]/60 bg-gradient-to-br from-white/95 to-[#F3EFFF]/50 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-[#8B5CF6] transition-all duration-300 flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-28 sm:w-32 h-28 sm:h-32 bg-[#DDD6FE]/30 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125" />

          <div>
            <div className="flex items-center justify-between mb-3.5 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] font-bold text-[11px] sm:text-xs tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
                Maharashtra
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-[#8B5CF6] bg-white px-2.5 py-1 rounded-full shadow-xs border border-[#DDD6FE]/40">
                17 Profiles Available
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-[#221526] group-hover:text-[#8B5CF6] transition-colors mb-2">
              Pune Escorts
            </h3>

            <p className="text-xs sm:text-sm text-[#915F6d] font-semibold leading-relaxed mb-4">
              Koregaon Park, Kalyani Nagar, Baner, Viman Nagar, Hinjewadi &amp; Wakad.
              Sensual, sweet, cultured companions and glamorous fashion models.
            </p>
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-[#DDD6FE]/30">
            <span className="text-[11px] sm:text-xs font-semibold text-[#915F6d] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Direct WhatsApp
            </span>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B5CF6] group-hover:translate-x-1.5 transition-transform duration-300">
              Explore Pune
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Goa Card - Third staggered arrival */}
        <div
          onClick={() => onSelectCity("goa")}
          className="animate-card-enter delay-450 glass-card rounded-3xl p-5 sm:p-7 cursor-pointer relative overflow-hidden text-left group border border-[#A7F3D0]/70 bg-gradient-to-br from-white/95 to-[#ECFDF5]/60 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-[#10B981] transition-all duration-300 flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-28 sm:w-32 h-28 sm:h-32 bg-[#A7F3D0]/30 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125" />

          <div>
            <div className="flex items-center justify-between mb-3.5 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#059669] font-bold text-[11px] sm:text-xs tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-[#059669]" />
                Goa
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-[#059669] bg-white px-2.5 py-1 rounded-full shadow-xs border border-[#A7F3D0]/60">
                17 Profiles Available
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-[#221526] group-hover:text-[#059669] transition-colors mb-2">
              Goa Escorts
            </h3>

            <p className="text-xs sm:text-sm text-[#915F6d] font-semibold leading-relaxed mb-4">
              Calangute, Candolim, Baga, Panaji, Anjuna, Vagator &amp; Colva.
              Sensual beachside companions, luxury villa partners, and high-class vacation escorts.
            </p>
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-[#A7F3D0]/40">
            <span className="text-[11px] sm:text-xs font-semibold text-[#915F6d] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              100% Verified
            </span>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] group-hover:translate-x-1.5 transition-transform duration-300">
              Explore Goa
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
