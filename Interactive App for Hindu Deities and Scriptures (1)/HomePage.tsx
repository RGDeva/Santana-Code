import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProtectedFeature from '../components/ProtectedFeature';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-cormorant text-sacred-gold mb-4">
          Santana Code
        </h1>
        <p className="text-xl text-off-white mb-6">
          Your immersive companion for exploring Sanatana Dharma
        </p>
        <p className="text-off-white opacity-80 max-w-3xl mx-auto">
          Discover ancient wisdom through Vedic astrology, sacred scriptures, deity connections,
          meditation practices, and personalized spiritual guidance.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Link
          to="/astrology"
          className="bg-gradient-to-r from-sacred-gold to-lotus-pink text-deep-indigo-900 font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
        >
          Explore Vedic Astrology
        </Link>
        <Link
          to="/quiz"
          className="border border-sacred-gold text-sacred-gold font-semibold py-3 px-6 rounded-lg hover:bg-sacred-gold hover:text-deep-indigo-900 transition-colors"
        >
          Discover Your Spiritual Path
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Vedic Astrology Calculator */}
        <motion.div
          className="bg-deep-indigo-800 bg-opacity-50 rounded-lg p-6 border border-sacred-gold border-opacity-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="w-12 h-12 bg-sacred-gold bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <span className="text-sacred-gold text-xl">⭐</span>
          </div>
          <h2 className="text-xl font-cormorant text-sacred-gold mb-2">
            Vedic Astrology Calculator
          </h2>
          <p className="text-off-white opacity-80 mb-4">
            Generate your birth chart with Lagna, Rashi, Nakshatra, planetary positions, and doshas.
          </p>
          <Link
            to="/astrology"
            className="inline-flex items-center text-sacred-gold hover:text-lotus-pink transition-colors"
          >
            Calculate Your Chart →
          </Link>
        </motion.div>

        {/* Daily Panchang */}
        <motion.div
          className="bg-deep-indigo-800 bg-opacity-50 rounded-lg p-6 border border-sacred-gold border-opacity-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-12 h-12 bg-sacred-gold bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <span className="text-sacred-gold text-xl">📅</span>
          </div>
          <h2 className="text-xl font-cormorant text-sacred-gold mb-2">
            Daily Panchang & Muhurat
          </h2>
          <p className="text-off-white opacity-80 mb-4">
            Find auspicious times for activities with tithi, nakshatra, yoga, and karana calculations.
          </p>
          <Link
            to="/panchang"
            className="inline-flex items-center text-sacred-gold hover:text-lotus-pink transition-colors"
          >
            View Today's Panchang →
          </Link>
        </motion.div>

        {/* Deity Discovery */}
        <motion.div
          className="bg-deep-indigo-800 bg-opacity-50 rounded-lg p-6 border border-sacred-gold border-opacity-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-12 h-12 bg-sacred-gold bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <span className="text-sacred-gold text-xl">🕉️</span>
          </div>
          <h2 className="text-xl font-cormorant text-sacred-gold mb-2">
            Deity Discovery Cards
          </h2>
          <p className="text-off-white opacity-80 mb-4">
            Explore Hindu deities with beautiful cards featuring descriptions, mantras, and stories.
          </p>
          <Link
            to="/deities"
            className="inline-flex items-center text-sacred-gold hover:text-lotus-pink transition-colors"
          >
            Discover Deities →
          </Link>
        </motion.div>

        {/* Scripture Library */}
        <motion.div
          className="bg-deep-indigo-800 bg-opacity-50 rounded-lg p-6 border border-sacred-gold border-opacity-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-12 h-12 bg-sacred-gold bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <span className="text-sacred-gold text-xl">📚</span>
          </div>
          <h2 className="text-xl font-cormorant text-sacred-gold mb-2">
            Vedic Scripture Library
          </h2>
          <p className="text-off-white opacity-80 mb-4">
            Access and search through Vedas, Upanishads, Puranas, Gita, and other sacred texts.
          </p>
          <ProtectedFeature feature="full_scripture_access">
            <Link
              to="/scriptures"
              className="inline-flex items-center text-sacred-gold hover:text-lotus-pink transition-colors"
            >
              Explore Scriptures →
            </Link>
          </ProtectedFeature>
        </motion.div>

        {/* Mantra Journal */}
        <motion.div
          className="bg-deep-indigo-800 bg-opacity-50 rounded-lg p-6 border border-sacred-gold border-opacity-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="w-12 h-12 bg-sacred-gold bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <span className="text-sacred-gold text-xl">🎵</span>
          </div>
          <h2 className="text-xl font-cormorant text-sacred-gold mb-2">
            Mantra Journal & Meditation
          </h2>
          <p className="text-off-white opacity-80 mb-4">
            Track your japa practice, meditation sessions, and maintain a spiritual journal.
          </p>
          <Link
            to="/journal"
            className="inline-flex items-center text-sacred-gold hover:text-lotus-pink transition-colors"
          >
            Open Journal →
          </Link>
        </motion.div>

        {/* Spiritual Path Quiz */}
        <motion.div
          className="bg-deep-indigo-800 bg-opacity-50 rounded-lg p-6 border border-sacred-gold border-opacity-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="w-12 h-12 bg-sacred-gold bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <span className="text-sacred-gold text-xl">❓</span>
          </div>
          <h2 className="text-xl font-cormorant text-sacred-gold mb-2">
            Spiritual Path Quiz
          </h2>
          <p className="text-off-white opacity-80 mb-4">
            Discover your natural inclination among the four classical paths of yoga.
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center text-sacred-gold hover:text-lotus-pink transition-colors"
          >
            Take the Quiz →
          </Link>
        </motion.div>
      </div>

      {/* User Welcome Message */}
      {isAuthenticated && user && (
        <motion.div
          className="mt-12 bg-gradient-to-r from-sacred-gold to-lotus-pink rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-xl font-cormorant text-deep-indigo-900 mb-2">
            Welcome back, {user.name}!
          </h3>
          <p className="text-deep-indigo-800">
            Continue your spiritual journey with {user.subscriptionTier} access.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;

