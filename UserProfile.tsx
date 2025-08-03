// User Profile and Subscription Management Component
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { User, Crown, Calendar, Settings, LogOut } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'settings'>('profile');

  if (!user) {
    return null;
  }

  const getSubscriptionBadge = () => {
    switch (user.subscriptionTier) {
      case 'premium':
        return (
          <div className="inline-flex items-center bg-sacred-gold bg-opacity-20 text-sacred-gold px-3 py-1 rounded-full text-sm">
            <Crown size={16} className="mr-1" />
            Premium
          </div>
        );
      case 'exclusive':
        return (
          <div className="inline-flex items-center bg-lotus-pink bg-opacity-20 text-lotus-pink px-3 py-1 rounded-full text-sm">
            <Crown size={16} className="mr-1" />
            Exclusive
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center bg-gray-500 bg-opacity-20 text-gray-400 px-3 py-1 rounded-full text-sm">
            Free
          </div>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        className="bg-deep-indigo-900 rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sacred-gold to-lotus-pink p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-deep-indigo-900 rounded-full flex items-center justify-center mr-4">
                <User className="text-sacred-gold" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-cormorant text-deep-indigo-900 font-bold">
                  {user.name}
                </h1>
                <p className="text-deep-indigo-800">{user.email}</p>
              </div>
            </div>
            <div className="text-right">
              {getSubscriptionBadge()}
              <p className="text-deep-indigo-800 text-sm mt-1">
                Member since {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-sacred-gold border-opacity-20">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'subscription', label: 'Subscription', icon: Crown },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'text-sacred-gold border-b-2 border-sacred-gold'
                  : 'text-off-white hover:text-sacred-gold'
              }`}
            >
              <Icon size={16} className="mr-2" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-off-white mb-4">
                  Profile Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-off-white text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full px-4 py-3 bg-deep-indigo-800 border border-sacred-gold border-opacity-30 rounded-lg text-off-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-off-white text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full px-4 py-3 bg-deep-indigo-800 border border-sacred-gold border-opacity-30 rounded-lg text-off-white"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-off-white mb-4">
                  Spiritual Journey Stats
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-deep-indigo-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-sacred-gold">127</div>
                    <div className="text-off-white text-sm">Mantras Chanted</div>
                  </div>
                  <div className="bg-deep-indigo-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-sacred-gold">45</div>
                    <div className="text-off-white text-sm">Days Streak</div>
                  </div>
                  <div className="bg-deep-indigo-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-sacred-gold">23</div>
                    <div className="text-off-white text-sm">Scriptures Read</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-off-white mb-4">
                  Current Subscription
                </h3>
                <div className="bg-deep-indigo-800 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-sacred-gold">
                        {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)} Plan
                      </h4>
                      <p className="text-off-white opacity-60">
                        Status: {user.subscriptionStatus}
                      </p>
                    </div>
                    {getSubscriptionBadge()}
                  </div>
                  
                  {user.subscriptionExpiry && (
                    <div className="flex items-center text-off-white opacity-80">
                      <Calendar size={16} className="mr-2" />
                      {user.subscriptionStatus === 'active' ? 'Renews' : 'Expires'} on {formatDate(user.subscriptionExpiry)}
                    </div>
                  )}
                </div>
              </div>

              {user.subscriptionTier === 'free' && (
                <div>
                  <h3 className="text-lg font-semibold text-off-white mb-4">
                    Upgrade Your Experience
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-deep-indigo-800 p-6 rounded-lg border border-sacred-gold border-opacity-30">
                      <h4 className="text-lg font-semibold text-sacred-gold mb-2">Premium</h4>
                      <p className="text-off-white opacity-80 mb-4">
                        Unlock advanced features and unlimited access
                      </p>
                      <div className="text-2xl font-bold text-sacred-gold mb-4">
                        $9.99<span className="text-sm text-off-white opacity-60">/month</span>
                      </div>
                      <button className="w-full bg-sacred-gold text-deep-indigo-900 font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                        Upgrade to Premium
                      </button>
                    </div>
                    
                    <div className="bg-deep-indigo-800 p-6 rounded-lg border border-lotus-pink border-opacity-30">
                      <h4 className="text-lg font-semibold text-lotus-pink mb-2">Exclusive</h4>
                      <p className="text-off-white opacity-80 mb-4">
                        Premium features plus personalized guidance
                      </p>
                      <div className="text-2xl font-bold text-lotus-pink mb-4">
                        $19.99<span className="text-sm text-off-white opacity-60">/month</span>
                      </div>
                      <button className="w-full bg-lotus-pink text-deep-indigo-900 font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                        Upgrade to Exclusive
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-off-white mb-4">
                  Account Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-deep-indigo-800 rounded-lg">
                    <div>
                      <h4 className="text-off-white font-medium">Email Notifications</h4>
                      <p className="text-off-white opacity-60 text-sm">
                        Receive updates about your spiritual journey
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sacred-gold"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-deep-indigo-800 rounded-lg">
                    <div>
                      <h4 className="text-off-white font-medium">Dark Mode</h4>
                      <p className="text-off-white opacity-60 text-sm">
                        Use dark theme for better meditation
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sacred-gold"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-off-white mb-4">
                  Account Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-4 bg-deep-indigo-800 rounded-lg hover:bg-deep-indigo-700 transition-colors text-off-white">
                    Change Password
                  </button>
                  <button className="w-full text-left p-4 bg-deep-indigo-800 rounded-lg hover:bg-deep-indigo-700 transition-colors text-off-white">
                    Export Data
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left p-4 bg-red-600 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors text-red-400 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;

