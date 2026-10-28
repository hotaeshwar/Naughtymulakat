"use client";

import { useState, useEffect } from "react";
import AgeVerificationModal from "./AgeVerificationModal";

export default function GatekeeperAuthFlow() {
  const [isMounted, setIsMounted] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const isAgeVerified = localStorage.getItem("naughty_mulaqat_age_verified");

    if (!isAgeVerified) {
      setShowAgeModal(true);
    }
  }, []);

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
    <AgeVerificationModal
      isOpen={showAgeModal}
      onConfirm={handleAgeConfirm}
    />
  );
}

