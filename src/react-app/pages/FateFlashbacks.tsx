import { useState, useEffect } from 'react';
import { useAuth } from '@getmocha/users-service/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Sparkles, Calendar, TrendingUp, Share2, Eye } from 'lucide-react';
import FateFlashbackCard from '../components/FateFlashbackCard';

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
      // Mock data for now - replace with actual API call
      const mockFlashbacks: FateFlashback[] = [
        {
          id: 1,
          title: "This Week, Destiny Was Busy! ✨",
          story_content: "This week, you crossed paths with 6 people who could change your story forever. One of them visits the same café every Friday morning just like you - ordering the exact same coffee (oat milk latte with an extra shot). Another person was at the Golden Temple on Tuesday evening, lighting a diya at the same time you were there. Could this BE any more serendipitous? 🕯️",
          week_start_date: "2024-01-15",
          week_end_date: "2024-01-21",
          crossings_count: 6,
          shared_locations: ["Central Perk Café", "Golden Temple", "Sector 17 Plaza", "Chandigarh Railway Station"],
          is_viewed: false,
          is_shared: false
        },
        {
          id: 2,
          title: "Plot Twist: Your Future Was Right There! 🎬",
          story_content: "Like Ted's yellow umbrella moment, your person might have been right there! This week you had 4 near-misses that would make even Ross jealous. Someone with your exact taste in books was browsing the poetry section at the same bookstore - they picked up the same Ghalib collection you bought last month. The universe is definitely trying to tell you something! 📚",
          week_start_date: "2024-01-08",
          week_end_date: "2024-01-14",
          crossings_count: 4,
          shared_locations: ["Crossword Bookstore", "India Coffee House", "Rock Garden"],
          is_viewed: true,
          is_shared: true
        },
        {
          id: 3,
          title: "Could This BE Any More Meant to Be? 💫",
          story_content: "Barney would say this week was LEGEN... wait for it... DARY! You and someone special visited 3 of the same sacred places this week. Both of you lit candles at the Devi Temple on Sunday morning, both ordered kulfi at the same street vendor (what are the odds?), and both attended the same cultural event at Tagore Theatre. The stars are literally aligning! 🌟",
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

  const handleViewFlashback = async (id: number) => {
    try {
      // Update viewed status
      setFlashbacks(prev => prev.map(fb => 
        fb.id === id ? { ...fb, is_viewed: true } : fb
      ));
      
      // In real app, make API call to mark as viewed
      // await fetch(`/fate-flashbacks/${id}/view`, { method: 'POST' });
    } catch (error) {
      console.error('Error marking flashback as viewed:', error);
    }
  };

  const handleShareFlashback = async (id: number) => {
    try {
      // Update shared status
      setFlashbacks(prev => prev.map(fb => 
        fb.id === id ? { ...fb, is_shared: true } : fb
      ));
      
      setStats(prev => ({ ...prev, sharedStories: prev.sharedStories + 1 }));
      
      // In real app, make API call to track sharing
      // await fetch(`/fate-flashbacks/${id}/share`, { method: 'POST' });
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
            <button 
              onClick={() => navigate('/discover')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <span className="hidden sm:inline">Find More</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button 
              onClick={logout}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <span className="hidden sm:inline">Peace Out</span>
            </button>
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
            Every week, we create story-style cards of your serendipitous moments. 
            Share them on Instagram and let destiny work its magic! ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover-lift transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <h3 className="text-lg font-bold text-gray-800 mb-6 animate-slide-in-up" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Your Story Stats 📊
              </h3>
              
              <div className="space-y-6">
                <div className="text-center animate-slide-in-up delay-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse-glow">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stats.totalFlashbacks}</div>
                  <div className="text-sm text-gray-600">Episodes Created</div>
                </div>

                <div className="text-center animate-slide-in-up delay-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse-glow">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stats.totalCrossings}</div>
                  <div className="text-sm text-gray-600">Total Crossings</div>
                </div>

                <div className="text-center animate-slide-in-up delay-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse-glow">
                    <Share2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stats.sharedStories}</div>
                  <div className="text-sm text-gray-600">Stories Shared</div>
                </div>

                <div className="text-center animate-slide-in-up delay-400">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse-glow">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stats.weeklyAverage}</div>
                  <div className="text-sm text-gray-600">Avg per Week</div>
                </div>
              </div>

              {/* Weekly Generation Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 animate-slide-in-up delay-500">
                <h4 className="font-semibold text-purple-800 mb-2 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Auto-Generated Magic</span>
                </h4>
                <ul className="text-xs text-purple-700 space-y-1">
                  <li>• New story every Sunday</li>
                  <li>• Based on your real crossings</li>
                  <li>• Perfect for Instagram stories</li>
                  <li>• Encourages weekly app visits</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Flashbacks List */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {flashbacks.map((flashback, index) => (
                <div
                  key={flashback.id}
                  className={`transition-all duration-1000 delay-${(index + 1) * 200} ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
                >
                  <FateFlashbackCard
                    flashback={flashback}
                    onView={handleViewFlashback}
                    onShare={handleShareFlashback}
                  />
                </div>
              ))}

              {flashbacks.length === 0 && (
                <div className="text-center py-20 animate-fade-in">
                  <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-float" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                    Your First Chapter Awaits! 📖
                  </h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Start exploring the world and crossing paths with amazing people. 
                    Your first fate flashback will appear after a week of serendipitous moments!
                  </p>
                  <button
                    onClick={() => navigate('/discover')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift"
                    style={{ fontFamily: 'Fredoka, sans-serif' }}
                  >
                    Start Your Story! ✨
                  </button>
                </div>
              )}
            </div>

            {/* Marketing CTA */}
            <div className={`mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center transition-all duration-1000 delay-600 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Share Your Story, Inspire Others! 🌟
              </h3>
              <p className="mb-6 opacity-90">
                When you share your fate flashbacks on Instagram, you're not just sharing a story - 
                you're giving others hope that their perfect match is out there too!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white/20 backdrop-blur-lg text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 hover-lift">
                  📸 Share on Instagram
                </button>
                <button className="bg-white/20 backdrop-blur-lg text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 hover-lift">
                  💌 Share with Friends
                </button>
              </div>
              <p className="text-xs mt-4 opacity-75">
                #FateFlashbacks #HowIMetYou #SerendipityStories
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
