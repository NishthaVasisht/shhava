import { useState, useEffect } from 'react';
import { useAuth } from '@getmocha/users-service/react';
import { useNavigate } from 'react-router';
import { 
  MapPin, Clock, Heart, ArrowLeft, Star, Sparkles, 
  Navigation, Shield, Settings, Users, Calendar,
  MessageCircle, Coffee, ShoppingBag,
  TreePine, Building, Music, Car
} from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';

interface FatedCrossing {
  id: number;
  user: {
    id: number;
    name: string;
    age: number;
    imageInitial: string;
    isVerified: boolean;
    compatibility: number;
  };
  location: {
    name: string;
    category: string;
    latitude: number;
    longitude: number;
  };
  crossing: {
    userVisitedAt: string;
    matchVisitedAt: string;
    timeDifferenceMinutes: number;
    distanceMeters: number;
    crossingScore: number;
    isRevealed: boolean;
  };
  story: string;
}

interface LocationPermissions {
  enabled: boolean;
  precision: 'high' | 'medium' | 'low';
  fatedCrossingsEnabled: boolean;
  shareWithMatchesOnly: boolean;
}

export default function FatedCrossings() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [fatedCrossings, setFatedCrossings] = useState<FatedCrossing[]>([]);
  const [locationPermissions, setLocationPermissions] = useState<LocationPermissions>({
    enabled: false,
    precision: 'medium',
    fatedCrossingsEnabled: true,
    shareWithMatchesOnly: true
  });
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    loadFatedCrossings();
    loadLocationPermissions();
    
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const loadFatedCrossings = async () => {
    try {
      const response = await fetch('/fated-crossings');
      if (response.ok) {
        const data = await response.json();
        setFatedCrossings(data.crossings || []);
      } else {
        console.error('Failed to load fated crossings');
        // Fallback to mock data for demo
        const mockCrossings: FatedCrossing[] = [
        {
          id: 1,
          user: {
            id: 1,
            name: "Priya",
            age: 26,
            imageInitial: "P",
            isVerified: true,
            compatibility: 92
          },
          location: {
            name: "Pavilion Mall",
            category: "shopping",
            latitude: 30.9009,
            longitude: 75.8573
          },
          crossing: {
            userVisitedAt: "2024-07-20T18:30:00Z",
            matchVisitedAt: "2024-07-20T18:45:00Z",
            timeDifferenceMinutes: 15,
            distanceMeters: 25,
            crossingScore: 0.95,
            isRevealed: false
          },
          story: "You both wandered through Pavilion Mall on Saturday evening, just 15 minutes apart. She was at the bookstore while you were at the coffee shop - so close to a magical encounter!"
        },
        {
          id: 2,
          user: {
            id: 2,
            name: "Arjun",
            age: 29,
            imageInitial: "A",
            isVerified: false,
            compatibility: 87
          },
          location: {
            name: "Sukhna Lake",
            category: "leisure",
            latitude: 30.7420,
            longitude: 76.8185
          },
          crossing: {
            userVisitedAt: "2024-07-19T17:00:00Z",
            matchVisitedAt: "2024-07-19T18:30:00Z",
            timeDifferenceMinutes: 90,
            distanceMeters: 150,
            crossingScore: 0.78,
            isRevealed: true
          },
          story: "Both captured by Sukhna Lake's golden hour magic on Friday evening. You were photographing the sunset while he was sketching by the water - two artists unknowingly sharing the same inspiration."
        },
        {
          id: 3,
          user: {
            id: 3,
            name: "Simran",
            age: 24,
            imageInitial: "S",
            isVerified: true,
            compatibility: 89
          },
          location: {
            name: "Golden Temple",
            category: "spiritual",
            latitude: 31.6200,
            longitude: 74.8765
          },
          crossing: {
            userVisitedAt: "2024-07-18T06:15:00Z",
            matchVisitedAt: "2024-07-18T06:30:00Z",
            timeDifferenceMinutes: 15,
            distanceMeters: 50,
            crossingScore: 0.88,
            isRevealed: false
          },
          story: "Dawn prayers at the Golden Temple brought you both to the same sacred space. While you were in silent meditation, she was offering her prayers just meters away - connected by divine timing."
        }
      ];
      setFatedCrossings(mockCrossings);
      }
    } catch (error) {
      console.error('Error loading fated crossings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadLocationPermissions = async () => {
    try {
      const response = await fetch('/location/permissions');
      if (response.ok) {
        const data = await response.json();
        setLocationPermissions({
          enabled: data.permissions.location_tracking_enabled,
          precision: data.permissions.tracking_precision,
          fatedCrossingsEnabled: data.permissions.fated_crossings_enabled,
          shareWithMatchesOnly: data.permissions.share_with_matches_only
        });
      } else {
        // Fallback to localStorage
        const savedPermissions = localStorage.getItem('locationPermissions');
        if (savedPermissions) {
          setLocationPermissions(JSON.parse(savedPermissions));
        }
      }
    } catch (error) {
      console.error('Error loading location permissions:', error);
    }
  };

  const requestLocationPermission = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          
          // Update permissions on backend
          try {
            const response = await fetch('/location/permissions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                location_tracking_enabled: true,
                fated_crossings_enabled: true,
                tracking_precision: 'medium',
                share_with_matches_only: true,
                auto_detect_places: true
              }),
            });

            if (response.ok) {
              setLocationPermissions(prev => ({ ...prev, enabled: true }));
              setShowPermissionModal(false);
              
              // Start tracking current location
              trackCurrentLocation(position.coords.latitude, position.coords.longitude);
            } else {
              console.error('Failed to update location permissions');
            }
          } catch (error) {
            console.error('Error updating permissions:', error);
          }
          
          localStorage.setItem('locationPermissions', JSON.stringify({ ...locationPermissions, enabled: true }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Location access denied. Please enable location services to use Fated Crossings.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const trackCurrentLocation = async (latitude: number, longitude: number) => {
    try {
      // Simple location detection - in a real app, this would be more sophisticated
      const locationName = await getLocationName(latitude, longitude);
      
      const response = await fetch('/location/visits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location_name: locationName,
          location_category: 'unknown',
          latitude,
          longitude,
          activity_detected: 'browsing_app',
          mood_during_visit: 'curious'
        }),
      });

      if (response.ok) {
        console.log('Location visit tracked successfully');
        // Reload crossings to show any new ones
        loadFatedCrossings();
      }
    } catch (error) {
      console.error('Error tracking location:', error);
    }
  };

  const getLocationName = async (latitude: number, longitude: number): Promise<string> => {
    // Simple mock location naming - in a real app, use reverse geocoding
    const locations = [
      'Central Plaza', 'Coffee Corner', 'Garden Park', 'Shopping Center',
      'Metro Station', 'University Campus', 'Art Gallery', 'Food Court'
    ];
    return locations[Math.floor(Math.random() * locations.length)] + ` (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`;
  };

  const revealCrossing = async (crossingId: number) => {
    try {
      const response = await fetch(`/fated-crossings/${crossingId}/reveal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setFatedCrossings(prev =>
          prev.map(crossing =>
            crossing.id === crossingId
              ? { ...crossing, crossing: { ...crossing.crossing, isRevealed: true } }
              : crossing
          )
        );
      } else {
        console.error('Failed to reveal crossing');
      }
    } catch (error) {
      console.error('Error revealing crossing:', error);
    }
  };

  const getLocationIcon = (category: string) => {
    switch (category) {
      case 'shopping': return <ShoppingBag className="w-5 h-5" />;
      case 'leisure': return <TreePine className="w-5 h-5" />;
      case 'spiritual': return <Sparkles className="w-5 h-5" />;
      case 'cafe': return <Coffee className="w-5 h-5" />;
      case 'event': return <Music className="w-5 h-5" />;
      case 'transport': return <Car className="w-5 h-5" />;
      default: return <Building className="w-5 h-5" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 mx-auto animate-pulse-glow">
            <MapPin className="w-8 h-8 text-white animate-float" />
          </div>
          <div className="loading-skeleton w-48 h-4 rounded mx-auto mb-2"></div>
          <div className="loading-skeleton w-32 h-3 rounded mx-auto"></div>
          <p className="text-gray-600 mt-4 animate-fade-in delay-500 font-semibold" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Could this BE any more exciting? Finding your destiny... 💜
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg hover-glow animate-heart-beat">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Destiny Map
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowPermissionModal(true)}
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105 text-sm"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Set</span>
            </button>
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
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Chat</span>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-text-reveal" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            💜 How You Almost Met
          </h1>
          <p className="text-gray-600 text-lg mb-6 animate-slide-in-left delay-300 max-w-2xl mx-auto">
            Could this BE any more romantic? Discover when you and your future lobster were totally at the same places! 
            It's like the universe was writing your sitcom before you even knew it! 
          </p>
          
          {!locationPermissions.enabled && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 rounded-2xl p-6 mb-6 animate-slide-in-up delay-400">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Navigation className="w-8 h-8 text-purple-600 animate-bounce-gentle" />
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-purple-800 mb-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>Turn On The Magic! ✨</h3>
              <p className="text-purple-700 mb-4">
                How you doin'? Ready to see where destiny almost happened? This is gonna be LEGEN... wait for it...
              </p>
              <button
                onClick={() => setShowPermissionModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift"
              >
                DARY! Enable Magic
              </button>
            </div>
          )}
        </div>

        {/* Stats Section */}
        {locationPermissions.enabled && (
          <div className={`grid md:grid-cols-3 gap-6 mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover-lift text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-glow">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{fatedCrossings.length}</h3>
              <p className="text-gray-600 font-medium" style={{ fontFamily: 'Fredoka, sans-serif' }}>Almost Meetings</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover-lift text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-glow">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{fatedCrossings.filter(c => !c.crossing.isRevealed).length}</h3>
              <p className="text-gray-600 font-medium" style={{ fontFamily: 'Fredoka, sans-serif' }}>Plot Twists</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover-lift text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-glow">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {Math.round(fatedCrossings.reduce((acc, c) => acc + c.crossing.crossingScore, 0) / fatedCrossings.length * 100) || 0}%
              </h3>
              <p className="text-gray-600 font-medium" style={{ fontFamily: 'Fredoka, sans-serif' }}>Main Character Energy</p>
            </div>
          </div>
        )}

        {/* Fated Crossings List */}
        {locationPermissions.enabled ? (
          <div className="space-y-6">
            {fatedCrossings.map((crossing, index) => (
              <div
                key={crossing.id}
                className={`bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden hover-lift transition-all duration-1000 delay-${(index + 1) * 100} ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg animate-pulse-glow">
                        {crossing.user.imageInitial}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-800">{crossing.user.name}, {crossing.user.age}</h3>
                          <VerifiedBadge isVerified={crossing.user.isVerified} size="md" />
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4 text-purple-500" fill="currentColor" />
                            <span className="font-semibold text-purple-600">{crossing.user.compatibility}% Compatible</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                            <span className="font-semibold text-yellow-600">
                              {Math.round(crossing.crossing.crossingScore * 100)}% Destiny
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-purple-600 mb-2">
                        {getLocationIcon(crossing.location.category)}
                        <span className="font-semibold">{crossing.location.name}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center space-x-1 justify-end mb-1">
                          <Clock className="w-4 h-4" />
                          <span>{crossing.crossing.timeDifferenceMinutes} min apart</span>
                        </div>
                        <div className="flex items-center space-x-1 justify-end">
                          <MapPin className="w-4 h-4" />
                          <span>{crossing.crossing.distanceMeters}m away</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Sparkles className="w-5 h-5 text-purple-500 animate-bounce-gentle" />
                      <span className="text-sm font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded-full" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                        How You Almost Met
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed italic">
                      {crossing.story}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span>Your Visit</span>
                      </h4>
                      <p className="text-gray-600">{formatTimeAgo(crossing.crossing.userVisitedAt)}</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-pink-500" />
                        <span>Their Visit</span>
                      </h4>
                      <p className="text-gray-600">{formatTimeAgo(crossing.crossing.matchVisitedAt)}</p>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    {!crossing.crossing.isRevealed ? (
                      <button
                        onClick={() => revealCrossing(crossing.id)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift font-semibold"
                        style={{ fontFamily: 'Fredoka, sans-serif' }}
                      >
                        How You Doin'? Show Me! 💜
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate('/messages')}
                          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>Start Conversation</span>
                        </button>
                        <button
                          className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift"
                        >
                          <Heart className="w-5 h-5" />
                          <span>Like Profile</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {fatedCrossings.length === 0 && (
              <div className="text-center py-20 animate-fade-in">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-float" />
                <h3 className="text-2xl font-bold text-gray-700 mb-4">No Fated Crossings Yet</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Keep exploring! Your location data is building up the magic. Soon you'll discover amazing crossings with potential matches.
                </p>
                <button
                  onClick={() => navigate('/discover')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift"
                  style={{ fontFamily: 'Fredoka, sans-serif' }}
                >
                  Could This BE Any More Fun?
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <Navigation className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Location Access Required</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Enable location tracking to discover magical moments when you and potential matches crossed paths.
            </p>
            <button
              onClick={() => setShowPermissionModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              We Were On A Break... from Privacy!
            </button>
          </div>
        )}
      </div>

      {/* Location Permission Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 m-6 max-w-md w-full animate-slide-in-up">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <Navigation className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                The One Requires Location! 📍
              </h3>
              <p className="text-gray-600">
                How you doin'? Let's see where you and your lobster have been crossing paths! This is gonna be LEGEN... wait for it... DARY!
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-purple-800 font-medium">Could this BE any safer?</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-purple-800 font-medium">Only your lobster sees this</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-purple-800 font-medium">That's what she said... about expiring data</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowPermissionModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Maybe Later
              </button>
              <button
                onClick={requestLocationPermission}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                SUIT UP! 💜
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
