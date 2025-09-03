import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Sparkles, Plus, Clock, Menu, X } from "lucide-react";
import FateFlashbackCard, { FateFlashback } from "../components/FateFlashbackCard";
import VerifiedByBharatBadge from "../components/VerifiedByBharatBadge";
import Footer from "../components/footer";


export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Mock profile
  const [profile] = useState<any>({
    name: "Chandler Bing",
    age: 32,
    location_city: "New York",
    location_state: "NY",
    looking_for: "Friends... or more 😉",
    cultural_background: "Sitcom Universe",
    is_verified: true,
    verification_types: ["government_id"],
  });

  const [serendipityMoments, setSerendipityMoments] = useState<any[]>([
    {
      id: "1",
      location_name: "Central Perk",
      emotional_state: "nostalgic",
      moment_description: "Shared a coffee glance over a giant orange couch ☕",
      created_at: new Date().toISOString(),
    },
  ]);

  const [fateFlashbacks, setFateFlashbacks] = useState<FateFlashback[]>([
    {
      _id: "101",
      title: "The One with the Missed Coffee",
      story_content:
        "You and someone special ordered coffee at the same time, but at different counters. Classic sitcom timing!",
      week_start_date: "2025-08-25",
      week_end_date: "2025-09-01",
      crossings_count: 3,
      shared_locations: ["Central Perk", "Coffee House"],
      is_viewed: false,
      is_shared: false,
    },
  ]);

  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu toggle

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleViewFlashback = (id: string) => {
    setFateFlashbacks((prev) =>
      prev.map((fb) => (fb._id === id ? { ...fb, is_viewed: true } : fb))
    );
  };

  const handleShareFlashback = (id: string) => {
    setFateFlashbacks((prev) =>
      prev.map((fb) => (fb._id === id ? { ...fb, is_shared: true } : fb))
    );
  };

  const createSerendipityMoment = () => {
    setSerendipityMoments((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        location_name: "MacLaren’s Pub",
        emotional_state: "excited",
        moment_description: "Two drinks clinked at the exact same time 🍻",
        created_at: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black text-white">
      {/* Navigation */}
      <nav className="bg-black/60 backdrop-blur-lg border-b border-purple-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <img src="/logo.png" alt="icon" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Shhava
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-200">
            <button onClick={() => navigate("/discover")}>Find The One 💕</button>
            <button onClick={() => navigate("/fated-crossings")}>Missed 🎭</button>
            <button onClick={() => navigate("/fate-flashbacks")}>Stories 📚</button>
            <button onClick={() => navigate("/messages")}>Central Perk ☕</button>
            <button onClick={() => navigate("/profile")}>My Story 📖</button>
            <button onClick={logout}>Peace Out ✌️</button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-200 hover:text-pink-400 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-black/80 backdrop-blur-lg border-t border-purple-800 px-6 py-4 space-y-4 text-gray-200 text-sm font-medium">
            <button className="block w-full text-left" onClick={() => navigate("/discover")}>
              Find The One 💕
            </button>
            <button className="block w-full text-left" onClick={() => navigate("/fated-crossings")}>
              Missed 🎭
            </button>
            <button className="block w-full text-left" onClick={() => navigate("/fate-flashbacks")}>
              Stories 📚
            </button>
            <button className="block w-full text-left" onClick={() => navigate("/messages")}>
              Central Perk ☕
            </button>
            <button className="block w-full text-left" onClick={() => navigate("/profile")}>
              My Story 📖
            </button>
            <button className="block w-full text-left text-pink-400" onClick={logout}>
              Peace Out ✌️
            </button>
          </div>
        )}
      </nav>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {profile.name}, your episode starts now 🎬
          </h1>
          <p className="text-gray-400 italic">
            “Could this BE any more legendary?” –{" "}
            <span className="text-pink-400">Probably you</span>
          </p>

          {/* FIXED GIF (works on all devices) */}
          <img
            src="https://i.giphy.com/media/vNITrslTkxf8Y/giphy.gif"
            alt="Chandler sarcasm"
            className="mx-auto mt-6 rounded-2xl shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md border border-purple-700 object-contain"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Flashbacks */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg border border-purple-800/40">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-pink-400" />
                  <h2 className="text-xl md:text-2xl font-bold">This Week’s Flashbacks</h2>
                </div>
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-sm md:text-base">
                  View All
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
              <p className="mt-4 text-gray-400 text-xs md:text-sm italic">
                “It’s like Netflix weekly drops… but starring YOU.” 🍿
              </p>
            </div>

            {/* Moments */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg border border-pink-800/40">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                  <h2 className="text-xl md:text-2xl font-bold">Your Sitcom Moments</h2>
                </div>
                <button
                  onClick={createSerendipityMoment}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-white text-sm md:text-base"
                >
                  <Plus className="w-4 h-4 inline mr-1" /> Add
                </button>
              </div>
              <div className="space-y-4">
                {serendipityMoments.map((moment) => (
                  <div
                    key={moment.id}
                    className="p-4 md:p-6 bg-white/5 rounded-2xl border border-purple-700"
                  >
                    <h3 className="font-semibold">{moment.location_name}</h3>
                    <p className="text-gray-300">{moment.moment_description}</p>
                    <span className="text-xs md:text-sm text-pink-400">{moment.emotional_state}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-gray-400 text-xs md:text-sm italic">
                “Some people collect stamps. You? You collect awkward encounters.” 🙃
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-purple-700 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold mx-auto mb-4">
                  {profile.name.charAt(0)}
                </div>
                <h3 className="text-lg md:text-xl font-bold">{profile.name}</h3>
                <p className="text-gray-300 text-sm md:text-base">
                  {profile.age} • {profile.location_city}, {profile.location_state}
                </p>
              </div>

              <VerifiedByBharatBadge
                verificationTypes={profile.verification_types}
                size="sm"
              />

              <p className="text-gray-400 mt-3 text-xs italic">
                “Certified safe. Unlike Joey’s fridge.” 🥶
              </p>
            </div>


            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-black/70 via-purple-900/40 to-pink-900/40 
                backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-pink-600/50 
                hover:shadow-pink-500/20 transition-all duration-500 hover-lift">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white animate-pulse" />
                </div>
                <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Quick Actions
                </h3>
              </div>

              <div className="space-y-3">
                <button className="w-full p-2.5 md:p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-between hover:scale-105 transition-all text-sm md:text-base">
                  Start Discovering <span className="italic text-pink-200 text-xs md:text-sm">"Suit up!"</span>
                </button>
                <button className="w-full p-2.5 md:p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white flex items-center justify-between hover:scale-105 transition-all text-sm md:text-base">
                  Update Profile <span className="italic text-purple-200 text-xs md:text-sm">"Could this BE any newer?"</span>
                </button>
                <button className="w-full p-2.5 md:p-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 text-white flex items-center justify-between hover:scale-105 transition-all text-sm md:text-base">
                  Safety Settings <span className="italic text-pink-200 text-xs md:text-sm">"Pivot… to safety!"</span>
                </button>
                <button className="w-full p-2.5 md:p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white flex items-center justify-between hover:scale-105 transition-all text-sm md:text-base">
                  View Stories <span className="italic text-purple-200 text-xs md:text-sm">"Like binge-watching, but fate." 📺</span>
                </button>
              </div>

              <p className="mt-5 text-pink-300 text-xs italic text-center">
                “Quick actions… because nobody told you life was gonna be this way.” 👏👏👏👏
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
