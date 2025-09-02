import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Sparkles,
  MapPin,
  MessageCircle,
  Shield,
  Star,
  Plus,
  Clock,
  Award,
} from "lucide-react";
import FateFlashbackCard from "../components/FateFlashbackCard";
import VerifiedByBharatBadge from "../components/VerifiedByBharatBadge";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [serendipityMoments, setSerendipityMoments] = useState<any[]>([]);
  const [fateFlashbacks, setFateFlashbacks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchSerendipityMoments();
    fetchFateFlashbacks();
    setIsVisible(true);

    // Load Google Fonts dynamically
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setProfile(data.user || data.profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSerendipityMoments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/serendipity-moments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setSerendipityMoments(data.moments || []);
    } catch (error) {
      console.error("Error fetching serendipity moments:", error);
    }
  };

  const fetchFateFlashbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/flashbacks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setFateFlashbacks(data.flashbacks?.slice(0, 2) || []);
    } catch (error) {
      console.error("Error fetching fate flashbacks:", error);
    }
  };

  const handleViewFlashback = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${apiUrl}/flashbacks/${id}/view`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      setFateFlashbacks((prev) =>
        prev.map((fb) => (fb._id === id ? { ...fb, is_viewed: true } : fb))
      );
    } catch (error) {
      console.error("Error marking flashback as viewed:", error);
    }
  };

  const handleShareFlashback = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${apiUrl}/flashbacks/${id}/share`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      setFateFlashbacks((prev) =>
        prev.map((fb) => (fb._id === id ? { ...fb, is_shared: true } : fb))
      );
    } catch (error) {
      console.error("Error sharing flashback:", error);
    }
  };

  const createSerendipityMoment = async () => {
    const newMoment = {
      location_name: "Coffee House, Ludhiana",
      latitude: 30.9,
      longitude: 75.85,
      moment_description:
        "Saw someone reading poetry at the corner table, our eyes met briefly over 'Ghalib' verses",
      emotional_state: "contemplative",
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/serendipity-moments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMoment),
      });

      if (response.ok) {
        fetchSerendipityMoments();
      }
    } catch (error) {
      console.error("Error creating Itera moment:", error);
    }
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-neon-glow" />
          <div className="loading-skeleton w-48 h-4 rounded mx-auto mb-2"></div>
          <div className="loading-skeleton w-32 h-3 rounded mx-auto"></div>
          <p
            className="text-gray-600 mt-4 animate-fade-in delay-500"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            Could this BE loading any slower? 😄
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Navigation */}
      <nav
        className={`bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50 transition-all duration-700 ${
          isVisible ? "animate-slide-in-up" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg hover-glow animate-neon-glow">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <span
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              How I Met You
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate("/discover")}
              className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Find The One 💕
            </button>
            <button
              onClick={() => navigate("/fated-crossings")}
              className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Missed Connections 🎭
            </button>
            <button
              onClick={() => navigate("/fate-flashbacks")}
              className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Weekly Stories 📚
            </button>
            <button
              onClick={() => navigate("/messages")}
              className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Central Perk ☕
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              My Story 📖
            </button>
            <button
              onClick={logout}
              className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Peace Out ✌️
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div
          className={`mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? "animate-slide-in-up" : "opacity-0"
          }`}
        >
          <h1
            className="text-4xl font-bold text-gray-800 mb-2 animate-text-reveal"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            {profile.name}, could you BE any more awesome? 💜
          </h1>
          <p
            className="text-gray-600 text-lg animate-slide-in-left delay-300"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Your story's about to get <em>really</em> good... Time for some
            legendary moments! 🎬
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Fate Flashbacks Preview */}
            {fateFlashbacks.length > 0 && (
              <div
                className={`bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover-lift transition-all duration-1000 delay-300 ${
                  isVisible ? "animate-slide-in-up" : "opacity-0"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3 animate-slide-in-left">
                    <Clock className="w-6 h-6 text-purple-500 animate-bounce-gentle" />
                    <h2
                      className="text-2xl font-bold text-gray-800"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      This Week's Fate Flashbacks
                    </h2>
                  </div>
                  <button
                    onClick={() => navigate("/fate-flashbacks")}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift animate-slide-in-right"
                  >
                    <span>View All Stories</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {fateFlashbacks.map((flashback) => (
                    <FateFlashbackCard
                      key={flashback._id}
                      flashback={flashback}
                      onView={handleViewFlashback}
                      onShare={handleShareFlashback}
                    />
                  ))}
                </div>
              </div>
            )}
            {/* Serendipity Moments */}
            <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover-lift transition-all duration-1000 delay-${fateFlashbacks.length > 0 ? '500' : '400'} ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3 animate-slide-in-left">
                  <Sparkles className="w-6 h-6 text-orange-500 animate-bounce-gentle" />
                  <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Your Itera Moments
                  </h2>
                </div>
                <button
                  onClick={createSerendipityMoment}
                  className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift animate-slide-in-right"
                >
                  <Plus className="w-4 h-4 animate-bounce-gentle" />
                  <span>Add Moment</span>
                </button>
              </div>

              {serendipityMoments.length === 0 ? (
                <div className="text-center py-12 animate-fade-in delay-500">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-float" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2 animate-slide-in-up delay-600">No moments yet</h3>
                  <p className="text-gray-500 mb-6 animate-slide-in-up delay-700">Start capturing your Itera encounters</p>
                  <button
                    onClick={createSerendipityMoment}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift animate-bounce-gentle delay-800"
                  >
                    Create Your First Moment
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {serendipityMoments.map((moment, index) => (
                    <div key={moment.id} className={`p-6 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl border border-orange-100 hover-lift animate-slide-in-up delay-${(index + 1) * 100}`}>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-xl flex items-center justify-center animate-pulse-glow">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2 animate-slide-in-left delay-200">
                            <h3 className="font-semibold text-gray-800">{moment.location_name}</h3>
                            <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded-full animate-shimmer">
                              {moment.emotional_state}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3 animate-slide-in-left delay-300">{moment.moment_description}</p>
                          <p className="text-sm text-gray-500 animate-fade-in delay-400">
                            {new Date(moment.created_at).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Features Showcase */}
            <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover-lift transition-all duration-1000 delay-${fateFlashbacks.length > 0 ? '700' : '600'} ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-slide-in-left" style={{ fontFamily: 'Playfair Display, serif' }}>
                AI-Powered Love Features
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: MessageCircle,
                    title: "Jugni Bot",
                    description: "Your AI companion for love advice and conversation starters",
                    status: "Active",
                    link: "/ai/jugni-bot"
                  },
                  {
                    icon: Sparkles,
                    title: "Voice Shayari",
                    description: "Generate personalized poetry in your voice and language",
                    status: "Active",
                    link: "/ai/voice-shayari"
                  },
                  {
                    icon: Shield,
                    title: "Creep Detector",
                    description: "AI-powered safety screening for all interactions",
                    status: "Active",
                    link: "/safety"
                  },
                  {
                    icon: Star,
                    title: "Cultural Matching",
                    description: "Find connections based on shared traditions and values",
                    status: "Active",
                    link: "/discover"
                  },
                  {
                    icon: MapPin,
                    title: "Fated Crossings",
                    description: "Discover people who crossed your path in real life",
                    status: "Active",
                    link: "/fated-crossings"
                  },
                  {
                    icon: Award,
                    title: "Verified by Bharat",
                    description: "Join India's most trusted dating community",
                    status: "Active",
                    link: "/profile"
                  }
                ].map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(feature.link)}
                    className={`w-full text-left p-6 bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl border border-gray-200 hover-lift animate-slide-in-up delay-${(index + 1) * 100} hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <feature.icon className="w-6 h-6 text-orange-500 animate-bounce-gentle" />
                      <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full animate-shimmer ${feature.status === 'Active'
                          ? 'bg-green-100 text-green-600 animate-pulse-glow'
                          : 'bg-orange-100 text-orange-600'
                        }`}>
                        {feature.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm animate-fade-in delay-200">{feature.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover-lift transition-all duration-1000 delay-${fateFlashbacks.length > 0 ? '600' : '500'} ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 animate-pulse-glow">
                  {profile.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-gray-800 animate-slide-in-up">{profile.name}</h3>
                <p className="text-gray-600 animate-slide-in-up delay-100">{profile.age} • {profile.location_city}, {profile.location_state}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 animate-slide-in-left delay-200">
                  <Heart className="w-4 h-4 text-orange-500 animate-heart-beat" />
                  <span className="text-sm text-gray-600">Looking for {profile.looking_for}</span>
                </div>
                <div className="flex items-center space-x-3 animate-slide-in-left delay-300">
                  <Sparkles className="w-4 h-4 text-orange-500 animate-bounce-gentle" />
                  <span className="text-sm text-gray-600">{profile.cultural_background} background</span>
                </div>
                <div className="flex items-center space-x-3 animate-slide-in-left delay-400">
                  {profile.is_verified ? (
                    <VerifiedByBharatBadge
                      verificationTypes={profile.verification_types || ['government_id']}
                      size="sm"
                      className="flex-shrink-0"
                    />
                  ) : (
                    <>
                      <Shield className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-gray-600">Verification Pending</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover-lift transition-all duration-1000 delay-${fateFlashbacks.length > 0 ? '800' : '700'} ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <h3 className="text-lg font-bold text-gray-800 mb-4 animate-slide-in-up">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/discover')}
                  className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 transition-all border border-orange-100 hover-lift animate-slide-in-left delay-100"
                >
                  <span className="text-gray-700 font-medium">Start Discovering</span>
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 transition-all border border-orange-100 hover-lift animate-slide-in-left delay-200"
                >
                  <span className="text-gray-700 font-medium">Update Profile</span>
                </button>
                <button
                  onClick={() => navigate('/safety')}
                  className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 transition-all border border-orange-100 hover-lift animate-slide-in-left delay-300"
                >
                  <span className="text-gray-700 font-medium">Safety Settings</span>
                </button>
                <button
                  onClick={() => navigate('/fate-flashbacks')}
                  className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 transition-all border border-orange-100 hover-lift animate-slide-in-left delay-400"
                >
                  <span className="text-gray-700 font-medium">View Fate Stories</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
