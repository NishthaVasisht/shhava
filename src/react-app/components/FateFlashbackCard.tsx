import { useState, useEffect } from 'react';
import { MapPin, Share2, Eye, Users, Sparkles } from 'lucide-react';

export interface FateFlashback {
  _id: string;
  title: string;
  story_content: string;
  week_start_date: string;
  week_end_date: string;
  crossings_count: number;
  shared_locations: string[];
  is_viewed: boolean;
  is_shared: boolean;
}

export interface FateFlashbackCardProps {
  flashback: FateFlashback;
  onView: (id: string) => void;
  onShare: (id: string) => void;
}

export default function FateFlashbackCard({
  flashback,
  onView,
  onShare,
}: FateFlashbackCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleView = () => {
    setIsExpanded(!isExpanded);
    if (!flashback.is_viewed) {
      onView(flashback._id);
    }
  };

  const handleShare = () => {
    onShare(flashback._id);
    const shareText = `${flashback.title}\n\n${flashback.story_content}\n\n✨ Discover your own fate flashbacks on How I Met You! 💜`;
    navigator.clipboard?.writeText(shareText);
  };

  const formatWeekRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString("en-IN", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}`;
  };

  return (
    <div
      className={`bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover-lift transition-all duration-700 ${
        isVisible ? "animate-slide-in-up" : "opacity-0"
      } ${!flashback.is_viewed ? "ring-2 ring-purple-200 animate-pulse-glow" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl flex items-center justify-center animate-neon-glow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{flashback.title}</h3>
            <p className="text-sm text-gray-500">
              {formatWeekRange(flashback.week_start_date, flashback.week_end_date)}
            </p>
          </div>
        </div>
        {!flashback.is_viewed && (
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce-gentle"></div>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center space-x-6 mb-4">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">
            {flashback.crossings_count} crossings
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-gray-700">
            {flashback.shared_locations.length} locations
          </span>
        </div>
      </div>

      {/* Story */}
      <p className="text-gray-600 mb-4">
        {isExpanded
          ? flashback.story_content
          : `${flashback.story_content.slice(0, 120)}${
              flashback.story_content.length > 120 ? "..." : ""
            }`}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <button onClick={handleView} className="flex items-center text-yellow-600 font-medium">
          <Eye className="w-4 h-4 mr-1" />
          {isExpanded ? "Show Less" : "Read More"}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center bg-gradient-to-r from-yellow-400 to-red-500 text-white px-4 py-2 rounded-xl text-sm"
        >
          <Share2 className="w-4 h-4 mr-1" />
          Share
        </button>
      </div>
    </div>
  );
}
