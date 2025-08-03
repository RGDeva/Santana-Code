// Protected Feature Component
import React, { useState } from 'react';
import { useFeatureAccess } from '../hooks/useFeatureAccess';
import { useAuth } from '../contexts/AuthContext';
import Paywall from './paywall/Paywall';
import AuthModal from './auth/AuthModal';

interface ProtectedFeatureProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showPreview?: boolean;
}

const ProtectedFeature: React.FC<ProtectedFeatureProps> = ({
  feature,
  children,
  fallback,
  showPreview = false
}) => {
  const { checkFeatureAccess } = useFeatureAccess();
  const { isAuthenticated } = useAuth();
  const [showPaywall, setShowPaywall] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const access = checkFeatureAccess(feature);

  const handleUpgradeClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowPaywall(true);
    }
  };

  const handleUpgrade = (tier: string) => {
    // In a real implementation, this would redirect to payment processing
    console.log(`Upgrading to ${tier}`);
    // For demo purposes, we'll just close the paywall
    setShowPaywall(false);
    // Here you would integrate with Stripe or another payment processor
  };

  if (access.canAccess) {
    return <>{children}</>;
  }

  // Show preview if enabled
  if (showPreview) {
    return (
      <div className="relative">
        <div className="filter blur-sm pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold text-sacred-gold mb-2">
              Premium Feature
            </h3>
            <p className="text-off-white opacity-80 mb-4">
              {access.reason}
            </p>
            <button
              onClick={handleUpgradeClick}
              className="bg-gradient-to-r from-sacred-gold to-lotus-pink text-deep-indigo-900 font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
            >
              {!isAuthenticated ? 'Sign Up to Unlock' : 'Upgrade Now'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show fallback or upgrade prompt
  return (
    <>
      {fallback || (
        <div className="bg-deep-indigo-800 bg-opacity-50 border border-sacred-gold border-opacity-30 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-sacred-gold mb-2">
            {access.requiredTier === 'premium' ? 'Premium' : 'Exclusive'} Feature
          </h3>
          <p className="text-off-white opacity-80 mb-4">
            {access.reason}
          </p>
          <button
            onClick={handleUpgradeClick}
            className="bg-gradient-to-r from-sacred-gold to-lotus-pink text-deep-indigo-900 font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
          >
            {!isAuthenticated ? 'Sign Up to Unlock' : 'Upgrade Now'}
          </button>
        </div>
      )}

      {showPaywall && access.requiredTier && (
        <Paywall
          feature={feature}
          tier={access.requiredTier}
          onClose={() => setShowPaywall(false)}
          onUpgrade={handleUpgrade}
        />
      )}

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="register"
        />
      )}
    </>
  );
};

export default ProtectedFeature;

