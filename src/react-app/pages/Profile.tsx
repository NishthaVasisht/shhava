import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router';
import { Heart, ArrowLeft, Edit2, Camera, Star, Shield, Settings, MapPin, Globe } from 'lucide-react';
import { CULTURAL_BACKGROUNDS, FESTIVALS } from '../shared/types.ts';
import VerifiedBadge from '../components/VerifiedBadge';

export default function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    setIsVisible(true);
    fetchProfile();

    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/profile');
      const data = await response.json();
      setProfile(data.profile);
      if (data.profile) {
        setEditForm({
          ...data.profile,
          languages_spoken: data.profile.languages_spoken ? JSON.parse(data.profile.languages_spoken) : [],
          festivals_celebrated: data.profile.festivals_celebrated ? JSON.parse(data.profile.festivals_celebrated) : []
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        await fetchProfile();
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleArrayToggle = (field: 'languages_spoken' | 'festivals_celebrated', value: string) => {
    setEditForm((prev: Record<string, any>) => ({
      ...prev,
      [field]: prev[field]?.includes(value)
        ? prev[field].filter((item: string) => item !== value)
        : [...(prev[field] || []), value]
    }));
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <img src="./public/favicon.png" alt="icon" className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-heart-beat" />
          {/* <Heart className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-heart-beat" /> */}
          <p className="text-gray-600" style={{ fontFamily: 'Fredoka, sans-serif' }}>Could this BE loading any slower? 😄</p>
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
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg hover-glow animate-heart-beat">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              My Story
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/discover')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Find</span>
            </button>
            <button
              onClick={() => navigate('/messages')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Perk</span>
            </button>
            <button
              onClick={() => navigate('/safety')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Safe</span>
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
        {/* Profile Header */}
        <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover-lift mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold animate-pulse-glow">
                  {profile.name?.charAt(0) || '?'}
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-slide-in-left" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  {profile.name}, Could You BE Any More Awesome?
                </h1>
                <div className="flex items-center space-x-4 text-gray-600 animate-slide-in-left delay-100">
                  <span>{profile.age} years of main character energy</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location_city}, {profile.location_state}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mt-2 animate-slide-in-left delay-200">
                  <VerifiedBadge isVerified={profile.is_verified} size="md" showText />
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-100 to-yellow-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4" />
                    <span>LEGENDARY Status</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift animate-slide-in-right"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              <Edit2 className="w-4 h-4" />
              <span>{isEditing ? 'Never Mind!' : 'SUIT UP! Edit'}</span>
            </button>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className={`bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden hover-lift transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div className="flex border-b border-gray-100">
            {[
              { id: 'about', label: 'About Me', icon: Heart },
              { id: 'cultural', label: 'Cultural Vibe', icon: Globe },
              { id: 'preferences', label: 'Preferences', icon: Settings },
              { id: 'safety', label: 'Safety First', icon: Shield }
            ].map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 p-4 flex items-center justify-center space-x-2 transition-all duration-300 animate-slide-in-up delay-${(index + 1) * 100} ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-b-2 border-purple-500'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium" style={{ fontFamily: 'Fredoka, sans-serif' }}>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'about' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Story (That's What She Said!)</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.bio || ''}
                      onChange={(e) => setEditForm((prev: Record<string, any>) => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Could this story BE any more interesting? Tell us!"
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed bg-purple-50 p-4 rounded-xl">
                      {profile.bio || 'Could this BE any more mysterious? No bio added yet.'}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender (How YOU Doin'?)</label>
                    {isEditing ? (
                      <select
                        value={editForm.gender || ''}
                        onChange={(e) => setEditForm((prev: Record<string, any>) => ({ ...prev, gender: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select your vibe</option>
                        <option value="woman">Woman</option>
                        <option value="man">Man</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-700 bg-purple-50 p-3 rounded-xl capitalize">
                        {profile.gender || 'Could this BE any more mysterious?'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Looking For (Your Lobster!)</label>
                    {isEditing ? (
                      <select
                        value={editForm.looking_for || ''}
                        onChange={(e) => setEditForm((prev: Record<string, any>) => ({ ...prev, looking_for: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">What's your endgame?</option>
                        <option value="relationship">Long-term Relationship (Ted Style)</option>
                        <option value="marriage">Marriage (Monica's Dream)</option>
                        <option value="friendship">Friendship First (Ross & Rachel... Eventually)</option>
                        <option value="casual">Casual Dating (Barney's Way)</option>
                      </select>
                    ) : (
                      <p className="text-gray-700 bg-purple-50 p-3 rounded-xl capitalize">
                        {profile.looking_for?.replace('_', ' ') || 'Still figuring it out!'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cultural' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cultural Background (Your Heritage!)</label>
                  {isEditing ? (
                    <select
                      value={editForm.cultural_background || ''}
                      onChange={(e) => setEditForm((prev: Record<string, any>) => ({ ...prev, cultural_background: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Pick your cultural vibe</option>
                      {CULTURAL_BACKGROUNDS.map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-700 bg-purple-50 p-3 rounded-xl">
                      {profile.cultural_background || 'Mystery background!'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages You Speak (LEGEN-DARY!)</label>
                  {isEditing ? (
                    <div className="grid grid-cols-3 gap-2">
                      {['English', 'Hindi', 'Punjabi', 'Urdu', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati'].map((lang, index) => (
                        <button
                          key={lang}
                          onClick={() => handleArrayToggle('languages_spoken', lang)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 animate-slide-in-up delay-${(index + 1) * 50} ${editForm.languages_spoken?.includes(lang)
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse-glow'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(profile.languages_spoken ? JSON.parse(profile.languages_spoken) : []).map((lang: string) => (
                        <span
                          key={lang}
                          className="bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Festivals You Celebrate (SUIT UP!)</label>
                  {isEditing ? (
                    <div className="grid grid-cols-3 gap-2">
                      {FESTIVALS.slice(0, 12).map((festival, index) => (
                        <button
                          key={festival}
                          onClick={() => handleArrayToggle('festivals_celebrated', festival)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 animate-slide-in-up delay-${(index + 1) * 50} ${editForm.festivals_celebrated?.includes(festival)
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse-glow'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          {festival}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(profile.festivals_celebrated ? JSON.parse(profile.festivals_celebrated) : []).map((festival: string) => (
                        <span
                          key={festival}
                          className="bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {festival}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age Range Preference</label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        value={editForm.age_range_min || 22}
                        onChange={(e) => setEditForm((prev: Record<string, any>) => ({ ...prev, age_range_min: parseInt(e.target.value) }))}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        min="18"
                        disabled={!isEditing}
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="number"
                        value={editForm.age_range_max || 35}
                        onChange={(e) => setEditForm((prev: Record<string, any>) => ({ ...prev, age_range_max: parseInt(e.target.value) }))}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        max="100"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distance from Central Perk: {editForm.max_distance_km || 50} km
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={editForm.max_distance_km || 50}
                      onChange={(e) => setEditForm((prev: Record<string, any>) => ({ ...prev, max_distance_km: parseInt(e.target.value) }))}
                      className="w-full"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Poetry Style Preference (For Your Shayari!)</label>
                  {isEditing ? (
                    <select
                      value={editForm.poetry_style || 'english'}
                      onChange={(e) => setEditForm((prev: Record<string, any>) => ({ ...prev, poetry_style: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="english">English (Chandler's Humor Style)</option>
                      <option value="hindi">Hindi (Bollywood Vibes)</option>
                      <option value="punjabi">Punjabi (Main Character Energy)</option>
                      <option value="urdu">Urdu (Ross's Romantic Level)</option>
                    </select>
                  ) : (
                    <p className="text-gray-700 bg-purple-50 p-3 rounded-xl capitalize">
                      {profile.poetry_style || 'English'} poetry vibes
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Could This BE Any Safer?</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-green-700">Profile Verification</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${profile.is_verified ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                        }`}>
                        {profile.is_verified ? 'LEGENDARY Verified' : 'Working on it...'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-700">Safety Mode</span>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {profile.safety_mode || 'Standard'} (Better than Ross's security)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => navigate('/safety')}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-left"
                  >
                    <h4 className="font-semibold text-blue-800 mb-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>Safety Settings</h4>
                    <p className="text-blue-600 text-sm">Manage privacy like Monica manages her apartment</p>
                  </button>

                  <button className="p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors text-left">
                    <h4 className="font-semibold text-purple-800 mb-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>Block & Report</h4>
                    <p className="text-purple-600 text-sm">Keep the creeps away - no Ross energy allowed!</p>
                  </button>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 animate-slide-in-up">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  We Were On A Break!
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover-lift"
                  style={{ fontFamily: 'Fredoka, sans-serif' }}
                >
                  LEGEN... Wait For It... SAVE!
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
