"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import HeroBanner from "../components/HeroBanner";
import SearchFilterBar from "../components/SearchFilterBar";
import CitySelectorPrompt from "../components/CitySelectorPrompt";
import ModelCard from "../components/ModelCard";
import ModelDetailModal from "../components/ModelDetailModal";
import {
  getCities,
  getCategories,
  getAgeRanges,
  getProfiles,
  getLocations,
} from "../lib/firestoreService";
import {
  citiesData,
  categoriesData,
  ageRangesData,
} from "../data/seedData";
import { Sparkles, MapPin, SlidersHorizontal, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../components/ToastContext";

export default function HomePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [cities, setCities] = useState(citiesData);
  const [categories, setCategories] = useState(categoriesData);
  const [ageRanges, setAgeRanges] = useState(ageRangesData);
  const [locations, setLocations] = useState([]);

  // Filter states
  // STRICT RULE: No city selected by default
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Profiles & UI states
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [dataSource, setDataSource] = useState("firestore");

  // Welcome toast on initial visit
  useEffect(() => {
    const welcomed = sessionStorage.getItem("nm_welcomed");
    if (!welcomed) {
      toast.info("Welcome to Naughty Mulaqat. Bangalore, Pune & Goa verified 18+ directory.");
      sessionStorage.setItem("nm_welcomed", "true");
    }
  }, [toast]);

  // Load initial filter datasets
  useEffect(() => {
    async function loadInitialData() {
      const [citiesRes, catRes, ageRes] = await Promise.all([
        getCities(),
        getCategories(),
        getAgeRanges(),
      ]);
      setCities(citiesRes.data || []);
      setCategories(catRes.data || []);
      setAgeRanges(ageRes.data || []);
    }
    loadInitialData();
  }, []);

  // When city changes, load city-specific locations and profiles
  useEffect(() => {
    if (!selectedCity) {
      setProfiles([]);
      setLocations([]);
      return;
    }

    async function loadCityData() {
      setIsLoading(true);
      try {
        const [profRes, locRes] = await Promise.all([
          getProfiles({
            city: selectedCity,
            category: selectedCategory,
            ageRange: selectedAge,
            searchQuery: searchQuery,
          }),
          getLocations(selectedCity),
        ]);
        setProfiles(profRes.data || []);
        setLocations(locRes.data || []);
        setDataSource(profRes.source);
      } catch (err) {
        console.error("Error loading profiles:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCityData();
  }, [selectedCity, selectedCategory, selectedAge, searchQuery]);

  // Client-side quick filter by localized area tag
  const displayedProfiles = useMemo(() => {
    if (!selectedLocation || selectedLocation === "all") return profiles;
    return profiles.filter(
      (p) => p.location?.toLowerCase() === selectedLocation.toLowerCase()
    );
  }, [profiles, selectedLocation]);

  const handleCitySelect = (city) => {
    if (!city) {
      setSelectedCity("");
      return;
    }
    const cleanCity = city.toLowerCase();
    if (cleanCity === "bangalore" || cleanCity === "pune" || cleanCity === "goa") {
      const displayCity = cleanCity === "bangalore" ? "Bangalore" : cleanCity === "pune" ? "Pune" : "Goa";
      toast.success(`Opening ${displayCity} directory...`);
      router.push(`/${cleanCity}`);
    } else {
      setSelectedCity(city);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const trimmed = query.trim().toLowerCase();
    if (trimmed === "pune") {
      toast.success("Routing to /pune...");
      router.push("/pune");
    } else if (trimmed === "bangalore") {
      toast.success("Routing to /bangalore...");
      router.push("/bangalore");
    } else if (trimmed === "goa") {
      toast.success("Routing to /goa...");
      router.push("/goa");
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedAge("all");
    setSelectedLocation("all");
    setSearchQuery("");
    toast.info("All filters reset to default");
  };

  return (
    <div className="w-full min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Neon Nightlife Street Scene Banner (ABOVE SEARCH SECTION) */}
      <HeroBanner
        selectedCity={selectedCity}
        onSelectCity={handleCitySelect}
      />

      {/* 2. Firebase-powered City, Age and Category Dropdowns with Search */}
      <SearchFilterBar
        cities={cities}
        categories={categories}
        ageRanges={ageRanges}
        selectedCity={selectedCity}
        selectedCategory={selectedCategory}
        selectedAge={selectedAge}
        searchQuery={searchQuery}
        onCityChange={handleCitySelect}
        onCategoryChange={setSelectedCategory}
        onAgeChange={setSelectedAge}
        onSearchChange={handleSearchChange}
        onReset={handleResetFilters}
        totalResults={displayedProfiles.length}
      />

      {/* 3. STRICT RULE: Display city-specific content ONLY after selection */}
      {!selectedCity ? (
        <CitySelectorPrompt onSelectCity={handleCitySelect} />
      ) : (
        <section className="space-y-6">
          {/* City Heading & Location Filter Chips */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-3xl bg-white/70 backdrop-blur-md border border-[#F4B8CD]/50 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#D8658E]">
                  Verified Directory
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#221526] mt-1">
                {selectedCity === "bangalore"
                  ? "Bangalore Escorts & Models"
                  : selectedCity === "pune"
                  ? "Pune VIP Companions"
                  : "Goa VIP Companions & Escorts"}
              </h2>
              <p className="text-xs sm:text-sm text-[#915F6d] font-semibold">
                Showing {displayedProfiles.length} active models in{" "}
                <span className="font-bold text-[#221526]">
                  {selectedCity === "bangalore"
                    ? "Bangalore"
                    : selectedCity === "pune"
                    ? "Pune"
                    : "Goa"}
                </span>
              </p>
            </div>

            {/* Popular Areas in City */}
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
                  {locations.slice(0, 6).map((loc) => (
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

          {/* Loading Skeleton */}
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
            /* Empty State */
            <div className="text-center py-16 px-4 rounded-3xl bg-white/80 border-2 border-[#F4B8CD]/50 max-w-lg mx-auto shadow-md">
              <AlertCircle className="w-12 h-12 text-[#E887A9] mx-auto mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#221526] mb-2">
                No profiles match your filters
              </h3>
              <p className="text-sm text-[#915F6d] font-semibold mb-6">
                Try widening your category, age or search term to see more models in{" "}
                {selectedCity === "bangalore" ? "Bangalore" : "Pune"}.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E887A9] to-[#8B5CF6] text-white text-xs font-bold shadow-md hover:opacity-90 transition-opacity cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Responsive Grid of Glowing Model Cards: Mobile, iPad Mini, iPad Air, iPad Pro, iPad Max & Desktop */
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
      )}

      {/* Model Detail Modal */}
      <ModelDetailModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
}
