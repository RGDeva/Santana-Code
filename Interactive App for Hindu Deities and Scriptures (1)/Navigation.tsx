import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/auth/AuthModal';
import { User, Crown, LogOut } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      setShowAuthModal(true);
    }
  };

  const getSubscriptionBadge = () => {
    if (!user) return null;
    
    switch (user.subscriptionTier) {
      case 'premium':
        return (
          <span className="ml-2 inline-flex items-center bg-sacred-gold bg-opacity-20 text-sacred-gold px-2 py-1 rounded-full text-xs">
            <Crown size={12} className="mr-1" />
            Premium
          </span>
        );
      case 'exclusive':
        return (
          <span className="ml-2 inline-flex items-center bg-lotus-pink bg-opacity-20 text-lotus-pink px-2 py-1 rounded-full text-xs">
            <Crown size={12} className="mr-1" />
            Exclusive
          </span>
        );
      default:
        return (
          <span className="ml-2 inline-flex items-center bg-gray-500 bg-opacity-20 text-gray-400 px-2 py-1 rounded-full text-xs">
            Free
          </span>
        );
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-indigo-900 bg-opacity-90 backdrop-blur-md border-b border-sacred-gold border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl text-sacred-gold">ॐ</span>
              <h1 className="ml-2 text-xl font-cormorant text-sacred-gold">
                Santana Code
              </h1>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/astrology"
                className="text-off-white hover:text-sacred-gold transition-colors"
              >
                Astrology
              </Link>
              <Link
                to="/panchang"
                className="text-off-white hover:text-sacred-gold transition-colors"
              >
                Panchang
              </Link>
              <Link
                to="/deities"
                className="text-off-white hover:text-sacred-gold transition-colors"
              >
                Deities
              </Link>
              <Link
                to="/scriptures"
                className="text-off-white hover:text-sacred-gold transition-colors"
              >
                Scriptures
              </Link>
              <Link
                to="/journal"
                className="text-off-white hover:text-sacred-gold transition-colors"
              >
                Journal
              </Link>
              <Link
                to="/quiz"
                className="text-off-white hover:text-sacred-gold transition-colors"
              >
                Quiz
              </Link>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={handleAuthClick}
                className="flex items-center text-off-white hover:text-sacred-gold transition-colors"
              >
                <User size={20} />
                {isAuthenticated && user ? (
                  <span className="ml-2 hidden md:inline">
                    {user.name}
                    {getSubscriptionBadge()}
                  </span>
                ) : (
                  <span className="ml-2 hidden md:inline">Sign In</span>
                )}
              </button>

              {/* User Dropdown */}
              {showUserMenu && isAuthenticated && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-deep-indigo-900 rounded-lg shadow-lg border border-sacred-gold border-opacity-20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-off-white hover:bg-deep-indigo-800 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-off-white hover:bg-deep-indigo-800 transition-colors flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
};

export default Navigation;

