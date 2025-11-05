import React, { useState, useEffect } from 'react';
import { 
  Shield, AlertCircle, MessageSquare, Radio, Users, 
  MapPin, Phone, Clock, CheckCircle, Star, ChevronLeft, 
  ChevronRight, Menu, X, Bell, FileText, Camera, Video
} from 'lucide-react';

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-10 h-10 text-white" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-white tracking-tight">CrimeNet</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-8">
              {['Home', 'Report Crime', 'Track Case', 'Resources', 'Contact'].map((item) => (
                <button
                  key={item}
                  className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium"
                  onClick={() => console.log(`Navigate to ${item}`)}
                >
                  {item}
                </button>
              ))}
            </nav>
            <div className="flex items-center space-x-3 ml-4">
              <a
                href="/login"
                className="px-6 py-2 text-white hover:text-yellow-300 transition-colors font-medium"
              >
                Login
              </a>
              <a
                href="/register"
                className="px-6 py-2 bg-white text-purple-600 rounded-full font-bold hover:bg-yellow-300 hover:text-purple-700 transition-all shadow-lg"
              >
                Sign Up
              </a>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {['Home', 'Report Crime', 'Track Case', 'Resources', 'Contact'].map((item) => (
              <button
                key={item}
                className="block w-full text-left py-2 text-white hover:text-yellow-300 transition-colors"
                onClick={() => {
                  console.log(`Navigate to ${item}`);
                  setIsMenuOpen(false);
                }}
              >
                {item}
              </button>
            ))}
            <div className="pt-4 border-t border-white/20 space-y-2">
              <a
                href="/login"
                className="block w-full text-center py-2 text-white hover:text-yellow-300 transition-colors font-medium"
              >
                Login
              </a>
              <a
                href="/register"
                className="block w-full text-center py-2 bg-white text-purple-600 rounded-full font-bold hover:bg-yellow-300 transition-all"
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
          Your Safety, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">Our Priority</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
          Report crimes instantly, track cases in real-time, and connect with law enforcement through our secure civic safety platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => console.log('Report Crime')}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <AlertCircle className="w-6 h-6" />
            <span>Report a Crime</span>
          </button>
          <button 
            onClick={() => console.log('Emergency SOS')}
            className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
          >
            <Phone className="w-6 h-6" />
            <span>Emergency SOS</span>
          </button>
        </div>
      </div>
    </section>
  );
};

// Features Section
const Features = () => {
  const features = [
    { icon: AlertCircle, title: 'Instant Crime Reporting', description: 'Report incidents with photos, videos, and precise location in seconds.' },
    { icon: Clock, title: 'Live Status Tracking', description: 'Track your case progress in real-time with automatic updates.' },
    { icon: MessageSquare, title: 'Secure Chat', description: 'Encrypted communication channel between citizens and officers.' },
    { icon: Phone, title: 'SOS Button', description: 'One-tap emergency alert sends location to police and contacts.' },
    { icon: Users, title: 'Community Watch', description: 'Join neighborhood groups and report suspicious activities together.' },
    { icon: Bell, title: 'Push Notifications', description: 'Instant alerts when your case status changes or updates arrive.' },
  ];
  
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Powerful Features for Your Safety
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cutting-edge technology to empower citizens and streamline law enforcement response.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Status Tracker
const StatusTracker = () => {
  const steps = [
    { label: 'Report Filed', icon: FileText, status: 'completed' },
    { label: 'Under Review', icon: Clock, status: 'completed' },
    { label: 'Officer Assigned', icon: Shield, status: 'active' },
    { label: 'Investigation', icon: Camera, status: 'pending' },
    { label: 'Case Resolved', icon: CheckCircle, status: 'pending' },
  ];
  
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Track Your Case Progress
          </h2>
          <p className="text-xl text-gray-300">
            Real-time updates at every step of your complaint journey
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-8 md:space-y-0 md:space-x-4">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center flex-1">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                    step.status === 'completed' ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/50' :
                    step.status === 'active' ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50 animate-pulse' :
                    'bg-gray-600/50 border-2 border-gray-500'
                  }`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <p className={`font-bold text-sm md:text-base ${
                    step.status === 'pending' ? 'text-gray-400' : 'text-white'
                  }`}>
                    {step.label}
                  </p>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`hidden md:block h-1 flex-1 rounded-full transition-all duration-300 ${
                    steps[idx + 1].status === 'completed' || steps[idx + 1].status === 'active'
                      ? 'bg-gradient-to-r from-green-400 to-blue-500'
                      : 'bg-gray-600/50'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials
const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const testimonials = [
    { name: 'Priya Sharma', location: 'Mumbai', text: 'CrimeNet helped me report a theft instantly. The officer was assigned within hours and I could track everything. Truly revolutionary!', rating: 5 },
    { name: 'Rajesh Kumar', location: 'Delhi', text: 'The SOS button is a lifesaver. I felt secure knowing help is just one tap away. The secure chat feature is excellent.', rating: 5 },
    { name: 'Anita Patel', location: 'Bangalore', text: 'Community Watch brought our neighborhood together. We caught suspicious activity early thanks to CrimeNet.', rating: 5 },
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            What Citizens Say
          </h2>
          <p className="text-xl text-gray-300">
            Real stories from people who trusted CrimeNet
          </p>
        </div>
        
        <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <div className="flex justify-center mb-6">
            {[...Array(testimonials[current].rating)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          
          <p className="text-xl md:text-2xl text-white text-center mb-8 leading-relaxed italic">
            "{testimonials[current].text}"
          </p>
          
          <div className="text-center">
            <p className="text-lg font-bold text-white">{testimonials[current].name}</p>
            <p className="text-gray-300">{testimonials[current].location}</p>
          </div>
          
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === current ? 'bg-white w-8' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Additional Features Showcase
const AdvancedFeatures = () => {
  const advancedFeatures = [
    { icon: MapPin, title: 'Live Crime Maps', description: 'Interactive maps showing real-time crime reports and safety zones in your area.' },
    { icon: Users, title: 'Missing Persons Alerts', description: 'Instant notifications for missing persons and found cases with map integration.' },
    { icon: Video, title: 'Evidence Upload', description: 'Upload photos, videos, and voice notes as evidence directly from your device.' },
    { icon: Shield, title: 'Anonymous Reporting', description: 'Report crimes anonymously while still tracking case progress securely.' },
  ];
  
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-purple-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Advanced Safety Tools
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Next-generation features designed for comprehensive civic safety and transparency
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {advancedFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-8 h-8" />
              <span className="text-xl font-bold">CrimeNet</span>
            </div>
            <p className="text-gray-400">
              Empowering citizens and law enforcement with technology for a safer tomorrow.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'How It Works', 'Safety Tips', 'FAQs'].map((item) => (
                <li key={item}>
                  <button className="text-gray-400 hover:text-white transition-colors" onClick={() => console.log(item)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Data Protection', 'Accessibility'].map((item) => (
                <li key={item}>
                  <button className="text-gray-400 hover:text-white transition-colors" onClick={() => console.log(item)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@crimenet.in</li>
              <li>Emergency: 100</li>
              <li>Helpline: 1800-XXX-XXXX</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CrimeNet. All rights reserved. Built for a safer community.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Hero />
      <Features />
      <StatusTracker />
      <AdvancedFeatures />
      <Testimonials />
      <Footer />
    </div>
  );
}