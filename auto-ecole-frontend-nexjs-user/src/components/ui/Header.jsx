"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Configuration du thème néon bleu-violet
  const theme = {
    light: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      bg: 'rgba(99, 102, 241, 0.1)'
    },
    dark: {
      primary: '#4f46e5',
      secondary: '#7c3aed',
      accent: '#db2777',
      bg: 'rgba(30, 27, 75, 0.2)'
    }
  };

  return (
    <motion.header
      className="fixed w-full top-0 z-50 backdrop-blur-xl"
      style={{
        background: `linear-gradient(45deg, ${theme[darkMode ? 'dark' : 'light'].primary}20, ${theme[darkMode ? 'dark' : 'light'].secondary}20)`,
        borderBottom: `1px solid ${theme[darkMode ? 'dark' : 'light'].primary}30`
      }}
    >
      {/* Effet d'aurore boréale */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#6366f1] via-transparent to-transparent opacity-20 animate-aurora" />
        <div className="absolute -top-40 -right-20 w-96 h-96 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#8b5cf6] via-transparent to-transparent opacity-20 animate-aurora delay-1000" />
      </div>

      <nav className="relative container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo personnalisé */}
          <Link href="/" className="flex items-center space-x-2 group">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-theme-t dark:text-theme-f"
              style={{ filter: `drop-shadow(0 0 8px ${theme[darkMode ? 'dark' : 'light'].primary}80)` }}
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L12 14.17 8.12 10.3a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 1 0-1.41-1.41z"
              />
            </svg>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              DriveVision
            </span>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Accueil", path: "/", emoji: "🚗" },
              { name: "Inscription", path: "/inscription", emoji: "📚" },
              { name: "Espace", path: "/espace/cours", emoji: "🎮" },
              { name: "Contact", path: "/contact", emoji: "📱" }
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 group flex items-center space-x-2 ${
                  pathname === link.path ? 'text-theme-t dark:text-theme-f' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <span className="text-xl">{link.emoji}</span>
                <span className="font-medium">{link.name}</span>
                {pathname === link.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500"
                    layoutId="underline"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Contrôles */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              {darkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-black/5 dark:bg-white/5"
            >
              <svg className="w-6 h-6 text-theme-t dark:text-theme-f" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute w-full backdrop-blur-2xl bg-white/95 dark:bg-gray-900/95 border-b border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {[
                { name: "Accueil", path: "/", emoji: "🚗" },
                { name: "Cours", path: "/cours", emoji: "📚" },
                { name: "Simulateur", path: "/simulateur", emoji: "🎮" },
                { name: "Contact", path: "/contact", emoji: "📱" }
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-indigo-500/10 transition-colors"
                >
                  <span className="text-xl">{link.emoji}</span>
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;