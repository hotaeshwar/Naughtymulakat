import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import GatekeeperAuthFlow from "../components/GatekeeperAuthFlow";
import HeaderUserBadge from "../components/HeaderUserBadge";
import { ToastProvider } from "../components/ToastContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://naughtymulaqat.com"),
  title: "Naughty Mulaqat | Premium 18+ Adult Companion & Model Directory",
  description:
    "Exclusive, verified high-class independent models and VIP companions in Bangalore and Pune. Discreet, sensual, and unforgettable experiences.",
  icons: {
    icon: [
      { url: "/images/naughty-mulakat-infinity-logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/images/naughty-mulakat-infinity-logo.png",
    apple: "/images/naughty-mulakat-infinity-logo.png",
  },
  keywords: [
    "Bangalore escorts",
    "Pune escorts",
    "VIP companions Bangalore",
    "Independent models Pune",
    "Adult directory India",
    "Naughty Mulaqat",
  ],
  robots: "noindex, nofollow", // Standard for adult directories
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" href="/images/naughty-mulakat-infinity-logo.png" />
        <link rel="shortcut icon" type="image/png" href="/images/naughty-mulakat-infinity-logo.png" />
        <link rel="apple-touch-icon" href="/images/naughty-mulakat-infinity-logo.png" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#221526] selection:bg-[#F4B8CD] selection:text-[#221526]">
        <ToastProvider>
          {/* Authentication & 18+ Verification Gatekeeper Flow */}
          <GatekeeperAuthFlow />

        {/* TRANSPARENT HEADER: NAUGHTY MULAKAT INFINITY LOGO & USER BADGE */}
        <header className="w-full bg-transparent border-none py-4 sm:py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center transition-transform duration-300 hover:scale-[1.03]"
              aria-label="Naughty Mulaqat - Home"
            >
              <Image
                src="/images/naughty-mulakat-infinity-logo.png"
                alt="Naughty Mulaqat Infinity Logo"
                width={500}
                height={160}
                priority
                unoptimized
                className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto object-contain"
              />
            </Link>

            <HeaderUserBadge />
          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <main className="flex-1">{children}</main>

        {/* LUMINOUS LUXURY PASTEL FOOTER: HIGH CONTRAST & PERFECT LOGO VISIBILITY */}
        <footer className="w-full bg-gradient-to-b from-white via-[#FFFDFB] to-[#FDE8EF]/40 text-[#221526] border-t-2 border-[#F4B8CD]/70 shadow-[0_-15px_45px_-10px_rgba(232,135,169,0.18)] mt-20 pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-[#F4B8CD]/50 text-center md:text-left">
              {/* Brand & Identity */}
              <div className="flex flex-col items-center md:items-start">
                <div className="mb-4">
                  <Image
                    src="/images/naughty-mulakat-infinity-logo.png"
                    alt="Naughty Mulaqat Infinity Logo"
                    width={420}
                    height={140}
                    unoptimized
                    className="h-24 sm:h-28 md:h-32 w-auto object-contain"
                  />
                </div>
                <p className="text-sm text-[#915F6d] font-semibold leading-relaxed max-w-sm">
                  The premier destination for elite adult companionship and independent creator
                  introductions across Bangalore &amp; Pune. Unmatched luxury, discretion, and authenticity.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDE8EF] border border-[#F4B8CD] text-[#D8658E] text-xs font-bold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Verified 18+ Adult Directory
                </div>
              </div>

              {/* Supported Cities */}
              <div>
                <h4 className="font-serif text-xl font-extrabold text-[#221526] mb-4 tracking-wide flex items-center justify-center md:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D8658E]"></span>
                  Locations Catered
                </h4>
                <ul className="space-y-3 text-sm text-[#915F6d]">
                  <li className="p-3 rounded-2xl bg-white/90 border border-[#F4B8CD]/50 shadow-xs">
                    <span className="text-[#D8658E] font-bold block mb-1">Bangalore:</span>
                    <span className="text-xs text-[#915F6d] font-semibold">
                      Indiranagar, Koramangala, Whitefield, MG Road, HSR Layout, JP Nagar
                    </span>
                  </li>
                  <li className="p-3 rounded-2xl bg-white/90 border border-[#DDD6FE]/70 shadow-xs">
                    <span className="text-[#8B5CF6] font-bold block mb-1">Pune:</span>
                    <span className="text-xs text-[#915F6d] font-semibold">
                      Koregaon Park, Kalyani Nagar, Baner, Viman Nagar, Hinjewadi, Wakad
                    </span>
                  </li>
                </ul>
              </div>

              {/* Legal & Age Disclaimer */}
              <div>
                <div className="p-5 rounded-3xl bg-white/90 border border-[#F4B8CD]/60 shadow-xs text-left">
                  <h4 className="font-serif text-lg font-bold text-[#221526] mb-2 tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    18+ Legal Notice &amp; Discretion
                  </h4>
                  <p className="text-xs text-[#915F6d] font-semibold leading-relaxed">
                    All advertised creators and models are guaranteed to be 18 years of age or older.
                    This platform acts purely as an advertising medium for consenting adults. Any
                    interaction or transaction takes place strictly between independent parties.
                    Please respect personal boundaries and practice safe meetings.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-[#915F6d] gap-4">
              <p className="font-semibold">© 2026 Naughty Mulaqat. All rights reserved. Strictly 18+ Adults Only.</p>
              <div className="flex items-center gap-6">
                <span className="hover:text-[#D8658E] transition-colors">Bangalore &amp; Pune Exclusive</span>
                <span className="w-1 h-1 rounded-full bg-[#D8658E]"></span>
                <span className="hover:text-[#8B5CF6] transition-colors">Discreet &amp; Verified</span>
              </div>
            </div>
          </div>
        </footer>
        </ToastProvider>
      </body>
    </html>
  );
}
