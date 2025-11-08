// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle(){
  const [theme, setTheme] = useState(localStorage.getItem('agro-theme') || 'dark');
  useEffect(()=> {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('agro-theme', theme);
  }, [theme]);
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
      className="btn"
      style={{ padding: '8px 10px', borderRadius: 10 }}
    >
      {theme === 'dark' ? <><FaSun /> Light</> : <><FaMoon /> Dark</>}
    </button>
  );
}
