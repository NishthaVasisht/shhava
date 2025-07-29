import { Shield, CheckCircle, Star, Award, Camera, Phone } from 'lucide-react';

interface VerificationLevel {
  type: string;
  icon: React.ComponentType<any>;
  color: string;
  label: string;
  description: string;
}

interface VerifiedByBharatBadgeProps {
  verificationTypes: string[];
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  className?: string;
}

const VERIFICATION_LEVELS: Record<string, VerificationLevel> = {
  government_id: {
    type: 'government_id',
    icon: Shield,
    color: 'from-blue-500 to-indigo-600',
    label: 'ID Verified',
    description: 'Government ID verified by secure system'
  },
  selfie_video: {
    type: 'selfie_video',
    icon: Camera,
    color: 'from-green-500 to-emerald-600',
    label: 'Video Verified',
    description: 'Live selfie video confirms identity'
  },
  phone_verification: {
    type: 'phone_verification',
    icon: Phone,
    color: 'from-purple-500 to-violet-600',
    label: 'Phone Verified',
    description: 'Phone number verified via OTP'
  },
  community_verified: {
    type: 'community_verified',
    icon: Star,
    color: 'from-orange-500 to-amber-600',
    label: 'Community Safe',
    description: 'Verified safe by community reports'
  }
};

export default function VerifiedByBharatBadge({ 
  verificationTypes, 
  size = 'md', 
  showDetails = false,
  className = '' 
}: VerifiedByBharatBadgeProps) {
  if (!verificationTypes || verificationTypes.length === 0) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const highestVerification = verificationTypes.includes('government_id') 
    ? VERIFICATION_LEVELS.government_id
    : verificationTypes.includes('selfie_video')
    ? VERIFICATION_LEVELS.selfie_video
    : verificationTypes.includes('phone_verification')
    ? VERIFICATION_LEVELS.phone_verification
    : VERIFICATION_LEVELS.community_verified;

  const getVerificationScore = () => {
    let score = 0;
    verificationTypes.forEach(type => {
      switch (type) {
        case 'government_id': score += 40; break;
        case 'selfie_video': score += 30; break;
        case 'phone_verification': score += 20; break;
        case 'community_verified': score += 10; break;
      }
    });
    return Math.min(score, 100);
  };

  if (!showDetails) {
    return (
      <div className={`inline-flex items-center space-x-1 ${className}`}>
        <div className={`${sizeClasses[size]} bg-gradient-to-r ${highestVerification.color} rounded-full flex items-center justify-center shadow-lg animate-neon-glow`}>
          <highestVerification.icon className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6'} text-white`} />
        </div>
        {size !== 'sm' && (
          <span className={`${textSizeClasses[size]} font-semibold text-gray-700`}>
            Verified by Bharat
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-gray-200 hover-lift transition-all duration-300 ${className}`}>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 animate-slide-in-left" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Verified by Bharat 🇮🇳
          </h3>
          <p className="text-sm text-gray-600 animate-slide-in-left delay-100">
            Trust Score: {getVerificationScore()}%
          </p>
        </div>
      </div>

      {/* Verification Levels */}
      <div className="space-y-3">
        {verificationTypes.map((type, index) => {
          const verification = VERIFICATION_LEVELS[type];
          if (!verification) return null;

          const IconComponent = verification.icon;
          
          return (
            <div 
              key={type}
              className={`flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border animate-slide-in-left delay-${(index + 1) * 100}`}
            >
              <div className={`w-8 h-8 bg-gradient-to-r ${verification.color} rounded-lg flex items-center justify-center`}>
                <IconComponent className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-800">{verification.label}</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-xs text-gray-600">{verification.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Benefits */}
      <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 animate-fade-in delay-500">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="font-medium text-green-800 text-sm">Trusted Profile Benefits</span>
        </div>
        <ul className="text-xs text-green-700 space-y-1">
          <li>• Higher visibility in search results</li>
          <li>• Priority customer support</li>
          <li>• Access to verified-only features</li>
          <li>• Safer dating experience</li>
        </ul>
      </div>

      {/* Viral CTA */}
      <div className="mt-4 text-center">
        <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift text-sm font-medium">
          Join the Verified Circle 🎯
        </button>
        <p className="text-xs text-gray-500 mt-1">Be part of Bharat's most trusted dating community</p>
      </div>
    </div>
  );
}
