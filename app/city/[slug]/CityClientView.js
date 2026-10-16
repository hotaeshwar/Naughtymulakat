"use client";

import { useState, useEffect, useMemo } from "react";
import HeroBanner from "../../../components/HeroBanner";
import SearchFilterBar from "../../../components/SearchFilterBar";
import ModelCard from "../../../components/ModelCard";
import ModelDetailModal from "../../../components/ModelDetailModal";
import {
  getCities,
  getCategories,
  getAgeRanges,
  getProfiles,
  getLocations,
} from "../../../lib/firestoreService";
import {
  citiesData,
  categoriesData,
  ageRangesData,
} from "../../../data/seedData";
import { MapPin, ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useToast } from "../../../components/ToastContext";

export default function CityClientView({ initialCity, cityInfo }) {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [cities, setCities] = useState(citiesData);
  const [categories, setCategories] = useState(categoriesData);
  const [ageRanges, setAgeRanges] = useState(ageRangesData);
  const [locations, setLocations] = useState([]);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [citiesRes, catRes, ageRes, profRes, locRes] = await Promise.all([
          getCities(),
          getCategories(),
          getAgeRanges(),
          getProfiles({
            city: selectedCity,
            category: selectedCategory,
            ageRange: selectedAge,
            searchQuery: searchQuery,
          }),
          getLocations(selectedCity),
        ]);

        setCities(citiesRes.data || []);
        setCategories(catRes.data || []);
        setAgeRanges(ageRes.data || []);
        setProfiles(profRes.data || []);
        setLocations(locRes.data || []);
      } catch (err) {
        console.error("Error loading city data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [selectedCity, selectedCategory, selectedAge, searchQuery]);

  const displayedProfiles = useMemo(() => {
    if (!selectedLocation || selectedLocation === "all") return profiles;
    return profiles.filter(
      (p) => p.location?.toLowerCase() === selectedLocation.toLowerCase()
    );
  }, [profiles, selectedLocation]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedAge("all");
    setSelectedLocation("all");
    setSearchQuery("");
    toast.info("Filters have been reset");
  };

  return (
    <div className="w-full min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back button */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-[#F4B8CD]/50 text-xs font-semibold text-[#915F6d] hover:text-[#D8658E] hover:bg-white transition-all shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Directory Home
        </Link>
      </div>

      {/* Banner */}
      <HeroBanner
        selectedCity={selectedCity}
        onSelectCity={(city) => {
          if (city) router.push(`/${city.toLowerCase()}`);
        }}
      />

      {/* Filter Bar */}
      <SearchFilterBar
        cities={cities}
        categories={categories}
        ageRanges={ageRanges}
        selectedCity={selectedCity}
        selectedCategory={selectedCategory}
        selectedAge={selectedAge}
        searchQuery={searchQuery}
        onCityChange={(city) => {
          if (!city) {
            router.push("/");
            return;
          }
          const clean = city.toLowerCase();
          if (clean === "bangalore" || clean === "pune") {
            toast.success(`Routing to /${clean}...`);
            router.push(`/${clean}`);
          }
        }}
        onCategoryChange={setSelectedCategory}
        onAgeChange={setSelectedAge}
        onSearchChange={(query) => {
          setSearchQuery(query);
          const trimmed = query.trim().toLowerCase();
          if (trimmed === "pune" && selectedCity !== "pune") {
            toast.success("Routing to /pune...");
            router.push("/pune");
          } else if (trimmed === "bangalore" && selectedCity !== "bangalore") {
            toast.success("Routing to /bangalore...");
            router.push("/bangalore");
          }
        }}
        onReset={handleResetFilters}
        totalResults={displayedProfiles.length}
      />

      {/* City Content Section */}
      <section className="space-y-6">
        <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-[#F4B8CD]/60 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#D8658E]">
                {cityInfo?.state} • Verified 18+ Adult Listings
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#221526]">
              {cityInfo?.name} Escorts &amp; VIP Companions
            </h1>
            <p className="text-xs sm:text-sm text-[#915F6d] font-semibold mt-1 max-w-2xl leading-relaxed">
              {cityInfo?.description}
            </p>
          </div>

          {/* Area filters */}
          {locations.length > 0 && (
            <div className="w-full md:w-auto">
              <span className="text-[11px] font-bold text-[#915F6d] uppercase tracking-wider block mb-2">
                Filter by Area:
              </span>
              <div className="flex flex-wrap gap-1.5 max-w-xl">
                <button
                  type="button"
                  onClick={() => setSelectedLocation("all")}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedLocation === "all"
                      ? "bg-[#D8658E] text-white shadow-xs"
                      : "bg-[#FAF7F5] text-[#915F6d] hover:bg-[#FDE8EF] border border-[#F4B8CD]/40"
                  }`}
                >
                  All Areas
                </button>
                {locations.slice(0, 7).map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocation(loc.name)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedLocation.toLowerCase() === loc.name.toLowerCase()
                        ? "bg-[#D8658E] text-white shadow-xs"
                        : "bg-[#FAF7F5] text-[#915F6d] hover:bg-[#FDE8EF] border border-[#F4B8CD]/40"
                    }`}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 pt-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white/70 border-2 border-[#F4B8CD]/40 p-5 animate-pulse space-y-4 h-[490px] shadow-sm"
              >
                <div className="w-full aspect-[4/5] bg-[#FDE8EF]/60 rounded-2xl" />
                <div className="h-6 bg-[#FDE8EF] rounded-md w-3/4" />
                <div className="h-4 bg-[#FDE8EF]/50 rounded-md w-1/2" />
                <div className="h-10 bg-[#FDE8EF]/40 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : displayedProfiles.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-white/80 border-2 border-[#F4B8CD]/50 max-w-lg mx-auto shadow-md">
            <AlertCircle className="w-12 h-12 text-[#E887A9] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#221526] mb-2">
              No profiles match your filters
            </h3>
            <p className="text-sm text-[#915F6d] font-semibold mb-6">
              Try adjusting your category, age or search filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E887A9] to-[#8B5CF6] text-white text-xs font-bold shadow-md hover:opacity-90 transition-opacity cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 pt-2">
            {displayedProfiles.map((profile, index) => (
              <ModelCard
                key={profile.id}
                profile={profile}
                index={index}
                onSelectProfile={setSelectedProfile}
              />
            ))}
          </div>
        )}
      </section>

      {/* Model Detail Modal */}
      <ModelDetailModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
}
