import { useState, useEffect } from 'react';
import { Star, Heart, Sparkles, Calendar, Clock } from 'lucide-react';



interface CompatibilityResult {
  score: number;
  description: string;
  strengths: string[];
  challenges: string[];
  tips: string[];
}

interface RashiCompatibilityProps {
  userRashi?: string;
  partnerRashi?: string;
  showCalculator?: boolean;
  compact?: boolean;
  className?: string;
}

const RASHI_OPTIONS = [
  { name: 'Mesha (Aries)', value: 'Aries', element: 'Fire', planet: 'Mars', color: 'Red', number: 9 },
  { name: 'Vrishabha (Taurus)', value: 'Taurus', element: 'Earth', planet: 'Venus', color: 'Green', number: 6 },
  { name: 'Mithuna (Gemini)', value: 'Gemini', element: 'Air', planet: 'Mercury', color: 'Yellow', number: 5 },
  { name: 'Karka (Cancer)', value: 'Cancer', element: 'Water', planet: 'Moon', color: 'White', number: 2 },
  { name: 'Simha (Leo)', value: 'Leo', element: 'Fire', planet: 'Sun', color: 'Golden', number: 1 },
  { name: 'Kanya (Virgo)', value: 'Virgo', element: 'Earth', planet: 'Mercury', color: 'Green', number: 6 },
  { name: 'Tula (Libra)', value: 'Libra', element: 'Air', planet: 'Venus', color: 'Pink', number: 7 },
  { name: 'Vrishchika (Scorpio)', value: 'Scorpio', element: 'Water', planet: 'Mars', color: 'Red', number: 9 },
  { name: 'Dhanu (Sagittarius)', value: 'Sagittarius', element: 'Fire', planet: 'Jupiter', color: 'Yellow', number: 3 },
  { name: 'Makara (Capricorn)', value: 'Capricorn', element: 'Earth', planet: 'Saturn', color: 'Black', number: 8 },
  { name: 'Kumbha (Aquarius)', value: 'Aquarius', element: 'Air', planet: 'Saturn', color: 'Blue', number: 8 },
  { name: 'Meena (Pisces)', value: 'Pisces', element: 'Water', planet: 'Jupiter', color: 'Purple', number: 3 }
];

export default function RashiCompatibility({ 
  userRashi, 
  partnerRashi, 
  showCalculator = true, 
  compact = false,
  className = '' 
}: RashiCompatibilityProps) {
  const [selectedUserRashi, setSelectedUserRashi] = useState(userRashi || '');
  const [selectedPartnerRashi, setSelectedPartnerRashi] = useState(partnerRashi || '');
  const [compatibility, setCompatibility] = useState<CompatibilityResult | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showBirthDetails, setShowBirthDetails] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (selectedUserRashi && selectedPartnerRashi) {
      calculateCompatibility();
    }
  }, [selectedUserRashi, selectedPartnerRashi]);

  const calculateCompatibility = async () => {
    // Mock compatibility calculation - in real app, this would call an API
    const mockCompatibility = generateMockCompatibility(selectedUserRashi, selectedPartnerRashi);
    setCompatibility(mockCompatibility);
  };

  const generateMockCompatibility = (rashi1: string, rashi2: string): CompatibilityResult => {
    const userRashiData = RASHI_OPTIONS.find(r => r.value === rashi1);
    const partnerRashiData = RASHI_OPTIONS.find(r => r.value === rashi2);
    
    if (!userRashiData || !partnerRashiData) {
      return {
        score: 50,
        description: 'Basic compatibility analysis available',
        strengths: ['Mutual respect'],
        challenges: ['Different perspectives'],
        tips: ['Communication is key']
      };
    }

    // Element compatibility logic
    const sameElement = userRashiData.element === partnerRashiData.element;
    const complementaryElements = 
      (userRashiData.element === 'Fire' && partnerRashiData.element === 'Air') ||
      (userRashiData.element === 'Air' && partnerRashiData.element === 'Fire') ||
      (userRashiData.element === 'Earth' && partnerRashiData.element === 'Water') ||
      (userRashiData.element === 'Water' && partnerRashiData.element === 'Earth');

    let score = 50;
    let description = '';
    let strengths: string[] = [];
    let challenges: string[] = [];
    let tips: string[] = [];

    if (sameElement) {
      score += 30;
      description = `Excellent compatibility! Both ${userRashiData.element} signs create natural harmony.`;
      strengths = [`Shared ${userRashiData.element.toLowerCase()} element energy`, 'Natural understanding', 'Similar life approach'];
      challenges = ['Might be too similar sometimes', 'Need to add variety'];
      tips = ['Embrace your similarities', 'Plan adventures together', 'Support each other\'s goals'];
    } else if (complementaryElements) {
      score += 20;
      description = `Great match! ${userRashiData.element} and ${partnerRashiData.element} elements complement each other beautifully.`;
      strengths = ['Balanced energy', 'Complementary traits', 'Growth through differences'];
      challenges = ['Need patience with differences', 'Communication styles may vary'];
      tips = ['Learn from each other', 'Appreciate different perspectives', 'Find common ground'];
    } else {
      score += 10;
      description = `Good potential! ${userRashiData.element} and ${partnerRashiData.element} signs can create interesting dynamics.`;
      strengths = ['Opportunity for growth', 'Learn new perspectives', 'Exciting differences'];
      challenges = ['Different approaches to life', 'May need extra effort'];
      tips = ['Practice patience', 'Focus on shared values', 'Celebrate differences'];
    }

    // Add random factor for variety
    score += Math.floor(Math.random() * 20) - 10;
    score = Math.max(30, Math.min(95, score));

    return { score, description, strengths, challenges, tips };
  };

  const getRashiData = (rashiValue: string) => {
    return RASHI_OPTIONS.find(r => r.value === rashiValue);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  if (compact && compatibility) {
    return (
      <div className={`bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200 ${className}`}>
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-r ${getScoreColor(compatibility.score)} rounded-xl flex items-center justify-center`}>
            <Star className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-gray-800">{compatibility.score}%</span>
              <span className="text-sm text-purple-600 font-medium">Rashi Match</span>
            </div>
            <p className="text-xs text-gray-600">{selectedUserRashi} × {selectedPartnerRashi}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover-lift transition-all duration-700 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'} ${className}`}>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 animate-slide-in-left">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg animate-neon-glow">
          <Star className="w-6 h-6 text-white" fill="currentColor" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Rashi Compatibility 🔮
          </h3>
          <p className="text-sm text-gray-600">Match by heart + stars</p>
        </div>
      </div>

      {showCalculator && (
        <div className="space-y-4 mb-6">
          {/* Rashi Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="animate-slide-in-left delay-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Rashi</label>
              <select
                value={selectedUserRashi}
                onChange={(e) => setSelectedUserRashi(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select your rashi</option>
                {RASHI_OPTIONS.map((rashi) => (
                  <option key={rashi.value} value={rashi.value}>
                    {rashi.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="animate-slide-in-right delay-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Partner's Rashi</label>
              <select
                value={selectedPartnerRashi}
                onChange={(e) => setSelectedPartnerRashi(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select partner's rashi</option>
                {RASHI_OPTIONS.map((rashi) => (
                  <option key={rashi.value} value={rashi.value}>
                    {rashi.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Birth Details Toggle */}
          <button
            onClick={() => setShowBirthDetails(!showBirthDetails)}
            className="w-full text-left p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Need birth details for accurate match?</span>
              </div>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
          </button>

          {showBirthDetails && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 animate-slide-in-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-purple-700 mb-1">Birth Date</label>
                  <input
                    type="date"
                    className="w-full px-2 py-1 text-sm border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-700 mb-1">Birth Time</label>
                  <input
                    type="time"
                    className="w-full px-2 py-1 text-sm border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-700 mb-1">Birth Place</label>
                  <input
                    type="text"
                    placeholder="City, State"
                    className="w-full px-2 py-1 text-sm border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <p className="text-xs text-purple-600 mt-2">
                💫 Accurate birth details provide precise Kundli matching and Mangal Dosh analysis
              </p>
            </div>
          )}
        </div>
      )}

      {/* Compatibility Results */}
      {compatibility && (
        <div className="space-y-6 animate-fade-in delay-400">
          {/* Score Display */}
          <div className="text-center">
            <div className={`w-24 h-24 bg-gradient-to-r ${getScoreColor(compatibility.score)} rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow`}>
              <span className="text-2xl font-bold text-white">{compatibility.score}%</span>
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Compatibility Score
            </h4>
            <p className="text-gray-600 text-sm">{compatibility.description}</p>
          </div>

          {/* Rashi Details */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { rashi: selectedUserRashi, label: 'Your Rashi' },
              { rashi: selectedPartnerRashi, label: 'Partner\'s Rashi' }
            ].map((item, index) => {
              const rashiData = getRashiData(item.rashi);
              if (!rashiData) return null;

              return (
                <div key={index} className={`bg-gradient-to-r from-gray-50 to-white rounded-lg p-3 border animate-slide-in-up delay-${(index + 1) * 100}`}>
                  <h5 className="font-semibold text-gray-800 text-sm mb-2">{item.label}</h5>
                  <p className="font-bold text-purple-600 mb-1">{rashiData.name}</p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Element: {rashiData.element}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Planet: {rashiData.planet}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>Lucky: {rashiData.color} • {rashiData.number}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strengths & Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200 animate-slide-in-left delay-500">
              <h5 className="font-semibold text-green-800 mb-2 flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Strengths</span>
              </h5>
              <ul className="text-sm text-green-700 space-y-1">
                {compatibility.strengths.map((strength, idx) => (
                  <li key={idx}>• {strength}</li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 animate-slide-in-right delay-500">
              <h5 className="font-semibold text-orange-800 mb-2 flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Growth Areas</span>
              </h5>
              <ul className="text-sm text-orange-700 space-y-1">
                {compatibility.challenges.map((challenge, idx) => (
                  <li key={idx}>• {challenge}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 animate-slide-in-up delay-600">
            <h5 className="font-semibold text-purple-800 mb-2 flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Relationship Tips</span>
            </h5>
            <ul className="text-sm text-purple-700 space-y-1">
              {compatibility.tips.map((tip, idx) => (
                <li key={idx}>💫 {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-6 text-center animate-fade-in delay-700">
        <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift font-medium">
          Get Full Kundli Analysis 🔮
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Detailed compatibility report with Mangal Dosh, Nakshatra matching & more
        </p>
      </div>
    </div>
  );
}
