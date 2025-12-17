import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  ShoppingBag, 
  Truck, 
  Shield, 
  Users, 
  Award, 
  Globe, 
  Heart, 
  TrendingUp,
  Star,
  CheckCircle,
  Clock,
  Package,
  RefreshCw,
  CreditCard,
  Headphones,
  Leaf,
  Rocket,
  Target,
  BarChart,
  Calendar,
  Zap,
  Sparkles,
  ChevronRight,
  Play,
  Quote,
  MapPin
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const AboutPage: React.FC = () => {
  // State for interactive elements
  const [activeMilestone, setActiveMilestone] = useState<number>(0);
  const [teamStats, setTeamStats] = useState({
    satisfiedCustomers: 0,
    productsSold: 0,
    countriesServed: 0,
    teamMembers: 0
  });
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Animation controls
  const statsControls = useAnimation();
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Milestones timeline
  const milestones = [
    {
      year: 2015,
      title: "The Beginning",
      description: "Founded with a mission to revolutionize online shopping",
      achievements: ["First 100 customers", "Launched MVP platform", "5-star initial reviews"]
    },
    {
      year: 2017,
      title: "Rapid Growth",
      description: "Expanded to international markets",
      achievements: ["1M+ customers", "100+ team members", "International shipping"]
    },
    {
      year: 2019,
      title: "Innovation Leader",
      description: "Introduced AI-powered recommendations",
      achievements: ["AI recommendation engine", "Mobile app launch", "Same-day delivery"]
    },
    {
      year: 2022,
      title: "Sustainability Focus",
      description: "Committed to carbon-neutral operations",
      achievements: ["Carbon-neutral shipping", "Eco-friendly packaging", "Sustainable sourcing"]
    },
    {
      year: 2024,
      title: "Market Leader",
      description: "Recognized as industry leader",
      achievements: ["10M+ customers", "500+ team members", "Industry awards"]
    }
  ];

  // Team members
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "CEO & Founder",
      department: "Leadership",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      description: "Visionary leader with passion for e-commerce innovation",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      id: 2,
      name: "Maria Chen",
      role: "CTO",
      department: "Technology",
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      description: "Technology expert driving platform innovation",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      id: 3,
      name: "David Wilson",
      role: "COO",
      department: "Operations",
      experience: "14+ years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w-400&h=400&fit=crop",
      description: "Operations master ensuring seamless customer experience",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      id: 4,
      name: "Sarah Miller",
      role: "CMO",
      department: "Marketing",
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      description: "Marketing strategist driving brand growth",
      social: { linkedin: "#", twitter: "#" }
    }
  ];

  // Values
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Every decision starts with our customers' needs and happiness",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Building lasting trust through secure transactions and data protection",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Committed to eco-friendly practices and sustainable growth",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "Constantly evolving to bring you the latest shopping technology",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building relationships that go beyond transactions",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Striving for perfection in every aspect of our service",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  // Features
  const features = [
    {
      icon: Package,
      title: "Fast Delivery",
      description: "Same-day delivery in major cities, 2-3 days nationwide",
      stats: "99.2% on-time delivery"
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Military-grade encryption and fraud protection",
      stats: "0% fraud liability"
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day return policy with free return shipping",
      stats: "98% customer satisfaction"
    },
    {
      icon: CreditCard,
      title: "Flexible Payments",
      description: "Multiple payment options including installment plans",
      stats: "10+ payment methods"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support via chat, phone, email",
      stats: "<2 min response time"
    },
    {
      icon: BarChart,
      title: "Price Match",
      description: "Best price guarantee with automated price matching",
      stats: "100% price match promise"
    }
  ];

  // Awards
  const awards = [
    {
      icon: Award,
      title: "Best E-commerce Platform 2024",
      issuer: "Digital Commerce Awards",
      year: "2024"
    },
    {
      icon: Star,
      title: "Customer Choice Award",
      issuer: "Consumer Reports",
      year: "2023"
    },
    {
      icon: TrendingUp,
      title: "Fastest Growing Retailer",
      issuer: "Forbes",
      year: "2023"
    },
    {
      icon: Shield,
      title: "Security Excellence",
      issuer: "Cybersecurity Association",
      year: "2024"
    }
  ];

  // Customer testimonials
  const testimonials = [
    {
      name: "Emily Rodriguez",
      role: "Frequent Shopper",
      content: "The personalized recommendations are spot-on! I've discovered products I never knew I needed.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop"
    },
    {
      name: "James Wilson",
      role: "Business Owner",
      content: "Their B2B services have streamlined our procurement process by 60%. Outstanding platform!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    {
      name: "Sophia Chen",
      role: "Tech Enthusiast",
      content: "From checkout to delivery, everything is seamless. The mobile app is especially impressive.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"
    }
  ];

  // Animate stats when in view
  useEffect(() => {
    if (statsInView) {
      const animateNumbers = async () => {
        await statsControls.start({
          scale: [0.8, 1],
          opacity: [0, 1],
          transition: { duration: 0.5 }
        });

        // Animate counting
        const duration = 2000;
        const steps = 60;
        const stepValues = {
          satisfiedCustomers: 10000000,
          productsSold: 50000000,
          countriesServed: 120,
          teamMembers: 500
        };

        const interval = setInterval(() => {
          setTeamStats(prev => ({
            satisfiedCustomers: Math.min(prev.satisfiedCustomers + Math.ceil(stepValues.satisfiedCustomers / steps), stepValues.satisfiedCustomers),
            productsSold: Math.min(prev.productsSold + Math.ceil(stepValues.productsSold / steps), stepValues.productsSold),
            countriesServed: Math.min(prev.countriesServed + Math.ceil(stepValues.countriesServed / steps), stepValues.countriesServed),
            teamMembers: Math.min(prev.teamMembers + Math.ceil(stepValues.teamMembers / steps), stepValues.teamMembers)
          }));
        }, duration / steps);

        setTimeout(() => clearInterval(interval), duration);
      };

      animateNumbers();
    }
  }, [statsInView, statsControls]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm mb-8"
            >
              <ShoppingBag className="h-12 w-12" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Redefining <span className="text-blue-300">E-commerce</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Experience
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-10">
              Where innovation meets convenience. We're building the future of online shopping, 
              one satisfied customer at a time.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300"
            >
              <Play className="h-5 w-5" />
              Watch Our Story
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold mb-6">
              <Target className="h-4 w-4" />
              Our Mission
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              To make <span className="text-primary-600">online shopping</span> smarter, 
              safer, and more <span className="text-primary-600">sustainable</span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              We believe everyone deserves access to quality products with seamless delivery, 
              transparent pricing, and exceptional service. Our platform combines cutting-edge 
              technology with human-centric design to create shopping experiences that inspire 
              confidence and joy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            animate={statsControls}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {teamStats.satisfiedCustomers.toLocaleString()}+
              </div>
              <div className="text-gray-300 font-medium">Satisfied Customers</div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {teamStats.productsSold.toLocaleString()}+
              </div>
              <div className="text-gray-300 font-medium">Products Sold</div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {teamStats.countriesServed}+
              </div>
              <div className="text-gray-300 font-medium">Countries Served</div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                {teamStats.teamMembers}+
              </div>
              <div className="text-gray-300 font-medium">Team Members</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to e-commerce leadership
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 to-purple-500 hidden md:block"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative mb-12 md:mb-20 ${index % 2 === 0 ? 'md:pr-1/2 md:pl-0' : 'md:pl-1/2 md:pr-0'} md:pl-12`}
              >
                <div
                  className={`bg-white rounded-2xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                    activeMilestone === index ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => setActiveMilestone(index)}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{milestone.year}</div>
                      <div className="text-lg font-semibold text-primary-600">{milestone.title}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{milestone.description}</p>
                  
                  <div className="space-y-2">
                    {milestone.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary-500 rounded-full border-4 border-white shadow-lg hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${value.color} mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Features that set us apart in the e-commerce industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary-50 rounded-xl">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                      <div className="text-sm font-semibold text-primary-600 mt-1">
                        {feature.stats}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The visionaries driving our e-commerce revolution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <div className="text-primary-600 font-semibold mb-2">{member.role}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Users className="h-4 w-4" />
                      {member.department} • {member.experience}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-6">{member.description}</p>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium hover:bg-primary-100 transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Industry recognition for our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => {
              const Icon = award.icon;
              return (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-primary-500 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-amber-400 font-bold">{award.year}</div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                  <p className="text-gray-400">{award.issuer}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold mb-6">
              <Quote className="h-4 w-4" />
              Customer Voices
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real feedback from shoppers who love our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our <span className="text-blue-300">E-commerce</span> Revolution
            </h2>
            
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-10">
              Experience the future of online shopping today. Whether you're buying or selling, 
              we're here to make it better.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Start Shopping Now
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Become a Seller
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;