"use client";

import { useState, useEffect, useMemo } from "react";

/**
 * TypewriterText Component
 * Provides a smooth typewriter effect that types out, pauses, erases, pauses, and loops.
 * Prevents any Cumulative Layout Shift (CLS) or jumping of surrounding components
 * by using an invisible ghost element that locks in the exact dimensions (height & width).
 *
 * @param {string} text - The full string to type out.
 * @param {Array<{word: string, className: string}>} highlights - Optional words to highlight with specific colors/styles.
 * @param {number} typingSpeed - Delay in ms per character when typing (default 65ms).
 * @param {number} eraseSpeed - Delay in ms per character when erasing (default 35ms).
 * @param {number} pauseDelay - Delay in ms to wait when full sentence is typed (default 2400ms).
 * @param {number} resumeDelay - Delay in ms to wait when fully erased before typing again (default 500ms).
 * @param {string} cursorColor - Tailwind color class for the blinking cursor (default "text-[#D8658E]").
 * @param {string} className - Additional CSS classes.
 */
export default function TypewriterText({
  text = "",
  highlights = [],
  typingSpeed = 65,
  eraseSpeed = 35,
  pauseDelay = 2400,
  resumeDelay = 500,
  cursorColor = "text-[#D8658E]",
  className = "",
}) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (!isDeleting) {
      // Typing phase
      if (displayedLength < text.length) {
        timer = setTimeout(() => {
          setDisplayedLength((prev) => prev + 1);
        }, typingSpeed);
      } else {
        // Finished typing full text, pause before erasing
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    } else {
      // Erasing phase
      if (displayedLength > 0) {
        timer = setTimeout(() => {
          setDisplayedLength((prev) => prev - 1);
        }, eraseSpeed);
      } else {
        // Finished erasing, pause before retyping
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, resumeDelay);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedLength, isDeleting, text, typingSpeed, eraseSpeed, pauseDelay, resumeDelay]);

  // Helper to slice text and apply highlights to matching character ranges
  const renderStyledText = (targetLength, isGhost = false) => {
    const currentSubstr = text.slice(0, targetLength);

    if (!highlights || highlights.length === 0) {
      return currentSubstr;
    }

    // Identify highlight spans with character start/end ranges
    const spans = [];
    let remainingText = text;
    let searchOffset = 0;

    // Collect all highlight occurrences in the original text
    const matchedRanges = [];
    highlights.forEach(({ word, className: highlightClass }) => {
      let startIndex = text.indexOf(word);
      while (startIndex !== -1) {
        matchedRanges.push({
          start: startIndex,
          end: startIndex + word.length,
          className: highlightClass,
        });
        startIndex = text.indexOf(word, startIndex + word.length);
      }
    });

    // Sort ranges by start position
    matchedRanges.sort((a, b) => a.start - b.start);

    // Build segments for currentSubstr
    let cursor = 0;
    matchedRanges.forEach((range, idx) => {
      // Normal text before this highlight
      if (range.start > cursor && cursor < targetLength) {
        const segEnd = Math.min(range.start, targetLength);
        spans.push(
          <span key={`plain-${cursor}-${idx}`}>
            {text.slice(cursor, segEnd)}
          </span>
        );
        cursor = segEnd;
      }

      // Highlighted text
      if (cursor >= range.start && cursor < range.end && cursor < targetLength) {
        const segEnd = Math.min(range.end, targetLength);
        spans.push(
          <span key={`hl-${cursor}-${idx}`} className={range.className}>
            {text.slice(cursor, segEnd)}
          </span>
        );
        cursor = segEnd;
      }
    });

    // Any trailing normal text
    if (cursor < targetLength) {
      spans.push(
        <span key={`plain-end-${cursor}`}>
          {text.slice(cursor, targetLength)}
        </span>
      );
    }

    return spans;
  };

  return (
    <span
      suppressHydrationWarning
      className={`inline-grid align-top text-left ${className}`}
      style={{ gridTemplateColumns: "1fr" }}
      aria-label={text}
    >
      {/* GHOST ELEMENT:
          Occupies the exact same grid cell with visibility: hidden.
          This guarantees the container NEVER shrinks, collapses, or changes height
          as letters type or erase, completely preventing any layout shifts! */}
      <span
        className="invisible select-none pointer-events-none"
        style={{ gridArea: "1 / 1 / 2 / 2" }}
        aria-hidden="true"
      >
        {renderStyledText(text.length, true)}
        <span className="inline-block opacity-0 font-normal ml-0.5">|</span>
      </span>

      {/* VISIBLE TYPEWRITER TEXT:
          Overlaid in the exact same grid cell. */}
      <span
        style={{ gridArea: "1 / 1 / 2 / 2" }}
        className="inline-block"
      >
        {renderStyledText(displayedLength)}
        <span
          className={`inline-block font-normal ml-0.5 animate-pulse ${cursorColor}`}
          aria-hidden="true"
        >
          |
        </span>
      </span>
    </span>
  );
}
