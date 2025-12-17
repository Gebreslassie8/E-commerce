import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send,
  CheckCircle,
  Navigation,
  Users,
  Shield,
  Globe,
  Building,
  Smartphone,
  Video,
  Calendar,
  FileText,
  ExternalLink,
  Copy,
  Check,
  X,
  AlertCircle,
  Wifi,
  Battery,
  Signal,
  Settings,
  Heart
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  department: string;
  preferredContact: string;
  urgency: 'low' | 'medium' | 'high';
  subscribe: boolean;
}

interface OfficeLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: string;
  department: string;
  features: string[];
  distance?: number;
  eta?: number;
}

const ContactPage: React.FC = () => {
  // State
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general',
    preferredContact: 'email',
    urgency: 'medium',
    subscribe: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [userLocation, setUserLocation] = useState<string>('');
  const [selectedOffice, setSelectedOffice] = useState<string>('1');
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [eta, setEta] = useState<number | null>(null);
  const [liveLocation, setLiveLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const locationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Office locations
  const officeLocations: OfficeLocation[] = [
    {
      id: '1',
      name: 'Headquarters',
      address: '123 Tech Avenue',
      city: 'San Francisco',
      country: 'USA',
      phone: '+1 (555) 123-4567',
      email: 'hq@company.com',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM PST',
      department: 'General Inquiries',
      features: ['24/7 Support', 'Parking Available', 'Accessible', 'Conference Rooms']
    },
    {
      id: '2',
      name: 'European Office',
      address: '45 Innovation Street',
      city: 'London',
      country: 'UK',
      phone: '+44 20 7123 4567',
      email: 'europe@company.com',
      coordinates: { lat: 51.5074, lng: -0.1278 },
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM GMT',
      department: 'Sales & Marketing',
      features: ['Multilingual Staff', 'Training Center', 'Showroom']
    },
    {
      id: '3',
      name: 'Asia-Pacific Hub',
      address: '789 Business Tower',
      city: 'Singapore',
      country: 'Singapore',
      phone: '+65 6123 4567',
      email: 'asia@company.com',
      coordinates: { lat: 1.3521, lng: 103.8198 },
      hours: 'Mon-Fri: 8:00 AM - 7:00 PM SGT',
      department: 'Technical Support',
      features: ['24/7 Operations', 'R&D Center', 'Logistics Hub']
    },
    {
      id: '4',
      name: 'Development Center',
      address: '321 Code Boulevard',
      city: 'Berlin',
      country: 'Germany',
      phone: '+49 30 1234567',
      email: 'dev@company.com',
      coordinates: { lat: 52.5200, lng: 13.4050 },
      hours: 'Mon-Fri: 8:00 AM - 6:00 PM CET',
      department: 'Development',
      features: ['Innovation Lab', 'Coworking Space', 'Tech Support']
    }
  ];

  // Departments
  const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'careers', label: 'Careers' }
  ];

  // Contact methods
  const contactMethods = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Phone', icon: Phone },
    { value: 'sms', label: 'SMS', icon: MessageSquare },
    { value: 'video', label: 'Video Call', icon: Video }
  ];

  // Urgency levels
  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High Priority', color: 'bg-red-100 text-red-800' }
  ];

  // Get user location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          console.log('Error getting location:', error);
          toast.error('Unable to get your location. Please enable location services.');
        }
      );
    }
  }, []);

  // Calculate distance and ETA
  useEffect(() => {
    if (currentLocation && selectedOffice) {
      const office = officeLocations.find(o => o.id === selectedOffice);
      if (office) {
        const dist = calculateDistance(
          currentLocation.lat,
          currentLocation.lng,
          office.coordinates.lat,
          office.coordinates.lng
        );
        setDistance(dist);
        setEta(calculateETA(dist));
      }
    }
  }, [currentLocation, selectedOffice]);

  // Simulate live tracking
  useEffect(() => {
    if (trackingEnabled && isTracking) {
      locationIntervalRef.current = setInterval(() => {
        if (currentLocation) {
          // Simulate slight movement
          const newLat = currentLocation.lat + (Math.random() - 0.5) * 0.001;
          const newLng = currentLocation.lng + (Math.random() - 0.5) * 0.001;
          setLiveLocation({ lat: newLat, lng: newLng });
        }
      }, 3000);
    }

    return () => {
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
    };
  }, [trackingEnabled, isTracking, currentLocation]);

  // Functions
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setUserLocation(data.display_name || 'Location detected');
    } catch (error) {
      setUserLocation('Location detected');
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10; // Distance in km
  };

  const calculateETA = (distance: number): number => {
    const averageSpeed = 40; // km/h
    return Math.round((distance / averageSpeed) * 60); // ETA in minutes
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <p className="font-semibold">Message Sent Successfully!</p>
            <p className="text-sm text-gray-600">
              We'll get back to you within 24 hours. Ticket ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
        </div>,
        { duration: 5000 }
      );

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        department: 'general',
        preferredContact: 'email',
        urgency: 'medium',
        subscribe: false
      });
    }, 1500);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleStartTracking = () => {
    if (!trackingEnabled) {
      setTrackingEnabled(true);
      toast.success('Live tracking enabled');
    }
    setIsTracking(true);
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    toast.info('Live tracking paused');
  };

  const handleScheduleCall = () => {
    toast.success(
      <div className="flex items-start gap-3">
        <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
        <div>
          <p className="font-semibold">Schedule a Call</p>
          <p className="text-sm text-gray-600">
            Redirecting to calendar... Choose your preferred time slot.
          </p>
        </div>
      </div>,
      { duration: 4000 }
    );
  };

  const selectedOfficeData = officeLocations.find(o => o.id === selectedOffice);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact <span className="text-blue-300">Us</span>
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Get in touch with our team. We're here to help with any questions or concerns.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse mx-1"></span>
                      <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                    </div>
                    <span className="text-sm font-medium text-green-600">Online now</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                      >
                        {departments.map(dept => (
                          <option key={dept.value} value={dept.value}>
                            {dept.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  {/* Preferences */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {contactMethods.map(method => {
                          const Icon = method.icon;
                          return (
                            <button
                              key={method.value}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, preferredContact: method.value }))}
                              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                                formData.preferredContact === method.value
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <Icon className="h-5 w-5 mb-2" />
                              <span className="text-sm font-medium">{method.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Urgency Level
                      </label>
                      <div className="flex gap-3">
                        {urgencyLevels.map(level => (
                          <button
                            key={level.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, urgency: level.value as any }))}
                            className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                              formData.urgency === level.value
                                ? `${level.color} border-transparent`
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {level.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="subscribe"
                        checked={formData.subscribe}
                        onChange={handleInputChange}
                        className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600">
                        Subscribe to our newsletter for updates
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <button
                onClick={handleScheduleCall}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Schedule a Call</h3>
                    <p className="text-sm text-gray-600 mt-1">Book a meeting with our team</p>
                  </div>
                </div>
              </button>

              <button className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all text-left group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Live Chat</h3>
                    <p className="text-sm text-gray-600 mt-1">Chat with us instantly</p>
                  </div>
                </div>
              </button>

              <button className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all text-left group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Knowledge Base</h3>
                    <p className="text-sm text-gray-600 mt-1">Browse help articles</p>
                  </div>
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Column - Location & Info */}
          <div className="space-y-8">
            {/* GPS Tracking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-primary-600" />
                    Location & Tracking
                  </h2>
                  <div className="flex items-center gap-2">
                    <Signal className="h-4 w-4 text-green-500" />
                    <Wifi className="h-4 w-4 text-blue-500" />
                    <Battery className="h-4 w-4 text-green-500" />
                  </div>
                </div>

                {/* Office Selection */}
                <div className="space-y-4 mb-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Office
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {officeLocations.map(office => (
                      <button
                        key={office.id}
                        onClick={() => setSelectedOffice(office.id)}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          selectedOffice === office.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-gray-900">{office.city}</div>
                        <div className="text-xs text-gray-500 mt-1">{office.department}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Office Details */}
                {selectedOfficeData && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{selectedOfficeData.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{selectedOfficeData.address}</p>
                          <p className="text-sm text-gray-600">{selectedOfficeData.city}, {selectedOfficeData.country}</p>
                        </div>
                        <button
                          onClick={() => handleCopyText(selectedOfficeData.address, 'Address')}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          title="Copy address"
                        >
                          <Copy className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {selectedOfficeData.features.map(feature => (
                          <span
                            key={feature}
                            className="px-2 py-1 bg-white border border-gray-300 text-xs rounded-lg"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Distance & ETA */}
                    {currentLocation && distance && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                          <div className="text-2xl font-bold text-blue-700">{distance} km</div>
                          <div className="text-sm text-blue-600 font-medium mt-1">Distance</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                          <div className="text-2xl font-bold text-green-700">~{eta} min</div>
                          <div className="text-sm text-green-600 font-medium mt-1">Estimated Time</div>
                        </div>
                      </div>
                    )}

                    {/* User Location */}
                    {userLocation && (
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-primary-600" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Your Location</p>
                            <p className="text-sm text-gray-600 truncate">{userLocation}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tracking Controls */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Live Tracking</span>
                        <button
                          onClick={() => setTrackingEnabled(!trackingEnabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            trackingEnabled ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              trackingEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {trackingEnabled && (
                        <div className="flex gap-3">
                          <button
                            onClick={handleStartTracking}
                            disabled={isTracking}
                            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                              isTracking
                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {isTracking ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                                Tracking Active
                              </div>
                            ) : (
                              'Start Tracking'
                            )}
                          </button>
                          <button
                            onClick={handleStopTracking}
                            disabled={!isTracking}
                            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                              !isTracking
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            Stop
                          </button>
                        </div>
                      )}

                      {isTracking && (
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Live Location Active</p>
                              <p className="text-xs text-gray-600">
                                Your location is being shared in real-time
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Get Directions */}
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedOfficeData.coordinates.lat},${selectedOfficeData.coordinates.lng}`, '_blank')}
                      className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <Navigation className="h-4 w-4" />
                      Get Directions
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-primary-900 to-primary-950 text-white rounded-2xl shadow-xl p-6"
            >
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-200">Global Support</p>
                    <p className="font-semibold">+1 (800) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-200">Email</p>
                    <p className="font-semibold">support@company.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-200">Business Hours</p>
                    <p className="font-semibold">24/7 Support Available</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-200">Global Offices</p>
                    <p className="font-semibold">{officeLocations.length} Locations Worldwide</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary-200">Response Time</p>
                    <p className="font-bold text-lg">Under 2 hours</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary-200">Satisfaction Rate</p>
                    <p className="font-bold text-lg">98.7%</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Support Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Support Team Status</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Online Agents</span>
                    <span className="font-medium text-gray-900">12/15</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-medium text-gray-900">94.3%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '94.3%' }}></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Current Queue</div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      3 people ahead
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Emergency Support</h3>
                    <p className="text-red-100 mt-1">
                      For critical issues requiring immediate attention
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-6 py-3 bg-white text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Emergency: +1 (800) 911-4567
                  </button>
                  <button className="px-6 py-3 bg-red-800 text-white font-semibold rounded-xl hover:bg-red-900 transition-colors">
                    Send Emergency Alert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="h-5 w-5 text-red-400" />
                <span className="text-lg font-semibold">Customer Support</span>
              </div>
              <p className="text-gray-400 text-sm">
                We're committed to providing exceptional service and support around the clock.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Settings
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Company Name. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;