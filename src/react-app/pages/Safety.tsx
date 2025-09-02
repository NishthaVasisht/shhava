import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router';
import { ArrowLeft, Shield, AlertTriangle, Phone, Users, Eye, Settings, Clock, CheckCircle } from 'lucide-react';

export default function Safety() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [safetyMode, setSafetyMode] = useState('standard');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [activeCheckins] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const safetyModes = [
    {
      id: 'standard',
      name: 'Standard Mode (Ross Level Security)',
      description: 'Basic safety features that are smarter than Ross with his dinosaurs',
      features: ['Profile verification', 'Basic reporting', 'Community guidelines (stricter than Central Perk)']
    },
    {
      id: 'strict',
      name: 'Strict Mode (Monica Level)',
      description: 'Enhanced privacy with more organization than Monica\'s closets',
      features: ['Enhanced verification', 'Limited profile visibility', 'Stricter matching than Monica\'s dating standards']
    },
    {
      id: 'datesafe',
      name: 'DateSafe Mode (Barney\'s Playbook Level)',
      description: 'Maximum protection - SUIT UP for safety!',
      features: ['Friend check-ins', 'Live location sharing', 'Emergency alerts', 'Photo verification (no catfishing!)']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Navigation */}
      <nav className={`bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50 transition-all duration-700 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/profile')}
              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all duration-300 hover-lift"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg hover-glow animate-heart-beat">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Safety Central
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/discover')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Find</span>
            </button>
            <button 
              onClick={() => navigate('/messages')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Perk</span>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Story</span>
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
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-text-reveal" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Could This BE Any Safer? 🛡️
          </h1>
          <p className="text-gray-600 text-lg animate-slide-in-left delay-300">
            We're more protective than Ross with his sandwich - and that's saying something!
          </p>
        </div>

        {/* Safety Status */}
        <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover-lift mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-pulse-glow">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 animate-slide-in-left" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Safety Status: LEGEN... Wait For It... DARY!
              </h2>
              <p className="text-gray-600 animate-slide-in-left delay-100">More secure than Chandler's job description!</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-xl animate-slide-in-up delay-200">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Profile Verified</h3>
              <p className="text-green-600 text-sm">More real than Joey's acting</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl animate-slide-in-up delay-300">
              <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>AI Monitoring</h3>
              <p className="text-blue-600 text-sm">Creep detector: ON</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl animate-slide-in-up delay-400">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Community Safe</h3>
              <p className="text-purple-600 text-sm">Safer than MacLaren's</p>
            </div>
          </div>
        </div>

        {/* Safety Mode Selection */}
        <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover-lift mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-slide-in-left" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Choose Your Safety Mode (SUIT UP!)
          </h2>

          <div className="space-y-4">
            {safetyModes.map((mode, index) => (
              <div
                key={mode.id}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover-lift animate-slide-in-left delay-${(index + 1) * 100} ${
                  safetyMode === mode.id
                    ? 'border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50'
                    : 'border-gray-200 hover:border-purple-200'
                }`}
                onClick={() => setSafetyMode(mode.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>{mode.name}</h3>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    safetyMode === mode.id
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300'
                  }`}>
                    {safetyMode === mode.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{mode.description}</p>
                <div className="flex flex-wrap gap-2">
                  {mode.features.map((feature, featureIndex) => (
                    <span
                      key={feature}
                      className={`px-3 py-1 rounded-full text-sm font-medium animate-slide-in-up delay-${featureIndex * 50} ${
                        safetyMode === mode.id
                          ? 'bg-purple-200 text-purple-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover-lift mb-8 transition-all duration-1000 delay-600 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div className="flex items-center space-x-3 mb-6 animate-slide-in-left">
            <Phone className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Emergency Contact (Your Gunther!)
            </h2>
          </div>

          <div className="space-y-4">
            <div className="animate-slide-in-up delay-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trusted Friend/Family Contact (Could This BE Any More Important?)
              </label>
              <input
                type="tel"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-2">
                This contact gets notified faster than Joey runs to food when you activate emergency features
              </p>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-xl animate-slide-in-up delay-200">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Emergency Features (That's What She Said About Safety!)</h3>
              </div>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Quick panic button (shake phone 3 times - like Ross with his gel)</li>
                <li>• Automatic location sharing faster than Phoebe's taxi</li>
                <li>• Direct dial to emergency services (no "We were on a break!" here)</li>
                <li>• Fake call feature smoother than Barney's suits</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Date Check-ins */}
        <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover-lift mb-8 transition-all duration-1000 delay-700 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <Clock className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Date Check-ins (No Ross Emergencies!)
              </h2>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift animate-slide-in-right" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              SUIT UP! Schedule Check-in
            </button>
          </div>

          {activeCheckins.length === 0 ? (
            <div className="text-center py-8 animate-fade-in">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-float" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>Could This BE Any More Empty?</h3>
              <p className="text-gray-500 mb-4">No active check-ins - safer than Monica's apartment organization!</p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 mb-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>How Date Check-ins Work (Better than Ted's elaborate plans):</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Set a time when we check on you (more reliable than Chandler's jokes)</li>
                  <li>• Share your date location with trusted friends (like sharing fries... but for safety)</li>
                  <li>• Get reminders to confirm you're safe (less annoying than Ross's facts)</li>
                  <li>• Emergency contacts notified if you don't respond (faster than Joey with sandwiches)</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Active check-ins would be displayed here */}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover-lift transition-all duration-1000 delay-800 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-slide-in-left" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Safety Tools (The Ultimate Playbook)
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <button className="p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors text-left hover-lift animate-slide-in-left delay-100">
              <div className="flex items-center space-x-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Report User</h3>
              </div>
              <p className="text-red-700 text-sm">Report creeps faster than Monica spots a mess</p>
            </button>

            <button className="p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors text-left hover-lift animate-slide-in-right delay-100">
              <div className="flex items-center space-x-3 mb-2">
                <Eye className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-purple-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Privacy Settings</h3>
              </div>
              <p className="text-purple-700 text-sm">Control visibility better than Chandler controls sarcasm</p>
            </button>

            <button className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-left hover-lift animate-slide-in-left delay-200">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Blocked Users</h3>
              </div>
              <p className="text-blue-700 text-sm">Manage blocks like Ross manages his divorces</p>
            </button>

            <button className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors text-left hover-lift animate-slide-in-right delay-200">
              <div className="flex items-center space-x-3 mb-2">
                <Settings className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Safety Tips</h3>
              </div>
              <p className="text-green-700 text-sm">Learn best practices - it's gonna be LEGEN... wait for it... DARY!</p>
            </button>
          </div>
        </div>

        {/* Save Settings */}
        <div className="text-center animate-slide-in-up delay-900">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 hover-lift" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Save Safety Settings (SUIT UP!)
          </button>
        </div>
      </div>
    </div>
  );
}
