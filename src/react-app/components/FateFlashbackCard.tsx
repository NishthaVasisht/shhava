import { useState } from 'react';
import { MapPin, Share2, Eye, Users, Sparkles } from 'lucide-react';

interface FateFlashback {
  id: number;
  title: string;
  story_content: string;
  week_start_date: string;
  week_end_date: string;
  crossings_count: number;
  shared_locations: string[];
  is_viewed: boolean;
  is_shared: boolean;
}

interface FateFlashbackCardProps {
  flashback: FateFlashback;
  onView: (id: number) => void;
  onShare: (id: number) => void;
}

export default function FateFlashbackCard({ flashback, onView, onShare }: FateFlashbackCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useState(() => {
    setTimeout(() => setIsVisible(true), 100);
  });

  const handleView = () => {
    setIsExpanded(!isExpanded);
    if (!flashback.is_viewed) {
      onView(flashback.id);
    }
  };

  const handleShare = () => {
    onShare(flashback.id);
    // Copy to clipboard for Instagram story sharing
    const shareText = `${flashback.title}\n\n${flashback.story_content}\n\n✨ Discover your own fate flashbacks on How I Met You! 💜`;
    navigator.clipboard?.writeText(shareText);
  };

  const formatWeekRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}`;
  };

  return (
    <div className={`bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover-lift transition-all duration-700 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'} ${!flashback.is_viewed ? 'ring-2 ring-purple-200 animate-pulse-glow' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center animate-neon-glow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 animate-slide-in-left" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              {flashback.title}
            </h3>
            <p className="text-sm text-gray-500 animate-slide-in-left delay-100">
              {formatWeekRange(flashback.week_start_date, flashback.week_end_date)}
            </p>
          </div>
        </div>
        
        {!flashback.is_viewed && (
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce-gentle"></div>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center space-x-6 mb-4 animate-slide-in-left delay-200">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">
            {flashback.crossings_count} {flashback.crossings_count === 1 ? 'crossing' : 'crossings'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-pink-600" />
          <span className="text-sm font-medium text-gray-700">
            {flashback.shared_locations.length} location{flashback.shared_locations.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Story Preview */}
      <div className="mb-4 animate-slide-in-up delay-300">
        <p className="text-gray-600 leading-relaxed">
          {isExpanded 
            ? flashback.story_content 
            : `${flashback.story_content.slice(0, 120)}${flashback.story_content.length > 120 ? '...' : ''}`
          }
        </p>
      </div>

      {/* Shared Locations */}
      {flashback.shared_locations.length > 0 && (
        <div className="mb-4 animate-slide-in-up delay-400">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Magical Places:</h4>
          <div className="flex flex-wrap gap-2">
            {flashback.shared_locations.slice(0, isExpanded ? undefined : 3).map((location, idx) => (
              <span
                key={idx}
                className={`bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium animate-slide-in-up delay-${(idx + 1) * 100}`}
              >
                {location}
              </span>
            ))}
            {!isExpanded && flashback.shared_locations.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                +{flashback.shared_locations.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between animate-slide-in-up delay-500">
        <button
          onClick={handleView}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors font-medium"
        >
          <Eye className="w-4 h-4" />
          <span>{isExpanded ? 'Show Less' : 'Read Full Story'}</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift text-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Story</span>
          </button>
        </div>
      </div>

      {/* Instagram Story Hint */}
      {isExpanded && (
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 animate-fade-in">
          <p className="text-xs text-purple-700 text-center">
            ✨ Perfect for Instagram Stories! Share your fate flashback and tag us 📸
          </p>
        </div>
      )}
    </div>
  );
}
