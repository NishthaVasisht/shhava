import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@getmocha/users-service/react';
import { Heart, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { CULTURAL_BACKGROUNDS, FESTIVALS } from '../shared/types';

export default function Onboarding() {
  const { } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    interested_in: '',
    location_city: '',
    location_state: '',
    location_country: 'India',
    bio: '',
    cultural_background: '',
    languages_spoken: [] as string[],
    religion: '',
    festivals_celebrated: [] as string[],
    looking_for: ''
  });

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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: 'languages_spoken' | 'festivals_celebrated', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting profile data:', formData);
      
      const submitData = {
        ...formData,
        age: parseInt(formData.age),
        // Ensure all required fields are present
        interested_in: formData.interested_in || '',
        looking_for: formData.looking_for || '',
        location_country: formData.location_country || 'India',
        // Convert arrays to proper format
        languages_spoken: formData.languages_spoken || [],
        festivals_celebrated: formData.festivals_celebrated || []
      };
      
      console.log('Final submit data:', submitData);
      
      const response = await fetch('/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const responseData = await response.json();
      console.log('Response:', response.status, responseData);

      if (response.ok) {
        navigate('/dashboard');
      } else {
        console.error('Failed to create profile:', responseData);
        alert(`Profile creation failed: ${responseData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert(`Error creating profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.age && formData.gender;
      case 2:
        return formData.interested_in;
      case 3:
        return formData.location_city && formData.location_state && formData.bio;
      case 4:
        return formData.cultural_background && formData.languages_spoken.length > 0;
      case 5:
        return formData.looking_for;
      default:
        return false;
    }
  };

  const isFormComplete = () => {
    return formData.name && 
           formData.age && 
           formData.gender && 
           formData.interested_in && 
           formData.location_city && 
           formData.location_state && 
           formData.bio && 
           formData.cultural_background && 
           formData.languages_spoken.length > 0 && 
           formData.looking_for;
  };

  const renderStep = () => {
    const stepContent = (() => {
      switch (currentStep) {
        case 1:
          return (
            <div className="space-y-6">
              <div className="text-center mb-8 animate-slide-in-up">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-text-reveal" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Spill the Tea About Yourself! ✨
                </h2>
                <p className="text-gray-600 animate-slide-in-up delay-200">Main character energy starts here, bestie!</p>
              </div>
              
              <div className="animate-slide-in-up delay-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="animate-slide-in-left delay-400">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                    placeholder="25"
                    min="18"
                    max="100"
                  />
                </div>
                
                <div className="animate-slide-in-right delay-400">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                  >
                    <option value="">Select gender</option>
                    <option value="woman">Woman</option>
                    <option value="man">Man</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          );

        case 2:
          return (
            <div className="space-y-6">
              <div className="text-center mb-8 animate-slide-in-up">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-text-reveal" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Who's Your Type? 👀
                </h2>
                <p className="text-gray-600 animate-slide-in-up delay-200">Could this BE any more exciting? Let's find your lobster!</p>
              </div>
              
              <div className="space-y-4">
                {[
                  { value: 'men', label: 'Men', desc: 'Looking for male connections' },
                  { value: 'women', label: 'Women', desc: 'Looking for female connections' },
                  { value: 'everyone', label: 'Everyone', desc: 'Open to all connections' }
                ].map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('interested_in', option.value)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 hover:scale-102 animate-slide-in-up delay-${(index + 1) * 100} ${
                      formData.interested_in === option.value
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 animate-pulse-glow'
                        : 'bg-white border-2 border-gray-200 hover:border-purple-200 hover-lift'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{option.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          );

        case 3:
          return (
            <div className="space-y-6">
              <div className="text-center mb-8 animate-slide-in-up">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-text-reveal" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Where's Your Home Base? 🏠
                </h2>
                <p className="text-gray-600 animate-slide-in-up delay-200">Every great sitcom needs a setting - what's yours?</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="animate-slide-in-left delay-300">
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.location_city}
                    onChange={(e) => handleInputChange('location_city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                    placeholder="Ludhiana"
                  />
                </div>
                
                <div className="animate-slide-in-right delay-300">
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={formData.location_state}
                    onChange={(e) => handleInputChange('location_state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                    placeholder="Punjab"
                  />
                </div>
              </div>
              
              <div className="animate-slide-in-up delay-400">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tell Your Story</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                  placeholder="Share what makes you unique, your passions, and what you're looking for..."
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 mt-1 animate-fade-in delay-500">{formData.bio.length}/500 characters</p>
              </div>
            </div>
          );

        case 4:
          return (
            <div className="space-y-6">
              <div className="text-center mb-8 animate-slide-in-up">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-text-reveal" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Your Cultural Vibe Check ✨
                </h2>
                <p className="text-gray-600 animate-slide-in-up delay-200">Rep your heritage like the icon you are!</p>
              </div>
              
              <div className="animate-slide-in-up delay-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cultural Background</label>
                <select
                  value={formData.cultural_background}
                  onChange={(e) => handleInputChange('cultural_background', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                >
                  <option value="">Select your background</option>
                  {CULTURAL_BACKGROUNDS.map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
              
              <div className="animate-slide-in-up delay-400">
                <label className="block text-sm font-medium text-gray-700 mb-2">Languages You Speak</label>
                <div className="grid grid-cols-3 gap-2">
                  {['English', 'Hindi', 'Punjabi', 'Urdu', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati'].map((lang, index) => (
                    <button
                      key={lang}
                      onClick={() => handleArrayToggle('languages_spoken', lang)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 animate-slide-in-up delay-${(index + 1) * 50} ${
                        formData.languages_spoken.includes(lang)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse-glow'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="animate-slide-in-up delay-500">
                <label className="block text-sm font-medium text-gray-700 mb-2">Festivals You Celebrate</label>
                <div className="grid grid-cols-3 gap-2">
                  {FESTIVALS.slice(0, 12).map((festival, index) => (
                    <button
                      key={festival}
                      onClick={() => handleArrayToggle('festivals_celebrated', festival)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 animate-slide-in-up delay-${(index + 1) * 50} ${
                        formData.festivals_celebrated.includes(festival)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse-glow'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {festival}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );

        case 5:
          return (
            <div className="space-y-6">
              <div className="text-center mb-8 animate-slide-in-up">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-text-reveal" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  What's Your Endgame? 💜
                </h2>
                <p className="text-gray-600 animate-slide-in-up delay-200">Are you Ted looking for The Mother or just hanging at MacLaren's?</p>
              </div>
              
              <div className="space-y-4">
                {[
                  { value: 'relationship', label: 'Long-term Relationship', desc: 'Looking for someone to build a future with' },
                  { value: 'marriage', label: 'Marriage', desc: 'Ready to find your life partner' },
                  { value: 'friendship', label: 'Friendship First', desc: 'Want to start as friends and see where it goes' },
                  { value: 'casual', label: 'Casual Dating', desc: 'Enjoying getting to know new people' }
                ].map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('looking_for', option.value)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 hover:scale-102 animate-slide-in-up delay-${(index + 1) * 100} ${
                      formData.looking_for === option.value
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 animate-pulse-glow'
                        : 'bg-white border-2 border-gray-200 hover:border-purple-200 hover-lift'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{option.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          );

        default:
          return null;
      }
    })();

    return (
      <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
        {stepContent}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full blur-2xl animate-float-reverse delay-300"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className={`flex items-center justify-between mb-8 transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg hover-glow animate-heart-beat">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              How I Met You
            </span>
          </div>
          
          <div className="text-sm text-gray-500 animate-fade-in delay-200">
            Step {currentStep} of 5
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`w-full bg-gray-200 rounded-full h-2 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 animate-shimmer"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>

        {/* Form Content */}
        <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover-lift transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          {renderStep()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100 hover-lift'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentStep === 5 ? !isFormComplete() : !isStepValid()}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                (currentStep === 5 ? isFormComplete() : isStepValid())
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transform hover:scale-105 animate-pulse-glow'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>{currentStep === 5 ? 'LEGEN... wait for it... DARY!' : 'That\'s What She Said 👉'}</span>
              {currentStep === 5 ? <Sparkles className="w-5 h-5 animate-bounce-gentle" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
