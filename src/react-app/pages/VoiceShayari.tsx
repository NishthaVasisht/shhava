import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router';
import { ArrowLeft, Play, Download, Share, Sparkles, Volume2 } from 'lucide-react';

interface ShayariTheme {
  id: string;
  name: string;
  emoji: string;
  description: string;
  example: string;
}

interface GeneratedShayari {
  id: number;
  text: string;
  theme: string;
  language: string;
  audioUrl?: string;
  isPlaying?: boolean;
}

export default function VoiceShayari() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedShayari, setGeneratedShayari] = useState<GeneratedShayari[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [_isRecording, _setIsRecording] = useState(false);

  const themes: ShayariTheme[] = [
    {
      id: 'romantic',
      name: 'Romantic Love (Ross & Rachel Level)',
      emoji: '💕',
      description: 'Express feelings deeper than Ross\'s paleontology obsession',
      example: 'तुम्हारी मुस्कान में छुपा है मेरा प्यार...'
    },
    {
      id: 'separation',
      name: 'Missing Someone (We Were On A Break!)',
      emoji: '💔',
      description: 'Capture longing stronger than Ross missing his sandwich',
      example: 'दूरियों का एहसास है, तुम्हारी याद आती है...'
    },
    {
      id: 'celebration',
      name: 'Festival Joy (Central Perk Party!)',
      emoji: '🎉',
      description: 'Celebrate traditions livelier than Joey at Thanksgiving',
      example: 'दिवाली की रोशनी में तुम्हारा चेहरा...'
    },
    {
      id: 'nature',
      name: 'Nature & Beauty (Phoebe\'s Garden)',
      emoji: '🌸',
      description: 'Draw inspiration more beautiful than Phoebe\'s songs',
      example: 'चाँद की तरह तुम्हारी मुस्कान...'
    },
    {
      id: 'cultural',
      name: 'Cultural Pride (SUIT UP for Heritage!)',
      emoji: '🏮',
      description: 'Honor traditions with more style than Barney\'s suits',
      example: 'पंजाब की मिट्टी में बसा है प्रेम...'
    },
    {
      id: 'friendship',
      name: 'Friendship (The Gang Vibes)',
      emoji: '🤝',
      description: 'Celebrate bonds stronger than the Central Perk crew',
      example: 'दोस्ती का रिश्ता है सबसे खास...'
    }
  ];

  const languages = [
    { code: 'hindi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'punjabi', name: 'Punjabi', flag: '🌾' },
    { code: 'urdu', name: 'Urdu', flag: '📜' },
    { code: 'english', name: 'English', flag: '🇬🇧' }
  ];

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

  const handleGenerateShayari = async () => {
    if (!selectedTheme && !customPrompt) return;

    setIsGenerating(true);
    
    // Simulate API call to generate shayari
    setTimeout(() => {
      const mockShayari = generateMockShayari();
      setGeneratedShayari(prev => [mockShayari, ...prev]);
      setIsGenerating(false);
    }, 3000);
  };

  const generateMockShayari = (): GeneratedShayari => {
    const shayariExamples = {
      romantic: {
        hindi: "तुम्हारी आँखों में छुपा है एक जहान\nमेरे दिल की धड़कन में बसा है तुम्हारा प्यार\nहर सांस में तुम्हारी खुशबू का एहसास\nये मोहब्बत है या कोई जादू का असर\n\n(Could this BE any more romantic? 💜)",
        punjabi: "ਤੇਰੀਆਂ ਅੱਖਾਂ ਚ ਵਸਿਆ ਇੱਕ ਜਹਾਨ\nਮੇਰੇ ਦਿਲ ਦੀ ਧੜਕਣ ਚ ਤੇਰਾ ਪਿਆਰ\nਹਰ ਸਾਹ ਚ ਤੇਰੀ ਖੁਸ਼ਬੂ ਦਾ ਅਹਿਸਾਸ\nਇਹ ਮੁਹੱਬਤ ਹੈ ਜਾਂ ਕੋਈ ਜਾਦੂ ਦਾ ਅਸਰ\n\n(LEGEN... wait for it... DARY! 🌾)",
        english: "In your eyes lies a world unseen\nIn my heartbeat, your love I glean\nEvery breath carries your sweet scent\nIs this love or magic heaven-sent?\n\n(That's what she said about perfect poetry! 🇬🇧)"
      },
      separation: {
        hindi: "दूरियों का एहसास है, तुम्हारी याद आती है\nरातों की तन्हाई में बस तुम्हारी बात आती है\nचाँद से पूछूं तो वो भी कहता है\nतुम्हारे बिना ये रात अधूरी लगती है\n\n(We were on a break... from being together! 💔)",
        punjabi: "ਦੂਰੀਆਂ ਦਾ ਅਹਿਸਾਸ ਹੈ, ਤੇਰੀ ਯਾਦ ਆਉਂਦੀ\nਰਾਤਾਂ ਦੀ ਤਨਹਾਈ ਚ ਬਸ ਤੇਰੀ ਗੱਲ ਆਉਂਦੀ\nਚੰਦ ਤੋਂ ਪੁੱਛਾਂ ਤਾਂ ਉਹ ਵੀ ਕਹਿੰਦਾ\nਤੇਰੇ ਬਿਨਾਂ ਇਹ ਰਾਤ ਅਧੂਰੀ ਲੱਗਦੀ",
        english: "Distance whispers your name to me\nIn lonely nights, your thoughts run free\nEven the moon confesses true\nThese nights feel incomplete without you\n\n(Ross missing Rachel level longing! 🌙)"
      }
    };

    const theme = selectedTheme || 'romantic';
    const examples = shayariExamples[theme as keyof typeof shayariExamples] || shayariExamples.romantic;
    const text = examples[selectedLanguage as keyof typeof examples] || examples.hindi;

    return {
      id: Date.now(),
      text,
      theme: themes.find(t => t.id === theme)?.name || 'Custom',
      language: languages.find(l => l.code === selectedLanguage)?.name || 'Hindi'
    };
  };

  const handleVoiceGeneration = async (shayari: GeneratedShayari) => {
    // TODO: Integrate with text-to-speech API
    console.log('Generating voice for:', shayari.text);
    // Simulate voice generation
    alert('Voice generation coming soon! This will create an audio version smoother than Barney\'s pick-up lines!');
  };

  const handleShare = (shayari: GeneratedShayari) => {
    if (navigator.share) {
      navigator.share({
        title: 'LEGEN... wait for it... DARY Shayari from Shhava',
        text: shayari.text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shayari.text);
      alert('Shayari copied! Could this BE any more shareable?');
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
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg hover-glow animate-heart-beat">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent animate-gradient-shift" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Voice Shayari
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/discover')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Find</span>
            </button>
            <button 
              onClick={() => navigate('/messages')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Perk</span>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <Sparkles className="w-4 h-4" />
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

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 animate-pulse-glow">
            ✨
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-text-reveal" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Could This BE Any More Poetic? 🎭
          </h1>
          <p className="text-gray-600 text-lg animate-slide-in-left delay-300">
            Create shayari smoother than Barney's suits and sweeter than Monica's desserts!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Creator Panel */}
          <div className="lg:col-span-1">
            <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover-lift transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <h2 className="text-xl font-bold text-gray-800 mb-6 animate-slide-in-up" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                SUIT UP! Create Poetry
              </h2>

              {/* Language Selection */}
              <div className="mb-6 animate-slide-in-up delay-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">Language (How You Doin'?)</label>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        selectedLanguage === lang.code
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse-glow'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {lang.flag} {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selection */}
              <div className="mb-6 animate-slide-in-up delay-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">Choose Your Vibe</label>
                <div className="space-y-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`w-full p-3 rounded-xl text-left transition-all duration-300 hover-lift ${
                        selectedTheme === theme.id
                          ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-orange-300'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{theme.emoji}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>{theme.name}</h3>
                          <p className="text-sm text-gray-600">{theme.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Prompt */}
              <div className="mb-6 animate-slide-in-up delay-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Topic (That's What She Said!)
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Describe your heart's desire - could this BE any more personal?"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateShayari}
                disabled={isGenerating || (!selectedTheme && !customPrompt)}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 animate-slide-in-up delay-400 ${
                  isGenerating || (!selectedTheme && !customPrompt)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg hover-lift'
                }`}
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating LEGEN... wait for it...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5 animate-bounce-gentle" />
                    <span>DARY! Generate</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Generated Shayari */}
          <div className="lg:col-span-2">
            <div className={`space-y-6 transition-all duration-1000 delay-600 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              {generatedShayari.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-xl text-center hover-lift animate-fade-in">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>Ready for Some LEGENDARY Poetry?</h3>
                  <p className="text-gray-500 mb-6">Choose a theme and language - it's gonna be LEGEN... wait for it...</p>
                  <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <p className="text-yellow-800 text-sm italic">
                      "शब्दों में छुपी है दिल की बात, कहानी का जादू है हर बात"<br/>
                      <span className="text-xs mt-1 block">(Could this BE any more beautiful? - Chandler, probably)</span>
                    </p>
                  </div>
                </div>
              ) : (
                generatedShayari.map((shayari, index) => (
                  <div
                    key={shayari.id}
                    className={`bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover-lift animate-slide-in-up delay-${index * 100}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>{shayari.theme}</h3>
                          <p className="text-sm text-gray-500">{shayari.language}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleVoiceGeneration(shayari)}
                          className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                          title="SUIT UP for Voice!"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShare(shayari)}
                          className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 hover:bg-green-200 transition-colors"
                          title="Share the LEGENDARY vibes!"
                        >
                          <Share className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
                      <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line font-medium">
                        {shayari.text}
                      </p>
                    </div>

                    {shayari.audioUrl && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <button className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                            <Play className="w-5 h-5" />
                          </button>
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                            </div>
                          </div>
                          <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
