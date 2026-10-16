"use client";

import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import AgeVerificationModal from "./AgeVerificationModal";
import { getCurrentUser } from "../lib/authService";

export default function GatekeeperAuthFlow() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const existingUser = getCurrentUser();
    const isAgeVerified = localStorage.getItem("naughty_mulaqat_age_verified");

    if (!existingUser) {
      // Step 1: No user logged in yet -> Open Auth Modal
      setShowAuthModal(true);
      setShowAgeModal(false);
    } else if (!isAgeVerified) {
      // Step 2: User exists but hasn't verified age -> Open 18+ Modal
      setCurrentUser(existingUser);
      setShowAuthModal(false);
      setShowAgeModal(true);
    } else {
      // Already fully authenticated and age verified
      setCurrentUser(existingUser);
      setShowAuthModal(false);
      setShowAgeModal(false);
    }

    // Listen for custom logout/re-trigger events
    const handleAuthReset = () => {
      setShowAuthModal(true);
      setShowAgeModal(false);
      setCurrentUser(null);
    };

    window.addEventListener("nm_auth_reset", handleAuthReset);
    return () => window.removeEventListener("nm_auth_reset", handleAuthReset);
  }, []);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setShowAuthModal(false);

    // After success toast, open 18+ age verification window
    setTimeout(() => {
      setShowAgeModal(true);
    }, 450);
  };

  const handleAgeConfirm = () => {
    try {
      localStorage.setItem("naughty_mulaqat_age_verified", "true");
    } catch {
      // Ignore storage errors
    }
    setShowAgeModal(false);
  };

  if (!isMounted) return null;

  return (
    <>
      {/* 1. Register and Login Popup */}
      <AuthModal
        isOpen={showAuthModal}
        onSuccess={handleAuthSuccess}
      />

      {/* 2. 18+ Age Verification Window (opens after auth success) */}
      <AgeVerificationModal
        isOpen={showAgeModal}
        onConfirm={handleAgeConfirm}
        user={currentUser}
      />
    </>
  );
}
