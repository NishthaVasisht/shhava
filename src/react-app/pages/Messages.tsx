import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router';
import { MessageCircle, Send, ArrowLeft, Search, Sparkles, Clock, Heart } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';

interface Conversation {
  id: number;
  matchName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  matchInitial: string;
  isOnline: boolean;
  isVerified: boolean;
  compatibility: number;
}

interface Message {
  id: number;
  text: string;
  isOwn: boolean;
  timestamp: string;
  isPoetry?: boolean;
}

export default function Messages() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsVisible(true);
    loadConversations();
    
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const loadConversations = () => {
    // Mock data - replace with actual API call
    const mockConversations: Conversation[] = [
      {
        id: 1,
        matchName: "Priya",
        lastMessage: "That shayari was legen... wait for it... DARY! 🌹",
        lastMessageTime: "2 min ago",
        unreadCount: 2,
        matchInitial: "P",
        isOnline: true,
        isVerified: true,
        compatibility: 92
      },
      {
        id: 2,
        matchName: "Arjun",
        lastMessage: "Could this photography BE any more amazing?",
        lastMessageTime: "1 hour ago",
        unreadCount: 0,
        matchInitial: "A",
        isOnline: false,
        isVerified: false,
        compatibility: 87
      },
      {
        id: 3,
        matchName: "Simran",
        lastMessage: "How you doin' with those Diwali traditions? ✨",
        lastMessageTime: "Yesterday",
        unreadCount: 1,
        matchInitial: "S",
        isOnline: true,
        isVerified: true,
        compatibility: 89
      }
    ];
    setConversations(mockConversations);
  };

  const loadMessages = (_conversationId: number) => {
    // Mock messages - replace with actual API call
    const mockMessages: Message[] = [
      {
        id: 1,
        text: "How you doin'? I noticed we both celebrate Baisakhi. What's your favorite tradition?",
        isOwn: false,
        timestamp: "2 hours ago"
      },
      {
        id: 2,
        text: "Could this BE any more perfect? I love the dancing and community vibes! There's something magical about everyone coming together. What about you?",
        isOwn: true,
        timestamp: "1 hour ago"
      },
      {
        id: 3,
        text: "दिल में उमंग, आंखों में चमक\nबैसाखी का त्योहार है आया\nखुशियों का ये मौसम है\nप्रेम की धुन में मन है खोया\n\n(That's what she said about perfect poetry! 💜)",
        isOwn: false,
        timestamp: "30 min ago",
        isPoetry: true
      },
      {
        id: 4,
        text: "LEGEN... wait for it... DARY shayari! That was beautiful! 🌹",
        isOwn: true,
        timestamp: "2 min ago"
      }
    ];
    setMessages(mockMessages);
  };

  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversation(conversationId);
    loadMessages(conversationId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        isOwn: true,
        timestamp: "Just now"
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleGeneratePoetry = () => {
    // TODO: Integrate with AI poetry generation
    navigate('/ai/voice-shayari');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.matchName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);

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
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Central Perk
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
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <Heart className="w-4 h-4" />
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
        <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className={`bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden hover-lift transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 animate-slide-in-up" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Your Lobster Squad 🦞
              </h2>
              <div className="relative animate-slide-in-up delay-100">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Could this BE any more searchable?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[500px]">
              {filteredConversations.map((conversation, index) => (
                <button
                  key={conversation.id}
                  onClick={() => handleConversationSelect(conversation.id)}
                  className={`w-full p-5 text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 border-b border-gray-100 animate-slide-in-left delay-${(index + 1) * 100} hover-lift ${
                    selectedConversation === conversation.id ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200 shadow-lg' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                        {conversation.matchInitial}
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-gray-800 truncate">{conversation.matchName}</h3>
                          <VerifiedBadge isVerified={conversation.isVerified} size="sm" />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{conversation.lastMessageTime}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mb-2">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3 text-purple-500" fill="currentColor" />
                          <span className="text-xs text-purple-600 font-medium">{conversation.compatibility}% Lobster Material</span>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse-glow shadow-lg">
                            <span className="text-xs text-white font-bold">{conversation.unreadCount}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden hover-lift transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            {selectedConversationData ? (
              <div className="flex flex-col h-full">
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-100 animate-slide-in-up bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {selectedConversationData.matchInitial}
                        </div>
                        {selectedConversationData.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-bold text-gray-800 text-lg" style={{ fontFamily: 'Fredoka, sans-serif' }}>{selectedConversationData.matchName}</h3>
                          <VerifiedBadge isVerified={selectedConversationData.isVerified} size="md" />
                        </div>
                        <p className="text-sm text-gray-600 font-medium mb-1">
                          {selectedConversationData.isOnline ? '🟢 How YOU doin\'? (Online now)' : '⚫ Was on a break (Last seen recently)'}
                        </p>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-purple-500" fill="currentColor" />
                          <span className="text-sm text-purple-600 font-semibold">{selectedConversationData.compatibility}% Could This BE More Compatible?</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors shadow-md">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-slide-in-up delay-${index * 100}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-5 py-4 rounded-3xl shadow-md hover-lift transition-all duration-300 ${
                        message.isOwn
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : message.isPoetry
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 text-gray-800 border-2 border-purple-200'
                          : 'bg-white text-gray-800 border-2 border-gray-100'
                      }`}>
                        {message.isPoetry && (
                          <div className="flex items-center space-x-2 mb-3">
                            <Sparkles className="w-5 h-5 text-purple-500 animate-bounce-gentle" />
                            <span className="text-sm text-purple-600 font-bold bg-purple-100 px-2 py-1 rounded-full" style={{ fontFamily: 'Fredoka, sans-serif' }}>LEGEN-DARY Poetry!</span>
                          </div>
                        )}
                        <p className={`leading-relaxed ${message.isPoetry ? 'whitespace-pre-line italic font-semibold text-lg' : 'font-medium'}`}>
                          {message.text}
                        </p>
                        <div className="flex items-center justify-end space-x-2 mt-3">
                          <Clock className="w-4 h-4 opacity-60" />
                          <span className="text-sm opacity-75 font-medium">{message.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-100 animate-slide-in-up bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleGeneratePoetry}
                      className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white hover:shadow-xl transition-all duration-300 hover-glow hover:scale-110"
                      title="Generate SUIT UP! Poetry"
                    >
                      <Sparkles className="w-6 h-6 animate-bounce-gentle" />
                    </button>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="That's what she said about sharing thoughts..."
                      className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white shadow-sm font-medium"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                        newMessage.trim()
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl hover-glow hover:scale-110'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full animate-fade-in">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-float" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>Could This BE Any More Empty?</h3>
                  <p className="text-gray-500">Pick a lobster to start the conversation! How you doin'? 😏</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
