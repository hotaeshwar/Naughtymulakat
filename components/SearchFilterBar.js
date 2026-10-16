"use client";

import {
  Search,
  MapPin,
  Sparkles,
  Filter,
  RotateCcw,
  Calendar,
  Layers,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export default function SearchFilterBar({
  cities = [],
  categories = [],
  ageRanges = [],
  selectedCity,
  selectedCategory,
  selectedAge,
  searchQuery,
  onCityChange,
  onCategoryChange,
  onAgeChange,
  onSearchChange,
  onReset,
  totalResults = 0,
}) {
  return (
    <div className="animate-card-enter delay-75 w-full rounded-3xl p-4 sm:p-6 md:p-7 lg:p-8 bg-white/90 backdrop-blur-2xl border-2 border-[#F4B8CD]/60 shadow-[0_15px_45px_-10px_rgba(232,135,169,0.22)] mb-6 sm:mb-8 md:mb-10 transition-all">
      {/* Top Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 mb-6 border-b border-[#F4B8CD]/30 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E887A9] to-[#8B5CF6] flex items-center justify-center text-white shadow-md shadow-[#E887A9]/30 flex-shrink-0">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#221526]">
                Explore Verified Models &amp; Companions
              </h2>
              {selectedCity && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Live
                </span>
              )}
            </div>
            {selectedCity && (
              <div className="text-xs sm:text-sm text-[#915F6d] font-semibold mt-1">
                Showing profiles in{" "}
                <strong className="text-[#D8658E]">
                  {selectedCity === "bangalore" ? "Bangalore" : "Pune"}
                </strong>{" "}
                ({totalResults} verified matches found)
              </div>
            )}
          </div>
        </div>

        {/* Reset button */}
        {(selectedCity || selectedCategory !== "all" || selectedAge !== "all" || searchQuery) && (
          <button
            id="btn-reset-filters"
            onClick={onReset}
            suppressHydrationWarning
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FDE8EF] to-[#FAF7F5] hover:from-[#FDE8EF] hover:to-[#F4B8CD]/30 text-[#D8658E] text-xs font-bold border border-[#F4B8CD] shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid of Revamped Dropdowns & Search Input - Calm, Non-Animated & Luxury Styled */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* 1. City Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="filter-city"
            className="block text-xs font-bold text-[#915F6d] uppercase tracking-wider flex items-center gap-1.5"
          >
            <span className="w-5 h-5 rounded-md bg-[#FDE8EF] flex items-center justify-center text-[#D8658E]">
              <MapPin className="w-3 h-3" />
            </span>
            Select City <span className="text-[#D8658E]">*</span>
          </label>
          <div className="relative">
            <select
              id="filter-city"
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              suppressHydrationWarning
              className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all duration-200 appearance-none cursor-pointer focus:outline-none focus:ring-2 ${
                !selectedCity
                  ? "bg-white border-[#F4B8CD] text-[#915F6d] focus:ring-[#E887A9]/30 focus:border-[#E887A9] shadow-xs hover:border-[#E887A9]"
                  : "bg-white border-[#E887A9] text-[#221526] font-semibold focus:ring-[#E887A9]/30 focus:border-[#E887A9] shadow-xs"
              }`}
            >
              <option value="">-- Choose City (Bangalore / Pune) --</option>
              {cities && cities.length > 0 ? (
                cities.map((c) => (
                  <option key={c.id || c.slug} value={c.slug || c.id}>
                    {c.name} {c.state ? `(${c.state})` : ""}
                  </option>
                ))
              ) : (
                <>
                  <option value="bangalore">Bangalore (Karnataka)</option>
                  <option value="pune">Pune (Maharashtra)</option>
                </>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
              <ChevronDown className="w-4 h-4 text-[#D8658E]" />
            </div>
          </div>
        </div>

        {/* 2. Category Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="filter-category"
            className="block text-xs font-bold text-[#915F6d] uppercase tracking-wider flex items-center gap-1.5"
          >
            <span className="w-5 h-5 rounded-md bg-[#F3EFFF] flex items-center justify-center text-[#8B5CF6]">
              <Layers className="w-3 h-3" />
            </span>
            Category
          </label>
          <div className="relative">
            <select
              id="filter-category"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              disabled={!selectedCity}
              suppressHydrationWarning
              className="w-full px-4 py-3 rounded-2xl border border-[#DDD6FE] bg-white text-sm font-medium text-[#221526] transition-all duration-200 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30 focus:border-[#8B5CF6] hover:border-[#A78BFA] shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug || cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
              <ChevronDown className="w-4 h-4 text-[#8B5CF6]" />
            </div>
          </div>
        </div>

        {/* 3. Age Range Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="filter-age"
            className="block text-xs font-bold text-[#915F6d] uppercase tracking-wider flex items-center gap-1.5"
          >
            <span className="w-5 h-5 rounded-md bg-[#FDE8EF] flex items-center justify-center text-[#D8658E]">
              <Calendar className="w-3 h-3" />
            </span>
            Age Range
          </label>
          <div className="relative">
            <select
              id="filter-age"
              value={selectedAge}
              onChange={(e) => onAgeChange(e.target.value)}
              disabled={!selectedCity}
              suppressHydrationWarning
              className="w-full px-4 py-3 rounded-2xl border border-[#F4B8CD] bg-white text-sm font-medium text-[#221526] transition-all duration-200 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E887A9]/30 focus:border-[#E887A9] hover:border-[#E887A9] shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="all">All Ages (18 - 35)</option>
              {ageRanges.map((age) => (
                <option key={age.id} value={age.id}>
                  {age.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
              <ChevronDown className="w-4 h-4 text-[#D8658E]" />
            </div>
          </div>
        </div>

        {/* 4. Full Search Query */}
        <div className="space-y-1.5">
          <label
            htmlFor="filter-search"
            className="block text-xs font-bold text-[#915F6d] uppercase tracking-wider flex items-center gap-1.5"
          >
            <span className="w-5 h-5 rounded-md bg-[#F3EFFF] flex items-center justify-center text-[#8B5CF6]">
              <Search className="w-3 h-3" />
            </span>
            Search Keyword
          </label>
          <div className="relative">
            <input
              id="filter-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              disabled={!selectedCity}
              suppressHydrationWarning
              placeholder={
                selectedCity === "bangalore"
                  ? "e.g. Indiranagar, Aaradhya, VIP..."
                  : selectedCity === "pune"
                  ? "e.g. Koregaon Park, Baner..."
                  : "Type 'Bangalore' or 'Pune' to explore..."
              }
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#DDD6FE] bg-white text-sm text-[#221526] font-medium placeholder-[#915F6d]/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30 focus:border-[#8B5CF6] hover:border-[#A78BFA] shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
            />
            <Search className="w-4 h-4 text-[#A78BFA] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
