import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import {
  citiesData,
  categoriesData,
  ageRangesData,
  locationsData,
  profilesData
} from "../data/seedData";

export async function getCities() {
  try {
    const colRef = collection(db, "cities");
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      return { data, source: "firestore" };
    }
  } catch (err) {
    console.warn("Firestore cities fetch fallback:", err.message);
  }
  return { data: citiesData, source: "fallback" };
}

export async function getCategories() {
  try {
    const colRef = collection(db, "categories");
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      return { data, source: "firestore" };
    }
  } catch (err) {
    console.warn("Firestore categories fetch fallback:", err.message);
  }
  return { data: categoriesData, source: "fallback" };
}

export async function getAgeRanges() {
  try {
    const colRef = collection(db, "ageRanges");
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      return { data, source: "firestore" };
    }
  } catch (err) {
    console.warn("Firestore ageRanges fetch fallback:", err.message);
  }
  return { data: ageRangesData, source: "fallback" };
}

export async function getLocations(cityId = null) {
  try {
    const colRef = collection(db, "locations");
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      let data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      if (cityId) {
        data = data.filter((item) => item.cityId === cityId);
      }
      return { data, source: "firestore" };
    }
  } catch (err) {
    console.warn("Firestore locations fetch fallback:", err.message);
  }

  let data = locationsData;
  if (cityId) {
    data = data.filter((item) => item.cityId === cityId);
  }
  return { data, source: "fallback" };
}

export async function getProfiles({ city = "", category = "", ageRange = "", searchQuery = "" } = {}) {
  let list = [];
  let source = "fallback";

  try {
    const colRef = collection(db, "profiles");
    let q = colRef;

    if (city) {
      q = query(colRef, where("city", "==", city));
    }

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      source = "firestore";
    } else {
      list = profilesData;
    }
  } catch (err) {
    console.warn("Firestore profiles fetch fallback:", err.message);
    list = profilesData;
  }

  // Always normalize image path and ensure latest Pune & Bangalore numbers
  list = list.map((p) => {
    let phone = p.phone;
    let whatsapp = p.whatsapp;
    const cityLower = (p.city || "").toLowerCase();
    if (cityLower === "pune") {
      phone = "+91 70872 61010";
      whatsapp = "+917087261010";
    } else if (cityLower === "bangalore") {
      phone = "+91 91187 84045";
      whatsapp = "+919118784045";
    }
    return {
      ...p,
      phone,
      whatsapp,
      image: p.image ? p.image.replace("/images/models/", "/images/models-v2/") : p.image,
    };
  });

  // Filter in memory for responsiveness and full-text search
  let filtered = list;

  if (city) {
    filtered = filtered.filter((p) => p.city?.toLowerCase() === city.toLowerCase());
  }

  if (category && category !== "all") {
    filtered = filtered.filter(
      (p) =>
        p.categorySlug === category ||
        p.category?.toLowerCase() === category.toLowerCase()
    );
  }

  if (ageRange && ageRange !== "all") {
    const rangeObj = ageRangesData.find((r) => r.id === ageRange);
    if (rangeObj) {
      filtered = filtered.filter((p) => p.age >= rangeObj.min && p.age <= rangeObj.max);
    } else if (ageRange.includes("-")) {
      const [minStr, maxStr] = ageRange.split("-");
      const min = parseInt(minStr, 10);
      const max = parseInt(maxStr, 10);
      filtered = filtered.filter((p) => p.age >= min && p.age <= max);
    }
  }

  if (searchQuery && searchQuery.trim() !== "") {
    const qLower = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name?.toLowerCase().includes(qLower) ||
        p.location?.toLowerCase().includes(qLower) ||
        p.category?.toLowerCase().includes(qLower) ||
        p.bio?.toLowerCase().includes(qLower) ||
        p.services?.some((s) => s.toLowerCase().includes(qLower))
    );
  }

  return { data: filtered, source };
}

export async function getProfileById(id) {
  let profile = null;
  let source = "fallback";

  try {
    const docRef = doc(db, "profiles", id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      profile = { id: snap.id, ...snap.data() };
      source = "firestore";
    }
  } catch (err) {
    console.warn("Firestore getProfileById fallback:", err.message);
  }

  if (!profile) {
    profile = profilesData.find((p) => p.id === id) || null;
  }

  if (profile) {
    const cityLower = (profile.city || "").toLowerCase();
    if (cityLower === "pune") {
      profile.phone = "+91 70872 61010";
      profile.whatsapp = "+917087261010";
    } else if (cityLower === "bangalore") {
      profile.phone = "+91 91187 84045";
      profile.whatsapp = "+919118784045";
    }
    if (profile.image) {
      profile.image = profile.image.replace("/images/models/", "/images/models-v2/");
    }
  }

  return { data: profile, source };
}

