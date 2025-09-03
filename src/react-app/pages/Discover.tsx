import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router';
import { 
  Heart, Sparkles, MapPin, MessageCircle, Star, Filter, X, ArrowLeft, 
  Eye, Users, Clock, Brain, Globe, TreePine, Home, Briefcase, Music,
  Coffee
} from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';

interface PotentialMatch {
  id: number;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  culturalBackground: string;
  distance: string;
  compatibility: number;
  sharedFestivals: string[];
  imageInitial: string;
  isVerified: boolean;
  sharedPlaces?: string[];
  sharedMusic?: string[];
  sharedFood?: string[];
  familyValues?: string[];
  profession?: string;
  currentMood?: string;
  moodMatch?: number;
  lastSeen?: string;
  crossedPaths?: Array<{
    location: string;
    date: string;
    timeDiff: string;
  }>;
}

type DiscoveryMode =
  | 'standard'
  | 'pehli_nazar'
  | 'rishta'
  | 'missed_moments'
  | 'mood_based'
  | 'cultural_cross'
  | 'fated_crossings';

export default function Discover() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [potentialMatches, setPotentialMatches] = useState<PotentialMatch[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [discoveryMode, setDiscoveryMode] = useState<DiscoveryMode>('standard');
  const [filters, setFilters] = useState({
    ageRange: [22, 35],
    maxDistance: 50,
    culturalBackground: '',
    lookingFor: '',
    mood: '',
    familyValues: ''
  });

  useEffect(() => {
    setIsVisible(true);

    // Dummy profile
    const mockProfile = {
      name: "Chandler Bing",
      age: 32,
      interested_in: "everyone",
      looking_for: "friends"
    };
    setUserProfile(mockProfile);
    loadPotentialMatches(mockProfile);

    // Load Google Fonts
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [discoveryMode]);

  const loadPotentialMatches = (profile: any) => {
    let mockMatches: PotentialMatch[] = [
      {
        id: 1,
        name: "Priya",
        age: 26,
        gender: "woman",
        location: "Chandigarh, Punjab",
        bio: "Poetry lover, classical dancer, and software engineer. Looking for someone who appreciates the beauty in small moments.",
        culturalBackground: "Punjabi",
        distance: "15 km away",
        compatibility: 92,
        sharedFestivals: ["Diwali", "Baisakhi", "Karva Chauth"],
        imageInitial: "P",
        isVerified: true,
        sharedPlaces: ["Golden Temple", "Rock Garden", "Sukhna Lake"],
        sharedMusic: ["Classical Indian", "Punjabi Folk", "Bollywood"],
        sharedFood: ["Butter Chicken", "Rajma Chawal", "Kulfi"],
        familyValues: ["Traditional", "Education-focused", "Close-knit"],
        profession: "Software Engineer",
        currentMood: "contemplative",
        moodMatch: 88,
        lastSeen: "2 hours ago",
        crossedPaths: [
          { location: "Sector 17 Plaza", date: "Last Sunday", timeDiff: "3 hours apart" },
          { location: "Chandigarh Railway Station", date: "3 days ago", timeDiff: "1 hour apart" }
        ]
      },
      {
        id: 2,
        name: "Arjun",
        age: 29,
        gender: "man",
        location: "Jalandhar, Punjab",
        bio: "Photographer and travel enthusiast. Believes in serendipitous meetings and authentic connections.",
        culturalBackground: "Punjabi",
        distance: "22 km away",
        compatibility: 87,
        sharedFestivals: ["Holi", "Diwali", "Lohri"],
        imageInitial: "A",
        isVerified: false,
        sharedPlaces: ["Wonderland Theme Park", "Pushpa Gujral Science City"],
        sharedMusic: ["Rock", "Jazz", "Punjabi Pop"],
        sharedFood: ["Pizza", "Makki di Roti", "Lassi"],
        familyValues: ["Modern", "Adventurous", "Independent"],
        profession: "Photographer",
        currentMood: "adventurous",
        moodMatch: 91,
        lastSeen: "1 day ago",
        crossedPaths: [
          { location: "Cafe Coffee Day, Jalandhar", date: "Yesterday", timeDiff: "30 minutes apart" }
        ]
      },
      {
        id: 3,
        name: "Simran",
        age: 24,
        gender: "woman",
        location: "Amritsar, Punjab",
        bio: "Doctor by profession, artist by passion. Love cooking traditional Punjabi food and modern fusion dishes.",
        culturalBackground: "Punjabi",
        distance: "35 km away",
        compatibility: 89,
        sharedFestivals: ["Baisakhi", "Diwali", "Navratri"],
        imageInitial: "S",
        isVerified: true,
        sharedPlaces: ["Jallianwala Bagh", "Wagah Border", "Golden Temple"],
        sharedMusic: ["Sufi", "Classical", "Indie"],
        sharedFood: ["Amritsari Kulcha", "Chole Bhature", "Falooda"],
        familyValues: ["Service-oriented", "Spiritual", "Ambitious"],
        profession: "Doctor",
        currentMood: "peaceful",
        moodMatch: 85,
        lastSeen: "5 hours ago",
        crossedPaths: [
          { location: "Golden Temple Complex", date: "Last Friday", timeDiff: "45 minutes apart" },
          { location: "Apollo Hospital", date: "1 week ago", timeDiff: "2 hours apart" }
        ]
      },
      {
        id: 4,
        name: "Rajesh",
        age: 31,
        gender: "man",
        location: "Ludhiana, Punjab",
        bio: "Tech entrepreneur who loves traditional music and modern art. Always up for deep conversations over chai.",
        culturalBackground: "Punjabi",
        distance: "8 km away",
        compatibility: 91,
        sharedFestivals: ["Baisakhi", "Diwali", "Holi"],
        imageInitial: "R",
        isVerified: true,
        sharedPlaces: ["Punjab Agricultural University", "Maharaja Ranjit Singh War Museum"],
        sharedMusic: ["Classical Indian", "Jazz", "Electronic"],
        sharedFood: ["Tandoori Chicken", "Sarson da Saag", "Masala Chai"],
        familyValues: ["Entrepreneurial", "Intellectual", "Family-first"],
        profession: "Tech Entrepreneur",
        currentMood: "curious",
        moodMatch: 94,
        lastSeen: "30 minutes ago",
        crossedPaths: [
          { location: "Pavilion Mall", date: "Today", timeDiff: "15 minutes apart" },
          { location: "Starbucks, Feroze Gandhi Market", date: "2 days ago", timeDiff: "5 minutes apart" }
        ]
      }
    ];

    // Filter based on user preferences
    if (profile?.interested_in && profile.interested_in !== 'everyone') {
      if (profile.interested_in === 'men') {
        mockMatches = mockMatches.filter((match) => match.gender === 'man');
      } else if (profile.interested_in === 'women') {
        mockMatches = mockMatches.filter((match) => match.gender === 'woman');
      }
    }

    // Filter based on discovery mode
    if (discoveryMode === 'rishta') {
      mockMatches = mockMatches.filter(
        (match) =>
          profile?.looking_for === 'marriage' ||
          match.profession === 'Doctor' ||
          match.profession === 'Engineer'
      );
    }

    setPotentialMatches(mockMatches);
    setCurrentMatchIndex(0);
  };

  const handleLike = () => {
    console.log('Liked:', potentialMatches[currentMatchIndex]);
    nextMatch();
  };

  const handlePass = () => {
    nextMatch();
  };

  const nextMatch = () => {
    if (currentMatchIndex < potentialMatches.length - 1) {
      setCurrentMatchIndex((prev) => prev + 1);
    } else {
      setCurrentMatchIndex(0);
    }
  };

  const getDiscoveryModeIcon = (mode: DiscoveryMode) => {
    switch (mode) {
      case 'pehli_nazar': return <Eye className="w-5 h-5" />;
      case 'rishta': return <Users className="w-5 h-5" />;
      case 'missed_moments': return <Clock className="w-5 h-5" />;
      case 'mood_based': return <Brain className="w-5 h-5" />;
      case 'cultural_cross': return <Globe className="w-5 h-5" />;
      default: return <Heart className="w-5 h-5" />;
    }
  };

  const getDiscoveryModeTitle = (mode: DiscoveryMode) => {
    switch (mode) {
      case 'pehli_nazar': return 'Pehli Nazar';
      case 'rishta': return 'Rishta Mode';
      case 'missed_moments': return 'Missed Moments';
      case 'mood_based': return 'Mood Match';
      case 'cultural_cross': return 'Cultural Cross';
      case 'fated_crossings': return 'Fated Crossings';
      default: return 'Find The One';
    }
  };

  const currentMatch = potentialMatches[currentMatchIndex];

  const renderModeSpecificContent = () => {
    if (!currentMatch) return null;

    switch (discoveryMode) {
      case 'pehli_nazar':
        return (
          <div className="space-y-6">
            <div className="animate-slide-in-left delay-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <TreePine className="w-5 h-5 text-green-600" />
                <span>Shared Sacred Places</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentMatch.sharedPlaces?.map((place, idx) => (
                  <span
                    key={place}
                    className={`bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium animate-slide-in-up delay-${(idx + 1) * 100}`}
                  >
                    {place}
                  </span>
                ))}
              </div>
            </div>

            <div className="animate-slide-in-left delay-400">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <Music className="w-5 h-5 text-purple-600" />
                <span>Musical Harmony</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentMatch.sharedMusic?.map((music, idx) => (
                  <span
                    key={music}
                    className={`bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium animate-slide-in-up delay-${(idx + 1) * 100}`}
                  >
                    {music}
                  </span>
                ))}
              </div>
            </div>

            <div className="animate-slide-in-left delay-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <Coffee className="w-5 h-5 text-orange-600" />
                <span>Culinary Connection</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentMatch.sharedFood?.map((food, idx) => (
                  <span
                    key={food}
                    className={`bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium animate-slide-in-up delay-${(idx + 1) * 100}`}
                  >
                    {food}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'rishta':
        return (
          <div className="space-y-6">
            <div className="animate-slide-in-left delay-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <Home className="w-5 h-5 text-blue-600" />
                <span>Family Values</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentMatch.familyValues?.map((value, idx) => (
                  <span
                    key={value}
                    className={`bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium animate-slide-in-up delay-${(idx + 1) * 100}`}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>

            <div className="animate-slide-in-left delay-400">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-gray-600" />
                <span>Professional Life</span>
              </h3>
              <p className="text-gray-700 bg-gray-50 px-4 py-3 rounded-lg">
                <span className="font-medium">{currentMatch.profession}</span>
              </p>
            </div>
          </div>
        );

      case 'missed_moments':
        return (
          <div className="space-y-6">
            <div className="animate-slide-in-left delay-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>Timeline Crossings</span>
              </h3>
              <div className="space-y-3">
                {currentMatch.crossedPaths?.map((crossing, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 p-4 rounded-lg animate-slide-in-up delay-${(idx + 1) * 100}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-red-800">{crossing.location}</span>
                      <span className="text-sm text-red-600">{crossing.timeDiff}</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">{crossing.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'mood_based':
        return (
          <div className="space-y-6">
            <div className="animate-slide-in-left delay-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <Brain className="w-5 h-5 text-indigo-600" />
                <span>Emotional Resonance</span>
              </h3>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-indigo-800 capitalize">{currentMatch.currentMood}</span>
                  <span className="text-sm text-indigo-600">{currentMatch.moodMatch}% mood sync</span>
                </div>
                <p className="text-sm text-indigo-700">
                  Both feeling {currentMatch.currentMood} right now - perfect time for a meaningful connection
                </p>
              </div>
            </div>
          </div>
        );

      case 'cultural_cross':
        return (
          <div className="space-y-6">
            <div className="animate-slide-in-left delay-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <Globe className="w-5 h-5 text-teal-600" />
                <span>Global Cultural Bridge</span>
              </h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 p-4 rounded-lg">
                  <span className="font-medium text-teal-800">Indian Traditions</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentMatch.sharedFestivals.slice(0, 2).map((festival) => (
                      <span
                        key={festival}
                        className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs"
                      >
                        {festival}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-lg">
                  <span className="font-medium text-blue-800">Universal Celebrations</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">New Year</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Music Festivals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="animate-slide-in-left delay-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
              <p className="text-gray-600 leading-relaxed">{currentMatch.bio}</p>
            </div>

            <div className="animate-slide-in-left delay-400">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Cultural Background</h3>
              <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                {currentMatch.culturalBackground}
              </span>
            </div>

            <div className="animate-slide-in-left delay-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Shared Celebrations</h3>
              <div className="flex flex-wrap gap-2">
                {currentMatch.sharedFestivals.map((festival, idx) => (
                  <span
                    key={festival}
                    className={`bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium animate-slide-in-up delay-${(idx + 1) * 100}`}
                  >
                    {festival}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

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
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg hover-glow animate-heart-beat">
              {getDiscoveryModeIcon(discoveryMode)}
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              {getDiscoveryModeTitle(discoveryMode)}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowFilters(true)}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button 
              onClick={() => navigate('/messages')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Central Perk</span>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">My Story</span>
            </button>
            <button 
              onClick={logout}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Out</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Discovery Mode Selector */}
        <div className={`mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div className="flex flex-wrap gap-3">
            {[
              { mode: 'standard' as DiscoveryMode, label: 'Find The One', desc: 'How you doin\'?' },
              { mode: 'pehli_nazar' as DiscoveryMode, label: 'Pehli Nazar', desc: 'Love at first sight' },
              { mode: 'rishta' as DiscoveryMode, label: 'Rishta Mode', desc: 'Could I BE more serious?' },
              { mode: 'missed_moments' as DiscoveryMode, label: 'Missed Moments', desc: 'We were on a break!' },
              { mode: 'mood_based' as DiscoveryMode, label: 'Mood Match', desc: 'That\'s what she said' },
              { mode: 'cultural_cross' as DiscoveryMode, label: 'Cultural Cross', desc: 'Suit up for love' },
              { mode: 'fated_crossings' as DiscoveryMode, label: 'Fated Crossings', desc: 'Legend... wait for it' }
            ].map((modeOption) => (
              <button
                key={modeOption.mode}
                onClick={() => setDiscoveryMode(modeOption.mode)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  discoveryMode === modeOption.mode
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg animate-pulse-glow'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover-lift'
                }`}
              >
                {getDiscoveryModeIcon(modeOption.mode)}
                <div className="text-left">
                  <div className="font-medium text-sm">{modeOption.label}</div>
                  <div className="text-xs opacity-75">{modeOption.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-text-reveal" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            {discoveryMode === 'pehli_nazar' && 'Could This BE Any More Perfect? ✨'}
            {discoveryMode === 'rishta' && 'How You Doin\'? Ready for Marriage? 💍'}
            {discoveryMode === 'missed_moments' && 'We Were On A Break... from Love! ⏰'}
            {discoveryMode === 'mood_based' && 'That\'s What She Said About Emotions! 🧠'}
            {discoveryMode === 'cultural_cross' && 'SUIT UP! For Cross-Cultural Love 🌍'}
            {discoveryMode === 'fated_crossings' && 'It\'s Gonna Be Legend... Wait For It... 📍'}
            {discoveryMode === 'standard' && 'Shhava... Starts Here! 💜'}
          </h1>
          <p className="text-gray-600 text-lg animate-slide-in-left delay-400" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            {discoveryMode === 'pehli_nazar' && 'Could you BE any more compatible? Finding your cultural twin!'}
            {discoveryMode === 'rishta' && 'Not Ross and Emily level serious - this is the real deal!'}
            {discoveryMode === 'missed_moments' && 'Like Ted\'s yellow umbrella - destiny was right there!'}
            {discoveryMode === 'mood_based' && 'Matching feelings faster than Joey eats pizza!'}
            {discoveryMode === 'cultural_cross' && 'Bridging cultures like Barney bridges... well, everything!'}
            {discoveryMode === 'fated_crossings' && 'DARY! Real-world encounters that would make MacLaren\'s jealous'}
            {discoveryMode === 'standard' && 'The mother of all dating apps - your story starts now!'}
          </p>
        </div>

        {currentMatch ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Match Card */}
            <div className="lg:col-span-2">
              <div className={`bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover-lift transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
                <div className="text-center mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6 animate-pulse-glow">
                    {currentMatch.imageInitial}
                  </div>
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <h2 className="text-3xl font-bold text-gray-800 animate-slide-in-up" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                      {currentMatch.name}, {currentMatch.age}
                    </h2>
                    <VerifiedBadge isVerified={currentMatch.isVerified} size="md" />
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4 animate-slide-in-up delay-100">
                    <MapPin className="w-4 h-4" />
                    <span>{currentMatch.location}</span>
                    <span>•</span>
                    <span>{currentMatch.distance}</span>
                    {discoveryMode === 'mood_based' && (
                      <>
                        <span>•</span>
                        <span className="capitalize text-indigo-600">{currentMatch.currentMood}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-center space-x-2 mb-6 animate-slide-in-up delay-200">
                    <Star className="w-5 h-5 text-purple-500" fill="currentColor" />
                    <span className="text-lg font-semibold text-gray-700" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                      {discoveryMode === 'mood_based' ? `${currentMatch.moodMatch}% Mood Match` : `${currentMatch.compatibility}% Lobster Material`}
                    </span>
                  </div>
                </div>

                {renderModeSpecificContent()}

                {/* Action Buttons */}
                <div className="flex justify-center space-x-6 mt-8 animate-slide-in-up delay-600">
                  <button
                    onClick={handlePass}
                    className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:scale-110 transition-all duration-300 hover-lift"
                    title="Could you BE any more wrong for me?"
                  >
                    <X className="w-8 h-8" />
                  </button>
                  <button
                    onClick={handleLike}
                    className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:shadow-xl hover:scale-110 transition-all duration-300 hover-glow animate-pulse-glow"
                    title="How YOU doin'? 😏"
                  >
                    <Heart className="w-10 h-10" fill="currentColor" />
                  </button>
                  <button
                    onClick={() => navigate('/messages')}
                    className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 hover:scale-110 transition-all duration-300 hover-lift"
                    title="Could this BE any more Central Perk?"
                  >
                    <MessageCircle className="w-8 h-8" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Mode Stats */}
              <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover-lift transition-all duration-1000 delay-600 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
                <h3 className="text-lg font-bold text-gray-800 mb-4 animate-slide-in-up" style={{ fontFamily: 'Fredoka, sans-serif' }}>That's What She Said About Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center animate-slide-in-left delay-100">
                    <span className="text-gray-600">Episodes Watched</span>
                    <span className="font-semibold text-purple-600">{currentMatchIndex + 1}</span>
                  </div>
                  <div className="flex justify-between items-center animate-slide-in-left delay-200">
                    <span className="text-gray-600">
                      {discoveryMode === 'missed_moments' && 'We Were On A Break... Crossings'}
                      {discoveryMode === 'mood_based' && 'Mood Ring Matches'}
                      {discoveryMode === 'rishta' && 'Marriage Material Found'}
                      {(discoveryMode === 'pehli_nazar' || discoveryMode === 'cultural_cross') && 'Cultural High-Fives'}
                      {discoveryMode === 'standard' && 'Legendary Connections'}
                    </span>
                    <span className="font-semibold text-pink-600">
                      {discoveryMode === 'missed_moments' && currentMatch.crossedPaths?.length || 3}
                      {discoveryMode !== 'missed_moments' && 5}
                    </span>
                  </div>
                  <div className="flex justify-between items-center animate-slide-in-left delay-300">
                    <span className="text-gray-600">SUIT UP! Likes Left</span>
                    <span className="font-semibold text-yellow-600">∞</span>
                  </div>
                </div>
              </div>

              {/* Mode Tips */}
              <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover-lift transition-all duration-1000 delay-700 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
                <div className="flex items-center space-x-2 mb-4 animate-slide-in-up">
                  <Sparkles className="w-5 h-5 text-purple-500 animate-bounce-gentle" />
                  <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Barney's Dating Playbook</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  {discoveryMode === 'pehli_nazar' && (
                    <>
                      <p className="animate-slide-in-left delay-100">🏛️ Connect through sacred places like Ross with dinosaurs</p>
                      <p className="animate-slide-in-left delay-200">🎵 Bond over music better than Ross's keyboards</p>
                      <p className="animate-slide-in-left delay-300">🍛 Share food traditions (not like Joey sharing)</p>
                    </>
                  )}
                  {discoveryMode === 'rishta' && (
                    <>
                      <p className="animate-slide-in-left delay-100">👨‍👩‍👧‍👦 Family values stronger than Monica's cleaning</p>
                      <p className="animate-slide-in-left delay-200">💼 Career compatibility (unlike Ross's teaching)</p>
                      <p className="animate-slide-in-left delay-300">🎯 Long-term goals clearer than Chandler's job</p>
                    </>
                  )}
                  {discoveryMode === 'missed_moments' && (
                    <>
                      <p className="animate-slide-in-left delay-100">📍 Timeline crossings like Ted's yellow umbrella</p>
                      <p className="animate-slide-in-left delay-200">⏰ Notice patterns better than Barney notices suits</p>
                      <p className="animate-slide-in-left delay-300">✨ Embrace destiny like Marshall embraces law</p>
                    </>
                  )}
                  {discoveryMode === 'mood_based' && (
                    <>
                      <p className="animate-slide-in-left delay-100">🧠 Match vibes faster than Joey says "How you doin'?"</p>
                      <p className="animate-slide-in-left delay-200">💭 Connect through feelings (not Ross's gel)</p>
                      <p className="animate-slide-in-left delay-300">🌊 Ride mood waves like Phoebe's songs</p>
                    </>
                  )}
                  {discoveryMode === 'cultural_cross' && (
                    <>
                      <p className="animate-slide-in-left delay-100">🌍 Bridge cultures like Apu bridges... everything</p>
                      <p className="animate-slide-in-left delay-200">🎉 Celebrate diversity (more than The Office)</p>
                      <p className="animate-slide-in-left delay-300">🤝 Find common ground like Central Perk's couch</p>
                    </>
                  )}
                  {discoveryMode === 'standard' && (
                    <>
                      <p className="animate-slide-in-left delay-100">💫 Look for compatibility scores higher than Barney's</p>
                      <p className="animate-slide-in-left delay-200">💝 Check chemistry stronger than Ross and Rachel's</p>
                      <p className="animate-slide-in-left delay-300">✨ Send messages funnier than Chandler's jokes</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Fredoka, sans-serif' }}>Could This BE Any More Empty?</h3>
            <p className="text-gray-500 mb-8">No more potential matches right now - even Ted had to wait for The Mother!</p>
            <button
              onClick={() => setCurrentMatchIndex(0)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              SUIT UP! Start Over
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 m-6 max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-in-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Could These BE Any More Filters?
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Standard Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Range (Because Age IS Just a Number)</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={filters.ageRange[0]}
                    onChange={(e) => setFilters(prev => ({ ...prev, ageRange: [parseInt(e.target.value), prev.ageRange[1]] }))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    min="18"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    value={filters.ageRange[1]}
                    onChange={(e) => setFilters(prev => ({ ...prev, ageRange: [prev.ageRange[0], parseInt(e.target.value)] }))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    max="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance from Central Perk: {filters.maxDistance} km
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={filters.maxDistance}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>

              {/* Mode-specific Filters */}
              {discoveryMode === 'mood_based' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Vibe Check</label>
                  <select
                    value={filters.mood}
                    onChange={(e) => setFilters(prev => ({ ...prev, mood: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Any mood (like Joey with food)</option>
                    <option value="adventurous">Adventurous (Barney level)</option>
                    <option value="contemplative">Contemplative (Ross with dinosaurs)</option>
                    <option value="curious">Curious (Phoebe level weird)</option>
                    <option value="peaceful">Peaceful (Monica organized)</option>
                    <option value="romantic">Romantic (Ted level cheesy)</option>
                  </select>
                </div>
              )}

              {discoveryMode === 'rishta' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Family Values (Monica's Standards)</label>
                  <select
                    value={filters.familyValues}
                    onChange={(e) => setFilters(prev => ({ ...prev, familyValues: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Any values (except Ross's)</option>
                    <option value="traditional">Traditional (like Thanksgiving)</option>
                    <option value="modern">Modern (like Chandler's humor)</option>
                    <option value="spiritual">Spiritual (Phoebe vibes)</option>
                    <option value="ambitious">Ambitious (Monica's cooking)</option>
                  </select>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Nevermind
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                  style={{ fontFamily: 'Fredoka, sans-serif' }}
                >
                  LEGENDARY!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
