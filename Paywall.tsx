// Paywall Component
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Sparkles, Check } from 'lucide-react';

interface PaywallProps {
  feature: string;
  tier: 'premium' | 'exclusive';
  onClose: () => void;
  onUpgrade: (tier: string) => void;
}

const Paywall: React.FC<PaywallProps> = ({ feature, tier, onClose, onUpgrade }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');

  const plans = {
    premium: {
      monthly: { price: 9.99, period: 'month' },
      annual: { price: 99.99, period: 'year', savings: '17%' }
    },
    exclusive: {
      monthly: { price: 19.99, period: 'month' },
      annual: { price: 199.99, period: 'year', savings: '17%' }
    }
  };

  const features = {
    premium: [
      'Full Daily Panchang & Muhurat Timing',
      'Complete Deity Discovery Cards',
      'Full Vedic Scripture Library',
      'Unlimited Mantra Journal & Meditation Tracker',
      'Detailed Spiritual Path Analysis',
      'Advanced Search & Filtering',
      'Progress Analytics & Insights'
    ],
    exclusive: [
      'All Premium Features',
      'Personalized Vedic Astrology Readings',
      'AI-Powered Spiritual Guidance',
      'Custom Mantra Creation',
      'Exclusive Content Library',
      'One-on-One Mentorship Access',
      'Priority Customer Support'
    ]
  };

  const currentPlan = plans[tier];
  const currentFeatures = features[tier];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-deep-indigo-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-sacred-gold border-opacity-20">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-off-white hover:text-sacred-gold transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {tier === 'premium' ? (
                  <Crown className="text-sacred-gold" size={48} />
                ) : (
                  <Sparkles className="text-lotus-pink" size={48} />
                )}
              </div>
              <h2 className="text-2xl font-cormorant text-sacred-gold mb-2">
                Unlock {tier === 'premium' ? 'Premium' : 'Exclusive'} Features
              </h2>
              <p className="text-off-white opacity-80">
                Access "{feature}" and many more spiritual tools
              </p>
            </div>
          </div>

          {/* Plan Selection */}
          <div className="p-6">
            <div className="flex bg-deep-indigo-800 rounded-lg p-1 mb-6">
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  selectedPlan === 'monthly'
                    ? 'bg-sacred-gold text-deep-indigo-900'
                    : 'text-off-white hover:text-sacred-gold'
                }`}
                onClick={() => setSelectedPlan('monthly')}
              >
                Monthly
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors relative ${
                  selectedPlan === 'annual'
                    ? 'bg-sacred-gold text-deep-indigo-900'
                    : 'text-off-white hover:text-sacred-gold'
                }`}
                onClick={() => setSelectedPlan('annual')}
              >
                Annual
                {currentPlan.annual.savings && (
                  <span className="absolute -top-2 -right-2 bg-lotus-pink text-white text-xs px-2 py-1 rounded-full">
                    Save {currentPlan.annual.savings}
                  </span>
                )}
              </button>
            </div>

            {/* Pricing */}
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-sacred-gold">
                ${currentPlan[selectedPlan].price}
                <span className="text-lg text-off-white opacity-60">
                  /{currentPlan[selectedPlan].period}
                </span>
              </div>
              {selectedPlan === 'annual' && (
                <div className="text-sm text-off-white opacity-60 mt-1">
                  ${(currentPlan.annual.price / 12).toFixed(2)}/month billed annually
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-off-white mb-4">
                What's included:
              </h3>
              <div className="space-y-3">
                {currentFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="text-sacred-gold mr-3 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-off-white text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onUpgrade(tier)}
              className="w-full bg-gradient-to-r from-sacred-gold to-lotus-pink text-deep-indigo-900 font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
            >
              Upgrade to {tier === 'premium' ? 'Premium' : 'Exclusive'}
            </button>

            {/* Trust indicators */}
            <div className="mt-4 text-center text-xs text-off-white opacity-60">
              <p>✓ Cancel anytime ✓ 7-day free trial ✓ Secure payment</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Paywall;

