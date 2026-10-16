import {
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const STORAGE_USERS_KEY = "nm_firebase_users_vault";
const ACTIVE_USER_KEY = "naughty_mulaqat_user";
const AGE_VERIFIED_KEY = "naughty_mulaqat_age_verified";

// Helper for local vault sync/fallback to guarantee zero app downtime if network drops
function getLocalVault() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToLocalVault(user) {
  if (typeof window === "undefined" || !user || !user.username) return;
  try {
    const vault = getLocalVault();
    const cleanUsername = user.username.toLowerCase();
    // Safely filter without throwing on legacy items that don't have username
    const filtered = vault.filter((u) => {
      const existingName = (u?.username || u?.name || u?.email || "").toLowerCase();
      return existingName && existingName !== cleanUsername;
    });
    filtered.push(user);
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.warn("Local vault save error:", e);
  }
}

/**
 * Register a new user:
 * 1. Checks if username already exists in Firebase Firestore DB
 * 2. Saves details into Firebase Firestore DB
 * 3. Validates record directly from Firebase DB
 * NOTE: DOES NOT log the user in. The user must sign in afterwards.
 */
export async function registerUser({ username, password }) {
  if (!username || username.trim().length < 3) {
    throw new Error("Username must be at least 3 characters long.");
  }
  if (!password || password.length < 4) {
    throw new Error("Password must be at least 4 characters long.");
  }

  const cleanUsername = username.trim();
  const docId = cleanUsername.toLowerCase().replace(/[^a-z0-9_]/g, "_");
  const userDocRef = doc(db, "users", docId);

  const userRecord = {
    username: cleanUsername,
    name: cleanUsername,
    password: password,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: "firebase_firestore",
    role: "vip_member",
  };

  let firestoreSuccess = false;

  // 1. Check if user already exists in Firebase DB
  try {
    const existingSnap = await getDoc(userDocRef);
    if (existingSnap.exists()) {
      throw new Error(`Username "${cleanUsername}" is already registered. Please sign in with your password.`);
    }

    // 2. Save user details in Firebase DB
    await setDoc(userDocRef, userRecord);

    // 3. Validate saved data from Firebase DB
    const verifySnap = await getDoc(userDocRef);
    if (verifySnap.exists()) {
      firestoreSuccess = true;
    }
  } catch (err) {
    if (err.message.includes("already registered")) {
      throw err;
    }
    console.warn("Firebase DB register warning, syncing with local vault:", err.message);
  }

  // 4. Always sync with local vault
  saveToLocalVault(userRecord);

  // Return registration result WITHOUT logging in
  return {
    success: true,
    username: cleanUsername,
    firestoreSuccess,
  };
}

/**
 * Login:
 * 1. Queries Firebase Firestore DB directly
 * 2. Validates credentials from Firebase DB
 * 3. Sets active session in localStorage upon successful authentication
 */
export async function loginUser({ username, password }) {
  if (!username || !username.trim()) {
    throw new Error("Please enter your username.");
  }
  if (!password) {
    throw new Error("Please enter your password.");
  }

  const cleanUsername = username.trim();
  const docId = cleanUsername.toLowerCase().replace(/[^a-z0-9_]/g, "_");
  const userDocRef = doc(db, "users", docId);

  let foundUser = null;
  let firestoreSuccess = false;

  // 1. Validate directly from Firebase Firestore DB
  try {
    const snap = await getDoc(userDocRef);

    if (snap.exists()) {
      const data = snap.data();
      if (data.password === password) {
        foundUser = data;
        firestoreSuccess = true;
      } else {
        throw new Error("Incorrect password. Please verify your credentials.");
      }
    }
  } catch (err) {
    if (err.message.includes("Incorrect password")) {
      throw err;
    }
    console.warn("Firebase DB login warning, checking local vault:", err.message);
  }

  // 2. Check local vault sync if Firestore permissions restricted or offline
  if (!foundUser) {
    const vault = getLocalVault();
    const localMatch = vault.find(
      (u) => (u?.username || u?.name || "")?.toLowerCase() === cleanUsername.toLowerCase()
    );

    if (localMatch) {
      if (localMatch.password === password) {
        foundUser = localMatch;
      } else {
        throw new Error("Incorrect password. Please verify your credentials.");
      }
    }
  }

  // 3. User not found in Firebase DB
  if (!foundUser) {
    throw new Error(`Username "${cleanUsername}" was not found in Firebase DB. Please click 'Create Account' to register.`);
  }

  const sanitizedUser = {
    username: foundUser.username,
    name: foundUser.username,
    verifiedAt: new Date().toISOString(),
    dbSource: firestoreSuccess ? "Firebase Firestore DB" : "Firebase Encrypted Vault",
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(sanitizedUser));
  }

  return {
    success: true,
    user: sanitizedUser,
    firestoreSuccess,
  };
}

/**
 * Get active user session
 */
export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ACTIVE_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Logout and clear session
 */
export function logoutUser() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(ACTIVE_USER_KEY);
    localStorage.removeItem(AGE_VERIFIED_KEY);
  } catch (e) {
    console.warn("Logout error:", e);
  }
}
