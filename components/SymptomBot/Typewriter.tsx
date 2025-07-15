"use client"; 

import React, { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number; // ms per character
  pause?: number; // pause before restarting
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 50,
  pause = 2000,
}) => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayed("");
        setIndex(0);
      }, pause);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, pause]);

  return <span>{displayed}</span>;
};
