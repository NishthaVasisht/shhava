import { Shield, CheckCircle } from 'lucide-react';

interface VerifiedBadgeProps {
  isVerified: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function VerifiedBadge({ isVerified, size = 'sm', showText = false }: VerifiedBadgeProps) {
  if (!isVerified) return null;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`inline-flex items-center space-x-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-2 py-1 rounded-full ${textSizeClasses[size]} font-medium animate-pulse-glow`}>
      <Shield className={`${sizeClasses[size]} fill-current`} />
      <CheckCircle className={`${sizeClasses[size]} -ml-1`} />
      {showText && <span>Verified</span>}
    </div>
  );
}
