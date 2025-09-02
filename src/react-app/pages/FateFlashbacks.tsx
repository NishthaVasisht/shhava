import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Calendar, TrendingUp, Share2, Eye } from 'lucide-react';
import FateFlashbackCard from '../components/FateFlashbackCard';

interface FateFlashback {
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

export default function FateFlashbacks() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [flashbacks, setFlashbacks] = useState<FateFlashback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    totalFlashbacks: 0,
    totalCrossings: 0,
    sharedStories: 0,
    weeklyAverage: 0
  });

  useEffect(() => {
    setIsVisible(true);
    loadFateFlashbacks();

    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const loadFateFlashbacks = async () => {
    try {
      // Mock data for now - replace with API call
      const mockFlashbacks: FateFlashback[] = [
        {
          _id: "1",
          title: "This Week, Destiny Was Busy! ✨",
          story_content: "This week, you crossed paths with 6 people who could change your story forever...",
          week_start_date: "2024-01-15",
          week_end_date: "2024-01-21",
          crossings_count: 6,
          shared_locations: ["Central Perk Café", "Golden Temple", "Sector 17 Plaza", "Chandigarh Railway Station"],
          is_viewed: false,
          is_shared: false
        },
        {
          _id: "2",
          title: "Plot Twist: Your Future Was Right There! 🎬",
          story_content: "Like Ted's yellow umbrella moment, your person might have been right there...",
          week_start_date: "2024-01-08",
          week_end_date: "2024-01-14",
          crossings_count: 4,
          shared_locations: ["Crossword Bookstore", "India Coffee House", "Rock Garden"],
          is_viewed: true,
          is_shared: true
        },
        {
          _id: "3",
          title: "Could This BE Any More Meant to Be? 💫",
          story_content: "Barney would say this week was LEGEN... wait for it... DARY!",
          week_start_date: "2024-01-01",
          week_end_date: "2024-01-07",
          crossings_count: 8,
          shared_locations: ["Devi Temple", "Tagore Theatre", "Mall Road", "Kulfi Corner"],
          is_viewed: true,
          is_shared: false
        }
      ];

      setFlashbacks(mockFlashbacks);

      // Calculate stats
      const totalCrossings = mockFlashbacks.reduce((sum, fb) => sum + fb.crossings_count, 0);
      const sharedCount = mockFlashbacks.filter(fb => fb.is_shared).length;

      setStats({
        totalFlashbacks: mockFlashbacks.length,
        totalCrossings,
        sharedStories: sharedCount,
        weeklyAverage: Math.round(totalCrossings / mockFlashbacks.length)
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Error loading fate flashbacks:', error);
      setIsLoading(false);
    }
  };

  const handleViewFlashback = async (id: string) => {
    try {
      setFlashbacks(prev => prev.map(fb =>
        fb._id === id ? { ...fb, is_viewed: true } : fb
      ));
      // API call would go here
    } catch (error) {
      console.error('Error marking flashback as viewed:', error);
    }
  };

  const handleShareFlashback = async (id: string) => {
    try {
      setFlashbacks(prev => prev.map(fb =>
        fb._id === id ? { ...fb, is_shared: true } : fb
      ));
      setStats(prev => ({ ...prev, sharedStories: prev.sharedStories + 1 }));
      // API call would go here
    } catch (error) {
      console.error('Error sharing flashback:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-bounce-gentle" />
          <div className="loading-skeleton w-48 h-4 rounded mx-auto mb-2"></div>
          <div className="loading-skeleton w-32 h-3 rounded mx-auto"></div>
          <p className="text-gray-600 mt-4 animate-fade-in delay-500" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Gathering your legendary moments... ✨
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Navigation */}
      <nav className={`bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50 transition-all duration-700 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all duration-300 hover-lift"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg hover-glow animate-neon-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Fate Flashbacks
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/discover')} className="text-gray-700 hover:text-purple-600 text-sm font-medium hover:scale-105">Find More</button>
            <button onClick={() => navigate('/dashboard')} className="text-gray-700 hover:text-purple-600 text-sm font-medium hover:scale-105">Dashboard</button>
            <button onClick={logout} className="text-gray-700 hover:text-purple-600 text-sm font-medium hover:scale-105">Peace Out</button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-text-reveal" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Your Weekly Fate Flashbacks 📚
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-slide-in-left delay-300" style={{ fontFamily: 'Inter, sans-serif' }}>
            Every week, we create story-style cards of your serendipitous moments. Share them on Instagram and let destiny work its magic! ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            {/* Stats code unchanged */}
          </div>

          {/* Flashbacks List */}
          <div className="lg:col-span-3 space-y-6">
            {flashbacks.map((flashback, index) => (
              <div key={flashback._id} className={`transition-all duration-1000 delay-${(index + 1) * 200} ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
                <FateFlashbackCard
                  flashback={flashback}
                  onView={handleViewFlashback}
                  onShare={handleShareFlashback}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
