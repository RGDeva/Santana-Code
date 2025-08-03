// Feature Access Control Hook
import { useAuth } from '../contexts/AuthContext';

export interface FeatureAccess {
  canAccess: boolean;
  requiredTier?: 'premium' | 'exclusive';
  reason?: string;
}

export const useFeatureAccess = () => {
  const { user } = useAuth();

  const checkFeatureAccess = (feature: string): FeatureAccess => {
    // If user is not authenticated, they get free tier access
    if (!user) {
      return checkFreeFeatureAccess(feature);
    }

    // Check based on user's subscription tier
    switch (user.subscriptionTier) {
      case 'free':
        return checkFreeFeatureAccess(feature);
      case 'premium':
        return checkPremiumFeatureAccess(feature);
      case 'exclusive':
        return { canAccess: true }; // Exclusive tier has access to everything
      default:
        return checkFreeFeatureAccess(feature);
    }
  };

  const checkFreeFeatureAccess = (feature: string): FeatureAccess => {
    const freeFeatures = [
      'basic_panchang',
      'limited_deity_cards',
      'basic_scripture_access',
      'limited_mantra_journal',
      'basic_spiritual_quiz'
    ];

    if (freeFeatures.includes(feature)) {
      return { canAccess: true };
    }

    // Determine required tier based on feature
    const exclusiveFeatures = [
      'personalized_astrology_readings',
      'ai_spiritual_guidance',
      'custom_mantra_creation',
      'exclusive_content_library',
      'one_on_one_mentorship'
    ];

    const requiredTier = exclusiveFeatures.includes(feature) ? 'exclusive' : 'premium';

    return {
      canAccess: false,
      requiredTier,
      reason: `This feature requires ${requiredTier} subscription`
    };
  };

  const checkPremiumFeatureAccess = (feature: string): FeatureAccess => {
    const exclusiveOnlyFeatures = [
      'personalized_astrology_readings',
      'ai_spiritual_guidance',
      'custom_mantra_creation',
      'exclusive_content_library',
      'one_on_one_mentorship'
    ];

    if (exclusiveOnlyFeatures.includes(feature)) {
      return {
        canAccess: false,
        requiredTier: 'exclusive',
        reason: 'This feature requires exclusive subscription'
      };
    }

    return { canAccess: true };
  };

  const getUsageLimit = (feature: string): number | null => {
    if (!user || user.subscriptionTier === 'free') {
      const limits: Record<string, number> = {
        'mantra_journal_entries': 5, // 5 entries per day
        'deity_card_views': 10, // 10 deity cards per day
        'scripture_verses': 20, // 20 verses per day
        'panchang_queries': 3 // 3 panchang queries per day
      };
      return limits[feature] || null;
    }
    return null; // No limits for paid tiers
  };

  const hasReachedLimit = (feature: string, currentUsage: number): boolean => {
    const limit = getUsageLimit(feature);
    return limit !== null && currentUsage >= limit;
  };

  return {
    checkFeatureAccess,
    getUsageLimit,
    hasReachedLimit,
    userTier: user?.subscriptionTier || 'free',
    isAuthenticated: !!user
  };
};

