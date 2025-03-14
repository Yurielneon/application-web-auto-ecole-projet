"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [particlePositions, setParticlePositions] = useState([]);
  const isInscriptionPage = pathname.startsWith("/inscription");


  // Generate random positions for particles on the client side
  useEffect(() => {
    const positions = Array.from({ length: 6 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setParticlePositions(positions);
  }, []);

  const theme = {
    light: {
      primary: '#e0e7ff',
      secondary: '#c7d2fe',
      accent: '#a5b4fc',
      bg: 'rgba(224, 231, 255, 0.15)'
    },
    dark: {
      primary: '#4f46e5',
      secondary: '#6366f1',
      accent: '#818cf8',
      bg: 'rgba(30, 27, 75, 0.25)'
    }
  };

  useEffect(() => {

  }
  ,[])

  return (
    <motion.header
      className="fixed w-full top-0 z-50 backdrop-blur-2xl"
      style={{
        background: `linear-gradient(45deg, ${theme[darkMode ? 'dark' : 'light'].bg}, ${theme[darkMode ? 'dark' : 'light'].bg})`,
        boxShadow: `0 0 32px ${darkMode ? '#3730a370' : '#818cf850'}`
      }}
    >
      {/* Effet de particules lumineuses */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <nav className="relative container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo amélioré */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative p-2 rounded-full backdrop-blur-lg"
              style={{
                background: `radial-gradient(circle, ${theme[darkMode ? 'dark' : 'light'].primary}30, transparent)`
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-white"
                style={{
                  filter: `drop-shadow(0 0 8px ${theme[darkMode ? 'dark' : 'light'].accent})`
                }}
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L12 14.17 8.12 10.3a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 1 0-1.41-1.41z"
                />
              </svg>
            </motion.div>
            <motion.span 
              className="text-xl font-black bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(45deg, ${theme[darkMode ? 'dark' : 'light'].primary}, ${theme[darkMode ? 'dark' : 'light'].secondary})`,
                textShadow: `0 0 12px ${theme[darkMode ? 'dark' : 'light'].accent}80`
              }}
            >
              DriveVision
            </motion.span>
          </Link>

          {/* Navigation desktop améliorée */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Accueil", path: "/"},
              { name: "Inscription", path: "/#formations"},
              { name: "Espace", path: "/espace/cours"},
              { name: "Notification", path: "/contact"}
            ].map((link) => (
              
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 group flex items-center space-x-2 ${
                  pathname === link.path || (link.path === "/inscription" && isInscriptionPage)
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                } transition-all duration-300`}
              >
                <motion.span 
                  className="text-xl"
                  whileHover={{ scale: 1.2 }}
                >
                  {link.emoji}
                </motion.span>
                <motion.span 
                  className="font-bold text-sm uppercase tracking-wider"
                  style={{
                    textShadow: pathname === link.path 
                      ? `0 0 10px ${theme[darkMode ? 'dark' : 'light'].accent}` 
                      : 'none'
                  }}
                >
                  {link.name}
                </motion.span>
                {pathname === link.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                    layoutId="underline"
                    style={{
                      boxShadow: `0 0 8px ${theme[darkMode ? 'dark' : 'light'].accent}`
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Contrôles améliorés */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all"
              style={{
                boxShadow: `0 0 12px ${darkMode ? '#4f46e550' : '#e0e7ff50'}`
              }}
            >
              {darkMode ? (
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              )}
            </motion.button>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-lg bg-black/20 backdrop-blur-lg border border-white/10"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Menu mobile amélioré */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute w-full backdrop-blur-2xl bg-black/80 border-b border-white/10"
            style={{
              boxShadow: `0 12px 32px ${darkMode ? '#3730a370' : '#818cf850'}`
            }}
          >
            <div className="px-4 py-6 space-y-4">
              {[
                { name: "Accueil", path: "/"},
                { name: "Inscription", path: "/inscription" },
                { name: "Espace", path: "/espace/cours"},
                { name: "Notification", path: "/notification"}
              ].map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span className="text-xl">{link.emoji}</span>
                    <span className="font-bold text-sm uppercase tracking-wider text-white">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;