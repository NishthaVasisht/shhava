import React, { useEffect, useState } from 'react';
import LoginButton from '../components/LoginButton';
import WaitlistModal from '../components/WaitlistModal';
import { Heart, Sparkles, Star, Shield, RefreshCw, BadgeCheck, SlidersHorizontal, Languages, MessageCircle, Gift, MapPin } from 'lucide-react';

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [waitlistStatus, setWaitlistStatus] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;


  const features = [
    {
      icon: Heart,
      title: "Fated Crossings (That's What She Said!)",
      description: "Find love through real-life intersections like you're living in your own romcom episode"
    },
    {
      icon: Sparkles,
      title: "Cultural Vibes (How You Doin'?)",
      description: "Celebrate your roots while swiping globally - because diversity is legen... wait for it... DARY!"
    },
    {
      icon: Shield,
      title: "Safety First (We Don't Do Ross Energy)",
      description: "No creeps allowed - our AI bouncer is tougher than Joey's acting agent"
    },
    {
      icon: RefreshCw,
      title: "Missed Moments (Kismet Vibes)",
      description: "You both were at Central Mall last Sunday. Coincidence? Nah, that's fate playing Cupid in the background"
    },
    {
      icon: BadgeCheck,
      title: "Safety Verified Badge (Trust > Thirst)",
      description: "Profiles with KYC/selfie/social ID get the ✨ Verified badge. Choose to match only with the real-deal humans"
    },
    {
      icon: SlidersHorizontal,
      title: "Preference-Based Discovery (Not Just Left or Right)",
      description: "Set your vibe: casual, friendship, shaadi-type. Discover people who want the same story arc as you"
    },
    {
      icon: Languages,
      title: "Regional Dialect Filters (Desi Filter, Full Power)",
      description: "Gujarati swagger? Haryanvi humour? Bhojpuri boldness? Find matches who speak your vibe"
    },
    {
      icon: MessageCircle,
      title: "Fun & Filtered Icebreakers (Swipe Kar Le Veer!)",
      description: "Region-based, meme-tier intros that say 'I’m not boring' before you even type ‘Hi’"
    },
    {
      icon: Gift,
      title: "Festival Frames & Events (Swipe by Diwali, Shaadi by Holi)",
      description: "Get festive with Diwali/Holi profile themes + matchmaking events. Because what’s more romantic than rangoli?"
    },
    {
      icon: MapPin,
      title: "City-Specific Dating Vibes (Ludhiana ≠ Mumbai)",
      description: "Ludhiana says 'Rishta ya Rajma-Chawal partner?' while Mumbai asks 'Juhu date or Bandra brunch?' — Geo-targeted fun FTW"
    }
  ];

  // Function to fetch user data from /me endpoint
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('[fetchUserData] No token found — skipping /me call');
      setWaitlistStatus(null);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const contentType = res.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const raw = await res.text();
        console.error('[fetchUserData] Non-JSON response:', raw);
        setWaitlistStatus(null);
        return;
      }

      const data = await res.json();

      if (res.ok && data.success && data.user) {
        setUserName(data.user.name);
        setWaitlistStatus('already_in_line');
        setIsModalOpen(true);
      } else {
        console.error('[fetchUserData] Invalid user data:', data);
        setWaitlistStatus(null);
      }
    } catch (err: any) {
      console.error('[fetchUserData] Network error:', err.message || err);
      setWaitlistStatus(null);
    }
  };


  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    // Fetch user data on mount to check waitlist status
    fetchUserData();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&family=Fredoka:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Callback to handle login success
  const handleLoginSuccess = async (data: any) => {
    if (data.success && data.user) {
      setUserName(data.user.name);
      localStorage.setItem('token', data.token); // Assuming login response includes token
      // If user exists, their email is in the users table
      setWaitlistStatus('This BE Perfect');
      setIsModalOpen(true); // Open modal
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setWaitlistStatus(null); // Reset waitlist status when closing modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl animate-float sm:w-24 sm:h-24"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl animate-float-reverse delay-300 sm:w-16 sm:h-16"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full blur-3xl animate-float delay-500 sm:w-32 sm:h-32"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-2xl animate-float-reverse delay-700 sm:w-20 sm:h-20"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full blur-xl animate-neon-glow sm:w-16 sm:h-16"></div>
      </div>

      {/* Navigation */}
      <nav className={`relative z-10 flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 md:p-8 transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg hover-glow animate-neon-glow">
            <img
              src="./public/logo.png"
              alt="icon"
              className="w-6 h-6 object-contain"
            />
          </div>

          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Shhava
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* <button className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-base sm:text-lg" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            The Tea ☕
          </button>
          <button className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-base sm:text-lg" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Safety First 🛡️
          </button> */}
          <div className="hidden sm:block animate-slide-in-right delay-200">
            <LoginButton variant="small" onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 text-center px-4 sm:px-6 pt-8 sm:pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 leading-tight transition-all duration-1000 ${isVisible ? 'animate-text-reveal' : 'opacity-0'}`} style={{ fontFamily: 'Fredoka, sans-serif' }}>
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-shift">
              Could This BE
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent animate-gradient-shift delay-200">
              Any More Perfect?
            </span>
          </h1>

          <p className={`text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            <strong>Legen... wait for it... DARY!</strong> The dating app that's basically your favorite sitcom come to life 📺
          </p>

          <p className={`text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            How you doin'? Ready to find The One? Because this story is about to get <em>really</em> good! 🎬✨
          </p>

          <div className={`flex flex-col gap-4 justify-center items-center mb-12 sm:mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <div className="animate-bounce-gentle">
              <LoginButton onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>

          {/* Feature Showcase */}
          <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl max-w-5xl mx-auto hover-lift transition-all duration-1000 delay-600 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              <div className="text-left">
                <div className="flex items-center space-x-3 mb-4 sm:mb-6 animate-slide-in-left">
                  {React.createElement(features[currentFeature].icon, {
                    className: "w-6 sm:w-8 h-6 sm:h-8 text-purple-600 animate-bounce-gentle"
                  })}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 animate-fade-in" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                    {features[currentFeature].title}
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed animate-slide-in-left delay-200">
                  {features[currentFeature].description}
                </p>

                <div className="flex space-x-2 mt-6 sm:mt-8 animate-slide-in-left delay-300">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeature(index)}
                      className={`rounded-full transition-all duration-500 hover:scale-110 ${index === currentFeature
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 w-6 sm:w-8 h-2 sm:h-3 animate-neon-glow'
                        : 'bg-gray-300 hover:bg-purple-300 w-2 sm:w-3 h-2 sm:h-3'
                        }`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative animate-slide-in-right delay-200">
                <div className="w-64 sm:w-80 h-64 sm:h-80 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center shadow-xl hover-glow transition-all duration-500">
                  <div className="text-center">
                    {React.createElement(features[currentFeature].icon, {
                      className: "w-16 sm:w-24 h-16 sm:h-24 text-purple-600 mx-auto mb-4 animate-bounce-gentle"
                    })}
                    <div className="text-4xl sm:text-6xl mb-4 animate-neon-glow">💜</div>
                    <p className="text-sm text-gray-600 animate-shimmer" style={{ fontFamily: 'Fredoka, sans-serif' }}>Season 1 Coming Soon!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Values Section */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 animate-slide-in-up" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
              We Don't Do Basic 💅
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-center text-gray-600 mb-12 sm:mb-16 animate-slide-in-up delay-200" style={{ fontFamily: 'Inter, sans-serif' }}>
            <em>"I'm not great at the advice. Can I interest you in a sarcastic comment?"</em> - Just kidding, we're actually pretty good at this! 😏
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "🎭",
                title: "Main Character Energy",
                description: "Connect through shared festivals, family drama (the good kind), and cultural flex moments",
                quote: '"We were on a break... from boring dating apps!"'
              },
              {
                icon: "✨",
                title: "Poetic Justice",
                description: "Share your heart through AI-generated shayari that hits different than Ross's leather pants",
                quote: '"Could this poetry BE any more beautiful?"'
              },
              {
                icon: "🌍",
                title: "How I Met Your Mother(land)",
                description: "From Delhi to NYC, build connections that span continents like Barney's suit collection",
                quote: '"It\'s gonna be legend- wait for it... GLOBAL!"'
              }
            ].map((item, index) => (
              <div key={index} className={`text-center p-6 sm:p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover-lift transition-all duration-300 animate-slide-in-up delay-${(index + 1) * 200}`}>
                <div className="text-3xl sm:text-4xl mb-4 animate-bounce-gentle delay-${index * 200}">{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 animate-slide-in-up delay-300" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-base sm:text-gray-600 leading-relaxed mb-4 animate-slide-in-up delay-400">
                  {item.description}
                </p>
                <p className="text-sm text-purple-600 italic font-medium animate-fade-in delay-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {item.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-12 sm:w-16 h-12 sm:h-16 text-purple-600 mx-auto mb-6 sm:mb-8 animate-neon-glow" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-slide-in-up" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
              No Creeps Zone! 🚨
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-4 animate-slide-in-up delay-100">
            <strong>"That's what she said"</strong> to feeling safe and secure!
          </p>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 sm:mb-12 leading-relaxed animate-slide-in-up delay-200">
            With real-ID verification, Creep Detector AI (smarter than Ross with a spray tan), and friend check-ins that would make Monica proud of our organization skills! 📋✨
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { feature: "Real-ID Verification", vibe: "More legit than Barney's job!" },
              { feature: "Friend Safety Check-ins", vibe: "Your squad's got your back!" },
              { feature: "AI-Powered Creep Detection", vibe: "Smarter than Joey... combined!" },
              { feature: "24/7 Human Support", vibe: "We'll be there for you! 🎵" }
            ].map((item, index) => (
              <div key={index} className={`flex items-center space-x-3 p-4 bg-white/70 rounded-xl hover-lift animate-slide-in-left delay-${(index + 1) * 100}`}>
                <Star className="w-5 h-5 text-purple-600 flex-shrink-0 animate-neon-glow" fill="currentColor" />
                <div className="text-left">
                  <span className="text-gray-800 font-medium block text-sm sm:text-base">{item.feature}</span>
                  <span className="text-xs sm:text-sm text-purple-600 italic">{item.vibe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 animate-slide-in-up" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
              Ready to Start Your Epic Love Story? 📖💜
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 mb-2 animate-slide-in-up delay-100" style={{ fontFamily: 'Inter, sans-serif' }}>
            <strong>"It's gonna be legend... wait for it..."</strong>
          </p>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 animate-slide-in-up delay-200" style={{ fontFamily: 'Inter, sans-serif' }}>
            <strong>"...DARY! LEGENDARY!"</strong> 🎉
          </p>

          <div className="flex justify-center animate-bounce-gentle delay-300">
            <LoginButton onLoginSuccess={handleLoginSuccess} />
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 animate-fade-in delay-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            Starting where the magic happens • Expanding faster than Phoebe's song catalog • Built with 💜 for those who deserve their own sitcom ending
          </p>
        </div>
      </footer>

      {/* Render WaitlistModal with waitlistStatus */}
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        userName={userName}
        waitlistStatus={waitlistStatus}
      />
    </div>
  );
}