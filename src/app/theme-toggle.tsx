"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  // Manage theme state
  const [theme, setTheme] = useState<string>("light");

  // Set the initial theme from localStorage or default to "light"
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  // Toggle theme and update localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
        theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-400"
      }`}
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 text-white-500" /> // Sun for dark mode
      ) : (
        <Moon className="w-6 h-6 text-gray-800" /> // Moon for light mode
      )}
    </button>
  );
}
