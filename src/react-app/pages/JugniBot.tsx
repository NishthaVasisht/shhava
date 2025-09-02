import { useState, useEffect, useRef } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router';
import { ArrowLeft, Send, Sparkles, Bot, Mic, MicOff } from 'lucide-react';

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
  isTyping?: boolean;
}

export default function JugniBot() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    // Initialize with welcome message
    const welcomeMessage: ChatMessage = {
      id: 1,
      text: "नमस्ते! मैं जुगनी हूँ, तुम्हारी प्रेम कहानी की साथी। ❤️\n\nI'm here to help you with:\n• Conversation starters and dating advice\n• Understanding cultural compatibility\n• Writing beautiful shayari for your matches\n• Building confidence in relationships\n\nHow can I help you find love today?",
      isUser: false,
      timestamp: 'Just now'
    };
    setMessages([welcomeMessage]);
    
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const response = generateJugniResponse(inputMessage);
      const botMessage: ChatMessage = {
        id: messages.length + 2,
        text: response,
        isUser: false,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateJugniResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('conversation') || lowerInput.includes('what to say') || lowerInput.includes('first message')) {
      return "Here are some culturally-aware conversation starters:\n\n💫 \"I noticed we both celebrate Diwali! What's your favorite tradition?\"\n\n🎵 \"Your profile mentions you love music - are you into classical or modern?\"\n\n📚 \"I see you're a reader! Have you read any good Hindi poetry lately?\"\n\nRemember, authentic interest is more attractive than pickup lines! 😊";
    }
    
    if (lowerInput.includes('shayari') || lowerInput.includes('poetry') || lowerInput.includes('romantic')) {
      return "आह! Poetry for love! Here's a beautiful shayari for you:\n\n\"दिल में एक उम्मीद सी जगी है\nतुम्हारे इंतज़ार में रात भी दिन हो गई है\nना जाने क्यों लगता है ऐसा\nजैसे मेरी मंजिल तुम्हारे पास ही छुपी है\"\n\nWould you like me to create personalized shayari for someone special? Just tell me about them! 💕";
    }
    
    if (lowerInput.includes('nervous') || lowerInput.includes('scared') || lowerInput.includes('confidence')) {
      return "It's completely natural to feel nervous about love! 🌸\n\nRemember these truths:\n• Your cultural background is a strength, not a barrier\n• Authentic connections happen when you're yourself\n• Take your time - good love is patient\n\nप्रेम में जल्दबाजी नहीं, धैर्य से मिलता है सच्चा साथी। ✨\n\nWhat specifically makes you nervous? I'm here to help!";
    }
    
    if (lowerInput.includes('culture') || lowerInput.includes('family') || lowerInput.includes('traditional')) {
      return "Balancing tradition with modern love is beautiful! 🏮\n\nTips for cultural harmony:\n• Share your festivals and ask about theirs\n• Discuss family values early but gently\n• Food is a great cultural bridge!\n• Respect their background as you want yours respected\n\nRemember: Love transcends cultures, but understanding deepens it. Which cultural aspect are you curious about?";
    }
    
    // Default response
    return "I understand what you're going through! Love can be both exciting and overwhelming. 💖\n\nIn our Indian culture, we believe प्रेम धैर्य से मिलता है (love comes with patience). Whether you need:\n\n• Dating advice\n• Help with conversations\n• Cultural guidance\n• Confidence building\n\nI'm here for you! Tell me more about what's on your heart. 🌸";
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      alert('Voice recognition not supported in this browser');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50">
      {/* Navigation */}
      <nav className={`bg-white/80 backdrop-blur-lg border-b border-orange-100 sticky top-0 z-50 transition-all duration-700 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all duration-300 hover-lift"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg hover-glow animate-heart-beat">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift" style={{ fontFamily: 'Playfair Display, serif' }}>
              Jugni Bot
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => navigate('/discover')}
              className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium hover:scale-105"
            >
              Discover
            </button>
            <button 
              onClick={() => navigate('/messages')}
              className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium hover:scale-105"
            >
              Messages
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium hover:scale-105"
            >
              Profile
            </button>
            <button 
              onClick={logout}
              className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 animate-pulse-glow">
            🤖
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-text-reveal" style={{ fontFamily: 'Playfair Display, serif' }}>
            Jugni - Your Love AI Assistant
          </h1>
          <p className="text-gray-600 text-lg animate-slide-in-left delay-300">
            Your wise companion for love, relationships, and cultural harmony
          </p>
        </div>

        {/* Chat Container */}
        <div className={`bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden hover-lift transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-in-up delay-${index * 100}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                    : 'bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 border border-purple-200'
                }`}>
                  {!message.isUser && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-600 animate-bounce-gentle" />
                      <span className="text-xs text-purple-600 font-medium">Jugni AI</span>
                    </div>
                  )}
                  <p className="whitespace-pre-line">{message.text}</p>
                  <div className="text-xs opacity-70 mt-2">{message.timestamp}</div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-slide-in-up">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 border border-purple-200 px-4 py-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-600 animate-bounce-gentle" />
                    <span className="text-xs text-purple-600 font-medium">Jugni is thinking...</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-gray-100 animate-slide-in-up">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleVoiceInput}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover-glow ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:shadow-lg'
                }`}
                title="Voice Input"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask Jugni about love, relationships, or dating advice..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  inputMessage.trim()
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover-glow'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "Help me start a conversation",
                "Write a romantic shayari",
                "Cultural dating advice",
                "Build my confidence"
              ].map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => setInputMessage(suggestion)}
                  className={`px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors animate-slide-in-up delay-${(index + 1) * 100}`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className={`grid md:grid-cols-3 gap-6 mt-8 transition-all duration-1000 delay-600 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover-lift">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
              💝
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Dating Wisdom</h3>
            <p className="text-gray-600 text-sm">Get personalized advice for meaningful connections</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover-lift">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
              🎭
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Cultural Bridge</h3>
            <p className="text-gray-600 text-sm">Navigate cultural differences with understanding</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover-lift">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
              ✨
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Poetry & Romance</h3>
            <p className="text-gray-600 text-sm">Express your heart with beautiful words</p>
          </div>
        </div>
      </div>
    </div>
  );
}
